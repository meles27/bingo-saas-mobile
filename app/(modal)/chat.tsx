import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  CORNERS,
  FONT_SIZE,
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
} from "@/theme/globals";
import { useRouter } from "expo-router";
import { Smile, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// --- Mock Data ---
const messages = [
  {
    id: "1",
    user: {
      name: "Ava",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCio_hw23Cwdlum76SFd_-DrGlTi_Q7BJhoJPyqEMJnOyNdzJp-oI-c1cHyo5QIrb5tdV2BEfjepf6Ijrx5LwMtZH0xAI7asvJya2zCp-QFY5vCNelKiSfzyeR_gkzXRpuX8pvIU1LUe-gGo4OpH3zk8_1R7_5nXkreA7A9SU1vg5VWg3QPqn_ojEqfEt1uHrr5HYKndsInAgPzT015bJpdsvQRi69ST1srbjTSm_3bmD2Cf4ehprjFsKaTYtJ-uv8QSClwmbdImPEK",
    },
    text: "Good luck everyone! Let's win big!",
    time: "10:32 AM",
    isSelf: false,
  },
  {
    id: "2",
    user: {
      name: "You",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_HpcfgOgmndEKm5pE3oUGSVUyzvsrD4y9orGq6i1YdlC9FuxxOJPy6DEX8pPT1fdYE7kK4EZmGgkdnW7E2cCqhRnnJu9M4BHIZFfmcKWFFnTdfmP4wy94bdbH0F_G2SrfVER5um62A3M0L0pvPuENJYhr9nhT_EBEb1Kzv6MwgfiaQfPLAQEwt40BYfWw56atvXBmq8UZunCJB0fypqCxU61tLyjX8si5kNu0R1rKmzjnyLnByoeh7KhVaS6UTER1Da37u792pZ8-",
    },
    text: "Thanks, Ava! Ready to play!",
    time: "10:33 AM",
    isSelf: true,
  },
  {
    id: "3",
    user: {
      name: "Chloe",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD9Xb8BCsOpj_FsazmfpF-gR9VjuIriwZSyMM9NyBvU0Spgn5lCEsYj0RmibwdFvHDP_yHXqnGQy-P9plBuXrGaMLGpnIl-enGX5O7SIWfKeGWDhQO_K-Gg8GbJcG0_CKpeCjxxQM4HjJqSlF0tfMOUuhbUqAvhXkPJ9dKQg05CYHAVUi4yRGEsz2YXuikxYQDnX5HalOxItG6BzA6sKUMBaFp7oeco35f7_wGSOUqhQ1UIUlmjH5nQ48N78dIhR9HjHPXrlsRAHeTI",
    },
    text: "Anyone close to a Bingo?",
    time: "10:35 AM",
    isSelf: false,
  },
];

// --- Helper Components ---
const MessageBubble = ({ message }: { message: (typeof messages)[0] }) => {
  const primaryColor = useThemeColor({}, "primary");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");

  const bubbleStyle = message.isSelf
    ? [styles.sentBubble, { backgroundColor: primaryColor }]
    : [styles.receivedBubble, { backgroundColor: cardColor }];

  const bubbleTextStyle = {
    color: message.isSelf ? primaryForegroundColor : textColor,
  };

  const messageContent = (
    <View
      style={
        message.isSelf
          ? styles.sentMessageContent
          : styles.receivedMessageContent
      }
    >
      <Text style={styles.metaText}>
        {message.user.name} · {message.time}
      </Text>
      <View style={bubbleStyle}>
        <Text style={[styles.bubbleText, bubbleTextStyle]}>{message.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.messageContainer}>
      {!message.isSelf && (
        <Avatar size={40}>
          <AvatarImage source={{ uri: message.user.avatar }} />
          <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      {messageContent}
      {message.isSelf && (
        <Avatar size={40}>
          <AvatarImage source={{ uri: message.user.avatar }} />
          <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </View>
  );
};

const ChatTab = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => {
  const primaryColor = useThemeColor({}, "primary");
  const mutedColor = useThemeColor({}, "textMuted");

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chatTab,
        { borderBottomColor: active ? primaryColor : "transparent" },
      ]}
    >
      <Text
        style={[
          styles.chatTabText,
          { color: active ? primaryColor : mutedColor },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// --- Main Screen Component ---
export default function ChatScreen() {
  const router = useRouter();
  const {
    isVisible: isEmojiSheetVisible,
    open: openEmojiSheet,
    close: closeEmojiSheet,
  } = useBottomSheet();

  // Theme Colors
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const inputBackgroundColor = useThemeColor({}, "input");
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor({}, "textMuted");

  // State
  const [activeTab, setActiveTab] = useState("round");
  const [message, setMessage] = useState("");
  const emojis = ["😀", "❤️", "👍", "🔥"];

  const handleEmojiPress = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    closeEmojiSheet();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.flex1, { backgroundColor }]}
    >
      <View style={styles.flex1}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle} variant="title">
            Chat
          </Text>
          <View style={styles.headerAction}>
            <Button size="icon" variant="ghost" onPress={() => router.back()}>
              <Icon name={X} />
            </Button>
          </View>
        </View>

        {/* Tabs */}
        <View
          style={[styles.tabsContainer, { borderBottomColor: borderColor }]}
        >
          <ChatTab
            label="Round Chat"
            active={activeTab === "round"}
            onPress={() => setActiveTab("round")}
          />
          <ChatTab
            label="Global Chat"
            active={activeTab === "global"}
            onPress={() => setActiveTab("global")}
          />
        </View>

        {/* Chat Messages */}
        <ScrollView contentContainerStyle={styles.messageList}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor }]}>
          <View
            style={[
              styles.inputWrapper,
              { backgroundColor: inputBackgroundColor },
            ]}
          >
            <TouchableOpacity
              style={styles.emojiButton}
              onPress={openEmojiSheet}
            >
              <Icon name={Smile} color={mutedColor} />
            </TouchableOpacity>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor={mutedColor}
              style={[styles.inputField, { color: textColor }]}
            />
          </View>
        </View>
      </View>

      {/* Emoji Bottom Sheet */}
      <BottomSheet
        isVisible={isEmojiSheetVisible}
        onClose={closeEmojiSheet}
        snapPoints={[0.2]}
        title="Quick Reactions"
      >
        <View style={styles.emojiSheetContainer}>
          {emojis.map((emoji) => (
            <TouchableOpacity
              key={emoji}
              onPress={() => handleEmojiPress(emoji)}
            >
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING_SM,
  },
  headerSpacer: {
    flex: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  headerAction: {
    flex: 1,
    alignItems: "flex-end",
  },
  tabsContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: SPACING_MD,
    flexDirection: "row",
    gap: SPACING_LG,
  },
  chatTab: {
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 3,
  },
  chatTabText: {
    fontSize: 14,
    fontWeight: "700",
  },
  messageList: {
    padding: SPACING_MD,
    gap: SPACING_LG,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: SPACING_MD,
  },
  sentMessageContent: {
    gap: 4,
    alignItems: "flex-end",
  },
  receivedMessageContent: {
    gap: 4,
    alignItems: "flex-start",
  },
  metaText: {
    fontSize: 12,
    color: "#a1a1aa", // Muted text color
  },
  sentBubble: {
    paddingHorizontal: SPACING_MD,
    paddingVertical: 12,
    borderRadius: SPACING_LG,
    borderBottomRightRadius: 0,
  },
  receivedBubble: {
    paddingHorizontal: SPACING_MD,
    paddingVertical: 12,
    borderRadius: SPACING_LG,
    borderBottomLeftRadius: 0,
  },
  bubbleText: {
    fontSize: 16,
  },
  footer: {
    padding: SPACING_MD,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: CORNERS,
    paddingHorizontal: SPACING_SM,
  },
  emojiButton: {
    padding: SPACING_SM,
  },
  inputField: {
    flex: 1,
    height: "100%",
    fontSize: FONT_SIZE,
  },
  emojiSheetContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: SPACING_MD,
  },
  emoji: {
    fontSize: 32,
  },
});
