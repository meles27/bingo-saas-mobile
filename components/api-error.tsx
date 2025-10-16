import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor"; // Assuming you have this hook
import { useAuthStore } from "@/store/auth-store";
import { AxiosBaseQueryErrorResponse } from "@/utils/interceptors";
import { useRouter } from "expo-router";
import {
  AlertTriangle,
  ArrowLeft,
  FileSearch,
  FolderSearch,
  Home,
  LogOut,
  ServerCrash,
  ShieldOff,
  UserX,
  type LucideIcon,
} from "lucide-react-native";
import React, { useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// --- TYPE DEFINITIONS (Unchanged) ---
type Size = "small" | "large";
type ResourceType = "item" | "list";
interface CustomAction {
  label: string;
  handler: () => void;
}

// --- PROPS INTERFACE (Unchanged) ---
interface ApiErrorProps {
  error: AxiosBaseQueryErrorResponse | null;
  size?: Size;
  resourceName?: string;
  resourceType?: ResourceType;
  showDetails?: boolean;
  customAction?: CustomAction;
}

// --- THE COMPONENT ---
export const ApiError: React.FC<ApiErrorProps> = ({
  error,
  size = "small",
  resourceName = "Item",
  resourceType = "item",
  showDetails = true,
  customAction,
}) => {
  // --- NATIVE HOOKS ---
  const router = useRouter();
  const { logout } = useAuthStore();

  // --- THEME COLORS ---
  const backgroundColor = useThemeColor(
    {},
    size === "large" ? "background" : "card"
  );
  const textColor = useThemeColor(
    {},
    size === "large" ? "foreground" : "cardForeground"
  );
  const mutedTextColor = useThemeColor({}, "mutedForeground");
  const destructiveColor = useThemeColor({}, "destructive");
  const mutedBackgroundColor = useThemeColor(
    { light: "#00000010", dark: "#ffffff10" },
    "muted"
  );
  const borderColor = useThemeColor({}, "border");

  // --- ANIMATION LOGIC (Replaces HOC) ---
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    translateY.value = withSpring(0, { damping: 12 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  // --- NAVIGATION HANDLERS ---
  const goBack = () => router.back();
  const goHome = () => router.replace("/"); // Use replace to avoid going back to the error
  const handleLogout = () => {
    logout();
    goHome();
  };

  // --- MEMOIZED ERROR DETAILS (Logic Unchanged) ---
  const details = useMemo(() => {
    const status = error?.status;

    interface ErrorDetails {
      statusCode: number | string;
      title: string;
      description: string;
      icon: LucideIcon;
    }

    switch (status) {
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          statusCode: status,
          title: "Server Error",
          description:
            "Whoops, something went wrong on our servers. Please try again later.",
          icon: ServerCrash,
        } as ErrorDetails;
      case 404:
        if (resourceType === "list") {
          return {
            statusCode: 404,
            title: `No ${resourceName} Found`,
            description: `We searched high and low, but couldn't find any ${resourceName.toLowerCase()} matching your request.`,
            icon: FolderSearch,
          } as ErrorDetails;
        }
        return {
          statusCode: 404,
          title: `${resourceName} Not Found`,
          description: `The ${resourceName.toLowerCase()} you're looking for doesn't exist or has been moved.`,
          icon: FileSearch,
        } as ErrorDetails;
      case 403:
        return {
          statusCode: 403,
          title: "Access Denied",
          description: `You don't have permission to access this ${resourceName.toLowerCase()}.`,
          icon: ShieldOff,
        } as ErrorDetails;
      case 401:
        return {
          statusCode: 401,
          title: "Unauthorized",
          description:
            "Your session may have expired. Please log out and sign in again.",
          icon: UserX,
        } as ErrorDetails;
      default:
        return {
          statusCode: status || "Error",
          title: "An Unexpected Error Occurred",
          description:
            "Something went wrong. Please try again or contact support if the problem persists.",
          icon: AlertTriangle,
        } as ErrorDetails;
    }
  }, [error, resourceName, resourceType]);

  // --- RENDER LOGIC ---
  if (!error) {
    return null;
  }

  const IconComponent = details.icon;

  return (
    <Animated.View
      style={[
        styles.containerBase,
        size === "large" ? styles.containerLarge : styles.containerSmall,
        { backgroundColor },
        animatedStyle,
      ]}
    >
      <View style={styles.content}>
        <IconComponent
          color={`${destructiveColor}b3`} // 70% opacity
          size={size === "large" ? 96 : 64}
          strokeWidth="1.5"
          style={size === "large" ? styles.iconLarge : styles.iconSmall}
        />

        <Text
          style={[
            styles.statusCodeBase,
            size === "large" ? styles.statusCodeLarge : styles.statusCodeSmall,
            { color: `${destructiveColor}cc` }, // 80% opacity
          ]}
        >
          {details.statusCode}
        </Text>

        <Text
          style={[
            styles.titleBase,
            size === "large" ? styles.titleLarge : styles.titleSmall,
            { color: textColor },
          ]}
        >
          {details.title}
        </Text>

        <Text
          style={[
            styles.descriptionBase,
            size === "large"
              ? styles.descriptionLarge
              : styles.descriptionSmall,
            { color: mutedTextColor },
          ]}
        >
          {details.description}
        </Text>

        {showDetails && error.data?.detail && (
          <View
            style={[
              styles.detailsContainer,
              { backgroundColor: mutedBackgroundColor, borderColor },
            ]}
          >
            <Text style={[styles.detailsText, { color: mutedTextColor }]}>
              <Text style={{ fontWeight: "bold" }}>Details:</Text>{" "}
              {error.data.detail}
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button variant="outline" onPress={goBack}>
            <Icon name={ArrowLeft} style={styles.buttonIcon} />
            <Text>Go Back</Text>
          </Button>
          {error.status === 401 ? (
            <Button onPress={handleLogout}>
              <Icon name={LogOut} style={styles.buttonIcon} />
              <Text>Logout</Text>
            </Button>
          ) : customAction ? (
            <Button onPress={customAction.handler}>
              <Text>{customAction.label}</Text>
            </Button>
          ) : (
            <Button onPress={goHome}>
              <Icon name={Home} style={styles.buttonIcon} />
              <Text>Return Home</Text>
            </Button>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

// --- STYLESHEET ---
const styles = StyleSheet.create({
  // Containers
  containerBase: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  containerLarge: {
    padding: 16,
  },
  containerSmall: {
    padding: 32,
  },
  content: {
    alignItems: "center",
    textAlign: "center",
  },
  // Icon
  iconLarge: {
    marginBottom: 24,
  },
  iconSmall: {
    marginBottom: 16,
  },
  // Text
  statusCodeBase: {
    fontWeight: "bold",
    letterSpacing: 1,
  },
  statusCodeLarge: {
    fontSize: 36,
  },
  statusCodeSmall: {
    fontSize: 48,
  },
  titleBase: {
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginTop: 8,
  },
  titleLarge: {
    fontSize: 20,
  },
  titleSmall: {
    fontSize: 24,
  },
  descriptionBase: {
    textAlign: "center",
  },
  descriptionLarge: {
    fontSize: 16,
    marginVertical: 24,
  },
  descriptionSmall: {
    fontSize: 16,
    marginVertical: 16,
  },
  // Details Box
  detailsContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
  },
  detailsText: {
    // Using system monospace font for React Native
    fontFamily: "monospace",
    fontSize: 14,
  },
  // Buttons
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 24,
  },
  buttonIcon: {
    marginRight: 8,
    height: 16,
    width: 16,
  },
});
