import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  MessageCircleHeart,
  Send,
  SendHorizonal,
  Smile,
  X,
} from "lucide-react-native";
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
    user: { name: "Ava", avatar: "https://i.pravatar.cc/150?u=ava" },
    text: "Good luck everyone! Let's win big!",
    time: "10:32 AM",
    isSelf: false,
  },
  {
    id: "2",
    user: { name: "You", avatar: "https://i.pravatar.cc/150?u=you" },
    text: "Thanks, Ava! Ready to play!",
    time: "10:33 AM",
    isSelf: true,
  },
  {
    id: "3",
    user: { name: "Chloe", avatar: "https://i.pravatar.cc/150?u=chloe" },
    text: "Anyone close to a Bingo?",
    time: "10:35 AM",
    isSelf: false,
  },
];

// --- Helper Components ---
const MessageBubble = ({ message }: { message: (typeof messages)[0] }) => {
  // Component colors
  const primaryColor = useThemeColor({}, "primary");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");

  // Determine styles based on whether the message is sent by the current user
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

// --- Main Chat UI Component ---
export function ChatSheetContent({ onClose }: { onClose: () => void }) {
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex1}
      keyboardVerticalOffset={100} // Adjust this offset as needed
    >
      <View style={[styles.flex1, { backgroundColor }]}>
        {/* Header (Inside Sheet) */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle} variant="title">
            Chat
          </Text>
          <View style={styles.headerAction}>
            <Button size="icon" variant="ghost" onPress={onClose}>
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
          {/* Emoji Reactions */}
          <View style={styles.emojiContainer}>
            {emojis.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                onPress={() => setMessage((prev) => prev + emoji)}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Message Input */}
          <View
            style={[
              styles.inputWrapper,
              { backgroundColor: inputBackgroundColor },
            ]}
          >
            <TouchableOpacity style={styles.emojiButton}>
              <Icon name={Smile} color={mutedColor} />
            </TouchableOpacity>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor={mutedColor}
              style={[styles.inputField, { color: textColor }]}
            />
            <Button size="icon">
              <SendHorizonal />
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  flex1: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", padding: SPACING_SM },
  headerSpacer: { flex: 1 },
  headerTitle: { flex: 1, textAlign: "center" },
  headerAction: { flex: 1, alignItems: "flex-end" },
  tabsContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: SPACING_MD,
    flexDirection: "row",
    gap: SPACING_LG,
  },
  chatTab: { paddingTop: 8, paddingBottom: 12, borderBottomWidth: 3 },
  chatTabText: { fontSize: 14, fontWeight: "700" },
  messageList: { flexGrow: 1, padding: SPACING_MD, gap: SPACING_LG },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: SPACING_SM,
  },
  sentMessageContent: { gap: 4, alignItems: "flex-end" },
  receivedMessageContent: { gap: 4, alignItems: "flex-start" },
  metaText: { fontSize: 12, color: "#a1a1aa" },
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
  bubbleText: { fontSize: 16 },
  footer: { padding: SPACING_MD, gap: SPACING_MD },
  emojiContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  emoji: { fontSize: 24 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: CORNERS,
    paddingHorizontal: SPACING_SM,
  },
  emojiButton: { padding: SPACING_SM },
  inputField: { flex: 1, height: "100%", fontSize: FONT_SIZE },
});
