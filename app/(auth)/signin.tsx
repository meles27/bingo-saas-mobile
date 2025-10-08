import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  HORIZONTAL_SCREEN_PADDING,
  SPACING_MD,
  SPACING_SM,
  SPACING_XL,
  VERTICAL_SCREEN_PADDING,
} from "@/theme/globals";
import { useRouter } from "expo-router";
import { Facebook, FileLock, Github, Phone } from "lucide-react-native";
import React from "react";
// import { View } from "react-native";

const Signup = () => {
  const router = useRouter();
  const primaryColor = useThemeColor({}, "primary");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING_XL,
        paddingVertical: VERTICAL_SCREEN_PADDING,
        paddingHorizontal: HORIZONTAL_SCREEN_PADDING,
      }}
    >
      <View className="relative w-full h-1/3">
        <Image
          alt="Bingo player illustration"
          className="w-full h-full object-cover rounded-t-none"
          style={{ borderRadius: 0 }}
          containerStyle={{ borderRadius: 0 }}
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrpuP4LDjdJ_sU_KNuhei19ZhCXnae0cP0gkJkfyUfrInz5YRJXHbCHFLj0YflzxyL8yYTuIqtkW8R31I3XMh2dwkoH4dkI4ikIfELVvI3KSTB7A959lgG3VCocuc0ua3HPvdcgqYLoecY5MYljHMjZ9bxZkn9JAq09h7mTwJBeuLEYcdaS7EI29zKWuuQXu8FAN9Iu4o0kwO_LsdBtt917dKnU0rghRfe_uYQYxRAQLPXOsywFNUWIoATiZL2C0_pBGXgE4ookPlz",
          }}
        />

        {/* overlay test */}
        <View className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
          <Text variant="title">Alpha Betting</Text>
          <Text variant="subtitle">Get ready to bet</Text>
        </View>
      </View>

      <View
        style={{ gap: SPACING_MD, alignSelf: "stretch" }}
        // className="-translate-y-1/3 mx-3"
      >
        <View style={{ gap: SPACING_SM, alignSelf: "stretch" }}>
          <Input icon={Phone} placeholder="Phone Number" />
          <Input icon={FileLock} placeholder="Password" />
        </View>

        <View style={{ gap: SPACING_SM, alignSelf: "stretch" }}>
          <Button onPress={() => router.push("/signin")}>Sign In</Button>
          <Button variant="outline">Create Account</Button>
        </View>

        <Text
          variant="subtitle"
          style={{
            color: primaryColor,
            flexDirection: "row",
            alignItems: "center",
            textAlign: "center",
            gap: SPACING_SM,
          }}
        >
          or
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: SPACING_SM,
          }}
        >
          <Button size="icon" icon={Facebook} />
          <Button size="icon" icon={Github} />
        </View>
      </View>
    </View>
  );
};

export default Signup;
