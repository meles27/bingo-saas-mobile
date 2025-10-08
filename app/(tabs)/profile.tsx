import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GroupedInput, GroupedInputItem } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Picker, PickerOption } from "@/components/ui/picker";
import { ScrollView } from "@/components/ui/scroll-view";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { ToggleGroupSingle } from "@/components/ui/toggle";
import { View } from "@/components/ui/view";
import {
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
  SPACING_XL,
} from "@/theme/globals";
import {
  Languages,
  LogOut,
  Mail,
  Moon,
  Sun,
  Trash2,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const languageOptions: PickerOption[] = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
];

export default function ProfileScreen() {
  const { success: showSuccessToast } = useToast();

  // State for interactive components
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [language, setLanguage] = useState<string>("en");
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("system");

  const handleSaveChanges = () => {
    // Here you would typically call an API to save the user's settings
    console.log("Saving changes:", {
      username,
      email,
      language,
      notifications,
      theme,
    });
    showSuccessToast(
      "Profile Updated",
      "Your changes have been saved successfully."
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Avatar size={80}>
              <AvatarImage
                source={{
                  uri: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                }}
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <View style={styles.profileTextContainer}>
              <View style={styles.profileNameRow}>
                <Text variant="title">{username}</Text>
                <Badge variant="success" textStyle={{ color: "white" }}>
                  PRO
                </Badge>
              </View>
              <Text variant="caption">{email}</Text>
            </View>
          </View>

          {/* Account Settings */}
          <GroupedInput title="Account Settings">
            <GroupedInputItem
              label="Username"
              icon={User}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
            />
            <GroupedInputItem
              label="Email"
              icon={Mail}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />
          </GroupedInput>

          {/* Preferences */}
          <GroupedInput title="Preferences">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Picker
                variant="group"
                label="Language"
                icon={Languages}
                options={languageOptions}
                value={language}
                onValueChange={setLanguage}
                modalTitle="Select Language"
              />
            </View>
            <Switch
              label="Push Notifications"
              value={notifications}
              onValueChange={setNotifications}
            />
          </GroupedInput>

          <View>
            <Text
              variant="title"
              style={{ marginBottom: SPACING_MD, marginLeft: SPACING_SM }}
            >
              Theme
            </Text>
            <ToggleGroupSingle
              size="default"
              variant="outline"
              value={theme}
              onValueChange={setTheme}
              items={[
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
              ]}
            />
          </View>

          {/* Danger Zone */}
          <Accordion type="single" collapsible>
            <AccordionItem value="danger-zone">
              <AccordionTrigger>Account Actions</AccordionTrigger>
              <AccordionContent style={{ gap: SPACING_MD }}>
                <Button variant="destructive" icon={Trash2}>
                  Delete Account
                </Button>
                <Link href="/(auth)/signin">
                  <Button
                    variant="outline"
                    icon={LogOut}
                    style={{ width: "100%" }}
                  >
                    Log Out
                  </Button>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Save Button */}
          <Button size="lg" onPress={handleSaveChanges}>
            Save Changes
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING_MD,
    gap: SPACING_XL,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING_LG,
  },
  profileTextContainer: {
    flex: 1,
    gap: SPACING_SM / 2,
  },
  profileNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING_MD,
  },
});
