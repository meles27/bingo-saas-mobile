import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SPACING_SM } from "@/theme/globals";
import {
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Pill,
  Settings,
  Share,
} from "lucide-react-native";
import { default as React } from "react";

export function ButtonIconOnly() {
  return (
    <View style={{ gap: 12, flexDirection: "row", flexWrap: "wrap" }}>
      <Button size="icon" icon={Settings} />

      <Button size="icon" variant="outline" icon={Heart} />

      <Button size="icon" variant="secondary" icon={Share} />

      <Button size="icon" variant="ghost" icon={MoreHorizontal} />

      <Button size="icon" variant="destructive" icon={MessageCircle} />
    </View>
  );
}

export const QuickActions = () => {
  const primaryColor = useThemeColor({}, "purple");
  console.log("primaryColor", primaryColor);
  const quickActions = [
    {
      name: "Find Nearby",
      icon: MapPin,
    },
    {
      name: "Popular Drugs",
      icon: Pill,
    },
  ];
  return (
    <View style={{ gap: SPACING_SM }}>
      <Text variant="subtitle">Quick Actions</Text>
      <View style={{ flexDirection: "row", gap: SPACING_SM }}>
        {quickActions.map((action, index) => (
          <Button
            style={{ flex: 1 }}
            variant="default"
            icon={action.icon}
            key={index}
          >
            {action.name}
          </Button>
        ))}
      </View>
    </View>
  );
};
