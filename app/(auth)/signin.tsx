import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuthStore } from "@/store/auth-store";
import { SPACING_MD, SPACING_SM, SPACING_XL } from "@/theme/globals";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import {
  Eye,
  EyeOff,
  Facebook,
  FileLock,
  Github,
  LucideIcon,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Controller,
  useForm,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { z } from "zod";

// --- 1. VALIDATION SCHEMA using Zod ---
// We define the shape and rules for our form data here.
// const signInSchema = z.object({
//   phone: z
//     .string()
//     .min(1, "Phone number is required.")
//     .min(10, "Please enter a valid phone number."),
//   password: z
//     .string()
//     .min(1, "Password is required.")
//     .min(6, "Password must be at least 6 characters."),
// });

const signInSchema = z.object({
  username: z.string().min(3, "Phone number is required."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

// Infer the TypeScript type from the schema for full type safety
type SignInFormData = z.infer<typeof signInSchema>;

// --- 2. CONTROLLED INPUT COMPONENT ---
// A reusable wrapper to connect our custom `Input` with React Hook Form.
// This is a key pattern for integrating UI libraries.
interface ControlledInputProps {
  control: Control<SignInFormData>;
  name: keyof SignInFormData;
  // label: string;
  placeholder: string;
  icon?: LucideIcon;
  secureTextEntry?: boolean;
  rightComponent?: React.ReactNode;
  errors: FieldErrors<SignInFormData>;
}

const ControlledInput = ({
  control,
  name,
  errors,
  ...props
}: ControlledInputProps) => (
  <View>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={errors[name]?.message} // Pass error message to the Input
          {...props}
        />
      )}
    />
    {errors[name] && (
      <Text style={styles.errorText}>{errors[name]?.message}</Text>
    )}
  </View>
);

// --- 3. THE MAIN SIGN-IN SCREEN ---
const SignInScreen = () => {
  const router = useRouter();
  const primaryColor = useThemeColor({}, "primary");
  const mutedColor = useThemeColor({}, "mutedForeground");

  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((state) => state.login);
  const loginState = useAuthStore((state) => state.loginState);

  // React Hook Form Initialization
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched", // Validate fields when the user blurs them
  });

  // Submission Handler
  const onSubmit = async (data: SignInFormData) => {
    try {
      await login(data.username, data.password);

      router.replace("/(tabs)/play"); // Adjust this to your main route
    } catch (error: any) {
      // On failure, show a native alert with the API error message.
      Alert.alert(
        "Sign In Failed",
        error.data?.detail || "Please check your credentials and try again."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Image
            alt="Abstract art representing security and connection"
            style={styles.headerImage}
            source={{
              uri: "https://images.unsplash.com/photo-1554189097-c483f218c328?q=80&w=2487&auto=format&fit=crop",
            }}
          />
        </View>

        <View style={styles.formContainer}>
          <Text variant="title" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="subtitle" style={styles.subtitle}>
            Sign in to continue your journey.
          </Text>

          <View style={styles.inputGroup}>
            <ControlledInput
              control={control}
              name="username"
              errors={errors}
              // label="Username Number"
              placeholder="Enter your username number"
              icon={User}
            />
            <ControlledInput
              control={control}
              name="password"
              errors={errors}
              // label="Password"
              placeholder="Enter your password"
              icon={FileLock}
              secureTextEntry={!showPassword}
              rightComponent={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={22} color={mutedColor} />
                  ) : (
                    <Eye size={22} color={mutedColor} />
                  )}
                </Pressable>
              }
            />
            <Pressable style={styles.forgotPassword}>
              <Text variant="caption" style={{ color: primaryColor }}>
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          <View style={styles.buttonGroup}>
            <Button
              onPress={handleSubmit(onSubmit)}
              loading={loginState.isLoading} // Show loading state on the button
              disabled={loginState.isLoading}
            >
              Sign In
            </Button>
          </View>

          <Text variant="caption" style={styles.dividerText}>
            or continue with
          </Text>

          <View style={styles.socialLoginContainer}>
            <Button size="icon" variant="outline" icon={Facebook} />
            <Button size="icon" variant="outline" icon={Github} />
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Don't have an account? </Text>
          <Pressable onPress={() => router.push("/signin")}>
            <Text style={{ color: primaryColor, fontWeight: "bold" }}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// --- 4. STYLESHEET ---
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center" },
  headerContainer: {
    height: "25%",
    width: "100%",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    gap: SPACING_XL,
    padding: SPACING_XL,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  inputGroup: {
    gap: SPACING_MD,
  },
  buttonGroup: {
    gap: SPACING_SM,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  dividerText: {
    textAlign: "center",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING_MD,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING_MD,
  },
  errorText: {
    color: "red", // Or use a theme color
    marginTop: 4,
    marginLeft: 2,
  },
});

export default SignInScreen;
