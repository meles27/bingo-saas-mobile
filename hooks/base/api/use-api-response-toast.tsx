import { useToast } from "@/components/ui/toast";
import { useConfigStore } from "@/store/config-store";
import { useEffect } from "react";
import type { AxiosBaseQueryErrorResponse } from "./useMutation"; // Adjust path if needed

type UseApiResponseToastOptions<TSuccessData = unknown> = {
  loadingMessage?: string;
  successMessage?: string;
  disableLoadingToast?: boolean;
  disableSuccessToast?: boolean;
  disableErrorToast?: boolean;
  errorCallback?: (error: AxiosBaseQueryErrorResponse) => void;
  successCallback?: (data?: TSuccessData) => void;
  errorAction?: {
    label: string;
    onPress: () => void;
  };
};

/**
 * Parses a custom API error and returns a string suitable for the toast.
 * (This helper function remains the same)
 */
const parseErrorForToast = (
  error: AxiosBaseQueryErrorResponse,
  validationStatusCodes: number[]
): string => {
  const { status, data } = error;
  const genericErrorMessage = "An unexpected error occurred.";

  let message = data?.detail || genericErrorMessage;

  if (status === 422 && Array.isArray(data?.errors)) {
    message =
      data.errors
        .map((err: any) => `${err.field}: ${err.messages.join(", ")}`)
        .join("\n") || message;
  } else if (status && validationStatusCodes.includes(status) && data?.errors) {
    if (typeof data.errors === "object" && !Array.isArray(data.errors)) {
      message = Object.entries(data.errors)
        .map(([key, value]) => `${key}: ${String(value)}`)
        .join("\n");
    }
  }

  return message;
};

/**
 * A hook to display toasts based on an API call's state, using your
 * existing custom React Native Toast component without modification.
 */
export const useApiResponseToast = <TSuccessData = unknown,>(
  state: {
    isLoading?: boolean;
    isError: boolean;
    isSuccess: boolean;
    error?: AxiosBaseQueryErrorResponse | null;
    data?: TSuccessData;
  },
  options: UseApiResponseToastOptions<TSuccessData> = {}
) => {
  const { isLoading, isError, isSuccess, error, data } = state;
  const {
    loadingMessage = "Processing your request...",
    successMessage = "Operation successful!",
    disableLoadingToast = true,
    disableSuccessToast = false,
    disableErrorToast = false,
    errorCallback,
    successCallback,
    errorAction,
  } = options;

  const { toast } = useToast();
  const STATUS_CODE_GROUP_VALIDATION = useConfigStore(
    (s) => s.STATUS_CODE_GROUP_VALIDATION
  );

  // --- Effect for Loading State ---
  useEffect(() => {
    // This effect runs only when the loading state *begins*.
    const isCurrentlyLoading = isLoading;
    if (isCurrentlyLoading && !disableLoadingToast) {
      toast({
        title: loadingMessage,
        variant: "info",
        duration: 2000, // Give loading a shorter, auto-dismissing duration
      });
    }
  }, [isLoading, disableLoadingToast, loadingMessage, toast]);

  // --- Effect for Error State ---
  useEffect(() => {
    // This effect runs only when the error state *occurs*.
    if (isError && error) {
      errorCallback?.(error);
      if (disableErrorToast) return;

      const message = parseErrorForToast(error, STATUS_CODE_GROUP_VALIDATION);

      toast({
        title: message,
        variant: "error",
        duration: 4000,
        action: errorAction,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error, disableErrorToast, errorCallback, errorAction, toast]);

  // --- Effect for Success State ---
  useEffect(() => {
    // This effect runs only when the success state *occurs*.
    if (isSuccess) {
      successCallback?.(data);
      if (disableSuccessToast) return;

      toast({
        title: successMessage,
        variant: "success",
        duration: 3000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSuccess,
    data,
    disableSuccessToast,
    successMessage,
    successCallback,
    toast,
  ]);
};
