import AppHeader from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SheetForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const mutedColor = useThemeColor({}, "textMuted");

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    Alert.alert("Success", "Form submitted successfully!");
    setFormData({ name: "", email: "", message: "" });
    setOpen(false);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Open Contact Form</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Contact Us</SheetTitle>
          <SheetDescription>
            Fill out the form below and we'll get back to you soon.
          </SheetDescription>
        </SheetHeader>
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
              placeholder="Enter your name"
              placeholderTextColor={mutedColor}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              placeholder="Enter your email"
              placeholderTextColor={mutedColor}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Message</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.message}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, message: text }))
              }
              placeholder="Enter your message"
              placeholderTextColor={mutedColor}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={handleSubmit}>
              Submit
            </Button>
            <Button
              variant="outline"
              style={styles.button}
              onPress={handleReset}
            >
              Reset
            </Button>
          </View>
        </View>
      </SheetContent>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 24,
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
  },
});

export default function UserListScreen() {
  const users = [
    { id: "1", name: "Alice Johnson", role: "Admin", status: "active" },
    { id: "2", name: "Michael Brown", role: "Cashier", status: "inactive" },
    { id: "3", name: "Sarah Lee", role: "Manager", status: "active" },
    { id: "4", name: "David Kim", role: "Sales", status: "inactive" },
    { id: "5", name: "Emma Davis", role: "Staff", status: "active" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <AppHeader
        // hideBackButton
        title={() => (
          <Text className="!text-red-500 !font-bold italic !text-2xl">
            User List
          </Text>
        )}
      />
      {/* Scrollable User List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <Card>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-muted-foreground">{item.role}</Text>
              </View>
              <Badge
                variant={item.status === "active" ? "success" : "destructive"}
              >
                {item.status}
              </Badge>
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}
