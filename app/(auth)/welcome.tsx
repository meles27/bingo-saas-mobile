// import { Button } from "@/components/ui/button";
// import { Text } from "@/components/ui/text";
// import { View } from "@/components/ui/view";
// import { useThemeColor } from "@/hooks/useThemeColor";
// import {
//   CORNERS,
//   HORIZONTAL_SCREEN_PADDING,
//   SPACING_SM,
//   SPACING_XL,
//   SPACING_XS,
//   VERTICAL_SCREEN_PADDING,
// } from "@/theme/globals";
// import { useRouter } from "expo-router";
// import { StarIcon } from "lucide-react-native";
// import React from "react";

// const Welcome = () => {
//   const primaryColor = useThemeColor({}, "primary");
//   const router = useRouter();

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         gap: SPACING_XL,
//         paddingVertical: VERTICAL_SCREEN_PADDING,
//         paddingHorizontal: HORIZONTAL_SCREEN_PADDING,
//       }}
//     >
//       <View
//         style={{ flexDirection: "row", alignItems: "center", gap: SPACING_XS }}
//       >
//         <View
//           style={{
//             borderRadius: CORNERS,
//             backgroundColor: primaryColor,
//             padding: SPACING_SM,
//             overflow: "hidden",
//           }}
//         >
//           <StarIcon size={48} color={"yellow"} />
//         </View>
//         <Text variant="title">BINGO</Text>
//       </View>

//       <Text variant="title">
//         Play Rounds.
//         <Text variant="title" style={{ color: primaryColor }}>
//           Win Big
//         </Text>
//       </Text>

//       <View style={{ gap: SPACING_SM, alignSelf: "stretch" }}>
//         <Button onPress={() => router.push("/signin")}>Sign In</Button>
//         <Button variant="outline">Create Account</Button>
//       </View>
//     </View>
//   );
// };

// export default Welcome;

import { Onboarding, OnboardingStep } from "@/components/ui/onboarding";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const StepIcon = ({
  name,
  bgColor,
  iconColor,
}: {
  name: string;
  bgColor: string;
  iconColor: string;
}) => (
  <View
    style={{
      padding: 18,
      backgroundColor: bgColor,
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    }}
  >
    <Feather name={name as any} size={56} color={iconColor} />
  </View>
);

export default function OnboardingNoSwipe() {
  const router = useRouter();
  const steps: OnboardingStep[] = [
    {
      id: "1",
      title: "Tutorial Mode",
      description:
        "Follow along with our step-by-step tutorial. Use the buttons below to navigate at your own pace.",
      icon: <StepIcon name="book-open" bgColor="#ede9fe" iconColor="#7c3aed" />,
    },
    {
      id: "2",
      title: "Learn the Basics",
      description:
        "Master the fundamental features that will help you get the most out of our platform.",
      icon: <StepIcon name="layers" bgColor="#dcfce7" iconColor="#16a34a" />,
    },
    {
      id: "3",
      title: "Practice Makes Perfect",
      description:
        "Try out the features yourself in a safe environment before working with real data.",
      icon: <StepIcon name="target" bgColor="#fef3c7" iconColor="#d97706" />,
    },
  ];

  return (
    <Onboarding
      steps={steps}
      onComplete={() => router.replace("/signin")}
      onSkip={() => console.log("Tutorial skipped!")}
      swipeEnabled={false}
      showProgress={true}
      primaryButtonText="Start Using App"
      nextButtonText="Next Lesson"
      skipButtonText="Skip Tutorial"
    />
  );
}
