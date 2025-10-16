import {
  AxiosBaseQueryErrorResponse,
  globalAxiosInstance,
  tenantAxiosInstance,
} from "@/utils/interceptors";
import type { AxiosRequestConfig, Method } from "axios";
import axios from "axios";
import { useCallback, useMemo, useReducer } from "react";

// --- Error Generation Utility (No Changes) ---
function generateQueryError(error: unknown): AxiosBaseQueryErrorResponse {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        status: error.response.status,
        data: {
          detail:
            error.response.data?.detail ||
            error.response.data?.message ||
            error.response.data?.error ||
            `Error ${error.response.status}: ${error.response.statusText}`,
          errors: error.response.data?.errors,
        },
      };
    }
    if (error.request) {
      return {
        status: undefined,
        data: {
          detail:
            "No response from server. Please check your network connection.",
        },
      };
    }
    return {
      status: undefined,
      data: {
        detail: error.message || "An unknown Axios error occurred.",
      },
    };
  }
  if (error instanceof Error) {
    return { status: undefined, data: { detail: error.message } };
  }
  return {
    status: undefined,
    data: { detail: "An unexpected error occurred." },
  };
}

// --- Hook-Specific Type Definitions ---

export interface UseMutationOptions {
  headers?: AxiosRequestConfig["headers"];
  params?: AxiosRequestConfig["params"];
  /**
   * Determines which API to target.
   * 'tenant' uses the subdomain-aware instance.
   * 'global' uses the main API instance.
   * @default 'tenant'
   */
  apiScope?: "tenant" | "global";
}

export interface ExecuteOptions {
  url?: string;
  headers?: AxiosRequestConfig["headers"];
  params?: AxiosRequestConfig["params"];
}

// --- Discriminated Union for Mutation Result (No Changes) ---

interface UseMutationBaseResult<TResponse, TBody> {
  execute: (
    body?: TBody | null,
    executeOptions?: ExecuteOptions
  ) => Promise<
    [TResponse | undefined, AxiosBaseQueryErrorResponse | undefined]
  >;
}

interface UseMutationLoadingResult<TResponse, TBody>
  extends UseMutationBaseResult<TResponse, TBody> {
  data: null;
  error: null;
  isLoading: true;
  isSuccess: false;
  isError: false;
}

interface UseMutationSuccessResult<TResponse, TBody>
  extends UseMutationBaseResult<TResponse, TBody> {
  data: TResponse;
  error: null;
  isLoading: false;
  isSuccess: true;
  isError: false;
}

interface UseMutationErrorResult<TResponse, TBody>
  extends UseMutationBaseResult<TResponse, TBody> {
  data: null;
  error: AxiosBaseQueryErrorResponse;
  isLoading: false;
  isSuccess: false;
  isError: true;
}

interface UseMutationIdleResult<TResponse, TBody>
  extends UseMutationBaseResult<TResponse, TBody> {
  data: null;
  error: null;
  isLoading: false;
  isSuccess: false;
  isError: false;
}

export type UseMutationResult<TResponse, TBody> =
  | UseMutationLoadingResult<TResponse, TBody>
  | UseMutationSuccessResult<TResponse, TBody>
  | UseMutationErrorResult<TResponse, TBody>
  | UseMutationIdleResult<TResponse, TBody>;

// --- State and Reducer (No Changes) ---

interface State<T> {
  data: T | null;
  error: AxiosBaseQueryErrorResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
}

type Action<T> =
  | { type: "MUTATE_START" }
  | { type: "MUTATE_SUCCESS"; payload: T }
  | { type: "MUTATE_ERROR"; payload: AxiosBaseQueryErrorResponse };

function mutationReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "MUTATE_START":
      return { data: null, isLoading: true, isSuccess: false, error: null };
    case "MUTATE_SUCCESS":
      return {
        isLoading: false,
        isSuccess: true,
        data: action.payload,
        error: null,
      };
    case "MUTATE_ERROR":
      return {
        isLoading: false,
        isSuccess: false,
        error: action.payload,
        data: null,
      };
    default:
      throw new Error(`Unhandled action type in mutationReducer`);
  }
}

// --- React Custom Hook: useMutation ---

export function useMutation<TResponse, TBody = unknown>(
  defaultUrl: string,
  method: Method,
  defaultOptions: UseMutationOptions = {}
): UseMutationResult<TResponse, TBody> {
  const initialState: State<TResponse> = {
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
  };

  const [state, dispatchState] = useReducer(
    mutationReducer<TResponse>,
    initialState
  );

  const isError = useMemo(() => state.error !== null, [state.error]);

  // MODIFIED: Destructure apiScope from the default options
  const { apiScope = "tenant" } = defaultOptions;

  const execute = useCallback(
    async (
      body?: TBody | null,
      executeOptions: ExecuteOptions = {}
    ): Promise<
      [TResponse | undefined, AxiosBaseQueryErrorResponse | undefined]
    > => {
      dispatchState({ type: "MUTATE_START" });
      const finalUrl = executeOptions.url ?? defaultUrl;

      const instance =
        apiScope === "global" ? globalAxiosInstance : tenantAxiosInstance;

      try {
        const response = await instance.request<TResponse>({
          url: finalUrl,
          method,
          data: body,
          headers: { ...defaultOptions.headers, ...executeOptions.headers },
          params: { ...defaultOptions.params, ...executeOptions.params },
        });
        dispatchState({ type: "MUTATE_SUCCESS", payload: response.data });
        return [response.data, undefined];
      } catch (err) {
        const queryError = generateQueryError(err);
        dispatchState({ type: "MUTATE_ERROR", payload: queryError });
        return [undefined, queryError];
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultUrl, method, apiScope, JSON.stringify(defaultOptions)]
  );

  const result = {
    ...state,
    isError,
    execute,
  };

  return result as UseMutationResult<TResponse, TBody>;
}
