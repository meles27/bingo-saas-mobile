import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SearchBar } from "@/components/ui/searchbar";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SPACING_LG, SPACING_MD, SPACING_SM } from "@/theme/globals";
import { FlashList } from "@shopify/flash-list";
import { X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

// --- Mock Data ---
const friends = [
  {
    id: "1",
    name: "Ethan",
    username: "@ethan_plays",
    avatar: "https://i.pravatar.cc/150?u=ethan",
  },
  {
    id: "2",
    name: "Olivia",
    username: "@olivia_gamer",
    avatar: "https://i.pravatar.cc/150?u=olivia",
  },
  {
    id: "3",
    name: "Liam",
    username: "@liam_wins",
    avatar: "https://i.pravatar.cc/150?u=liam",
  },
  {
    id: "4",
    name: "Sophia",
    username: "@sophia_b",
    avatar: "https://i.pravatar.cc/150?u=sophia",
  },
  {
    id: "5",
    name: "Noah",
    username: "@noah_bingo",
    avatar: "https://i.pravatar.cc/150?u=noah",
  },
  {
    id: "6",
    name: "Ava",
    username: "@ava_star",
    avatar: "https://i.pravatar.cc/150?u=ava",
  },
  {
    id: "7",
    name: "James",
    username: "@james_luck",
    avatar: "https://i.pravatar.cc/150?u=james",
  },
];

type Friend = (typeof friends)[0];

// --- Helper Component for Friend List Item ---
const FriendItem = ({
  item,
  isSelected,
  onToggleSelect,
}: {
  item: Friend;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) => {
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor({}, "textMuted");

  return (
    <View style={styles.friendItemContainer}>
      <Avatar size={48}>
        <AvatarImage source={{ uri: item.avatar }} />
        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <View style={styles.friendInfo}>
        <Text style={[styles.friendName, { color: textColor }]}>
          {item.name}
        </Text>
        <Text style={[styles.friendUsername, { color: mutedColor }]}>
          {item.username}
        </Text>
      </View>
      <Button
        variant={isSelected ? "default" : "outline"}
        size="sm"
        onPress={() => onToggleSelect(item.id)}
      >
        {isSelected ? "Selected" : "Invite"}
      </Button>
    </View>
  );
};

// --- Main Sheet Content Component ---
export function InviteSheetContent({ onClose }: { onClose: () => void }) {
  const { success: showSuccessToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const borderColor = useThemeColor({}, "border");

  const filteredFriends = useMemo(() => {
    if (!searchQuery) return friends;
    return friends.filter(
      (friend) =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFriendSelection = (id: string) => {
    setSelectedFriends((prev) =>
      prev.includes(id)
        ? prev.filter((friendId) => friendId !== id)
        : [...prev, id]
    );
  };

  const handleSendInvites = () => {
    // In a real app, you would send the invites here
    console.log(`Inviting friends with IDs: ${selectedFriends.join(", ")}`);
    showSuccessToast(
      "Invites Sent!",
      `Successfully sent ${selectedFriends.length} invitation(s).`
    );
    onClose();
  };

  return (
    <View style={styles.sheetContainer}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <Text variant="title" style={styles.headerTitle}>
          Invite Friends
        </Text>
        <Button size="icon" variant="ghost" onPress={onClose}>
          <Icon name={X} />
        </Button>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search friends..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Friends List */}
      <FlashList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendItem
            item={item}
            isSelected={selectedFriends.includes(item.id)}
            onToggleSelect={toggleFriendSelection}
          />
        )}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No friends found.</Text>
        }
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          size="lg"
          style={styles.footerButton}
          disabled={selectedFriends.length === 0}
          onPress={handleSendInvites}
        >
          {`Send Invites (${selectedFriends.length})`}
        </Button>
      </View>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  sheetContainer: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING_SM,
    borderBottomWidth: 1,
  },
  headerTitle: { flex: 1, textAlign: "center", marginLeft: 40 }, // Offset for button
  searchContainer: { padding: SPACING_MD },
  listContentContainer: { paddingHorizontal: SPACING_MD, flexGrow: 1 },
  friendItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING_SM,
    gap: SPACING_MD,
  },
  friendInfo: { flex: 1 },
  friendName: { fontWeight: "600" },
  friendUsername: { fontSize: 14 },
  emptyText: { textAlign: "center", marginTop: SPACING_LG, color: "#a1a1aa" },
  footer: {
    padding: SPACING_MD,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  footerButton: { width: "100%" },
});
