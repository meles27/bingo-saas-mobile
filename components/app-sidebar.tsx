import { Icon } from "@/components/ui/icon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useSidebar } from "@/hooks/base/use-sidebar";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Bell, Home, Mail, Search, Settings, User } from "lucide-react-native";
import { default as React, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export function AppSidebar() {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [activeItem, setActiveItem] = useState("home");
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor({}, "textMuted");
  const borderColor = useThemeColor({}, "border");

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "messages", label: "Messages", icon: Mail },
    { id: "search", label: "Search", icon: Search },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleItemPress = (itemId: string) => {
    setActiveItem(itemId);
    closeSidebar();
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleSidebar} side="left">
      <SheetContent
        style={{
          backgroundColor: useThemeColor({}, "background"),
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Navigate to different sections of the app.
          </SheetDescription>
        </SheetHeader>
        <View style={styles.navigationContainer}>
          {navigationItems.map((item) => {
            const name = item.icon;
            const isActive = activeItem === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.navigationItem,
                  {
                    backgroundColor: isActive
                      ? `${textColor}10`
                      : "transparent",
                    borderColor,
                  },
                ]}
                onPress={() => handleItemPress(item.id)}
              >
                <Icon
                  name={name}
                  size={20}
                  color={isActive ? textColor : mutedColor}
                />
                <Text
                  style={[
                    styles.navigationText,
                    { color: isActive ? textColor : mutedColor },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SheetContent>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    padding: 16,
    gap: 8,
  },
  navigationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  navigationText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
