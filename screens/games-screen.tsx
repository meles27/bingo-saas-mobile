import { ChatSheetContent } from "@/components/app/chat/chat-sheet";
import { Badge } from "@/components/ui/badge";
import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { ToggleGroupSingle } from "@/components/ui/toggle";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CORNERS, SPACING_LG, SPACING_MD, SPACING_SM } from "@/theme/globals";
import { useRouter } from "expo-router";
import {
  ChevronDown,
  MessageSquareText, // Import chat icon
  Search,
  Settings,
} from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// --- Mock Data and Helper Components (GameCard, etc.) remain the same ---
// ... (GameCard, GameCardDetail components are unchanged from the previous answer)
const games = [
  {
    id: "1",
    name: "Bingo Blitz",
    description: "A fast-paced bingo adventure.",
    prize: "2,500 Coins",
    entry: "500 Coins",
    rounds: "5",
    status: "live",
    statusColor: { bg: "#dcfce7", text: "#166534" },
  },
  {
    id: "2",
    name: "Silver Streak",
    description: "Classic bingo with a silver lining.",
    prize: "5,000 Gems",
    entry: "1,000 Gems",
    rounds: "3",
    status: "upcoming",
    statusText: "Starts in 1h",
    statusColor: { bg: "#dbeafe", text: "#1e40af" },
  },
  {
    id: "3",
    name: "Golden Gala",
    description: "High stakes for golden rewards.",
    prize: "10,000 Coins",
    entry: "2,000 Coins",
    rounds: "7",
    status: "finished",
    statusText: "View Results",
    statusColor: { bg: "#fee2e2", text: "#991b1b" },
  },
];
const GameCardDetail = ({ label, value }: { label: string; value: string }) => {
  return (
    <View>
      <Text variant="caption">{label}</Text>
      <Text style={{ fontWeight: "600" }}>{value}</Text>
    </View>
  );
};
const GameCard = ({ game }: { game: (typeof games)[0] }) => {
  const router = useRouter();
  const cardColor = useThemeColor({}, "card");
  const getButtonVariant = () =>
    game.status === "live" ? "default" : "outline";
  const getButtonText = () => {
    switch (game.status) {
      case "live":
        return "Join Game";
      case "upcoming":
        return game.statusText || "Upcoming";
      case "finished":
        return game.statusText || "Finished";
      default:
        return "Join";
    }
  };
  return (
    <View
      style={{
        backgroundColor: cardColor,
        padding: SPACING_MD,
        borderRadius: SPACING_LG,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text variant="subtitle">{game.name}</Text>
          <Text variant="caption" style={{ marginTop: 4 }}>
            {game.description}
          </Text>
        </View>
        <Badge
          style={{
            backgroundColor: game.statusColor.bg,
            marginLeft: SPACING_SM,
          }}
          textStyle={{ color: game.statusColor.text, fontWeight: "600" }}
        >
          {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
        </Badge>
      </View>
      <View
        style={{
          marginTop: SPACING_MD,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: SPACING_MD,
        }}
      >
        <GameCardDetail label="Prize" value={game.prize} />
        <GameCardDetail label="Entry Fee" value={game.entry} />
        <GameCardDetail label="Rounds" value={game.rounds} />
      </View>
      <Button
        variant={getButtonVariant()}
        style={{ marginTop: SPACING_MD, width: "100%" }}
        disabled={game.status !== "live"}
        onPress={() => router.push("/game-detail")}
      >
        {getButtonText()}
      </Button>
    </View>
  );
};

// --- Main Screen Component ---
export default function GamesScreen() {
  const {
    isVisible: isChatVisible,
    open: openChat,
    close: closeChat,
  } = useBottomSheet();
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const [activeFilter, setActiveFilter] = useState("All");

  const filterItems = [
    { value: "All", label: "All" },
    { value: "Live", label: "Live" },
    { value: "Upcoming", label: "Upcoming" },
    { value: "Completed", label: "Completed" },
  ];

  return (
    <View style={[styles.flex1, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAction} />
        <Text variant="title" style={styles.headerTitle}>
          Bingo Lobby
        </Text>
        <View style={styles.headerAction}>
          <Button size="icon" variant="secondary" style={styles.settingsButton}>
            <Icon name={Settings} />
          </Button>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search, Filters, and Game List (Unchanged) */}
        <View style={styles.section}>
          <Input placeholder="Search games" icon={Search} variant="outline" />
        </View>
        <View style={styles.section}>
          <ToggleGroupSingle
            items={filterItems}
            value={activeFilter}
            onValueChange={(value) => value && setActiveFilter(value)}
            size="default"
            variant="outline"
          />
        </View>
        <View style={[styles.section, styles.row]}>
          <Button variant="secondary" size="sm" style={styles.sortButton}>
            <View style={styles.row}>
              <Text>Sort by: Prize</Text>
              <Icon name={ChevronDown} size={16} />
            </View>
          </Button>
          <Button variant="secondary" size="sm" style={styles.sortButton}>
            <View style={styles.row}>
              <Text>Filter</Text>
              <Icon name={ChevronDown} size={16} />
            </View>
          </Button>
        </View>
        <View style={[styles.section, { gap: SPACING_MD }]}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </View>
      </ScrollView>

      {/* Chat Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: primaryColor }]}
        onPress={openChat}
      >
        <Icon name={MessageSquareText} color={primaryForegroundColor} />
      </TouchableOpacity>

      {/* Chat Bottom Sheet */}
      <BottomSheet
        isVisible={isChatVisible}
        onClose={closeChat}
        snapPoints={[0.95]}
      >
        <ChatSheetContent onClose={closeChat} />
      </BottomSheet>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  flex1: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING_MD,
    height: 60,
  },
  headerTitle: { textAlign: "center" },
  headerAction: { flex: 1, alignItems: "flex-end" },
  settingsButton: { width: 40, height: 40, borderRadius: CORNERS },
  scrollContent: { paddingBottom: 100 },
  section: { paddingHorizontal: SPACING_MD, marginBottom: SPACING_MD },
  row: { flexDirection: "row", alignItems: "center", gap: SPACING_SM },
  sortButton: { paddingHorizontal: SPACING_MD },
  fab: {
    position: "absolute",
    bottom: 100, // Position above the tab bar
    right: SPACING_LG,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
