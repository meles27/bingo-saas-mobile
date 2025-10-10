import { BingoCard } from "@/components/app/game/bingo-card";
import { BingoHeader } from "@/components/app/game/bingo-heder";
import { CalledNumbersDisplay } from "@/components/app/game/called-numbers-display";
import { ParticleBackground } from "@/components/app/game/particle-background";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { View } from "@/components/ui/view";
import { useSocket } from "@/hooks/base/api/use-socket";
import { useGameSubscription } from "@/hooks/game/use-game-subscription";
import { useAuthStore } from "@/store/auth-store";
import { SPACING_SM } from "@/theme/globals";
import { Plus, Send } from "lucide-react-native";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

const PRIMARY_COLOR = "#7f13ec";
const BACKGROUND_COLOR = "#191022";

const cardsData = [
  {
    id: 1,
    isWinner: true,
    numbers: [
      [3, 17, 33, 48, 63],
      [11, 28, 41, 52, 71],
      [5, 20, "FREE", 58, 68],
      [14, 25, 38, 46, 75],
      [9, 22, 31, 55, 61],
    ],
    calledNumbers: [3, 41, 68, 22, 55, 11, 20, 75, 9],
  },
  {
    id: 2,
    isWinner: false,
    numbers: [
      [7, 18, 35, 50, 65],
      [1, 21, 44, 56, 70],
      [12, 29, "FREE", 47, 62],
      [4, 26, 39, 53, 73],
      [15, 23, 30, 59, 66],
    ],
    calledNumbers: [18, 44, 62, 59, 15],
  },
  {
    id: 3,
    isWinner: false,
    numbers: [
      [2, 16, 32, 49, 64],
      [10, 27, 40, 51, 72],
      [6, 19, "FREE", 57, 67],
      [13, 24, 37, 45, 74],
      [8, 21, 34, 54, 60],
    ],
    calledNumbers: [16, 40, 67, 21, 60, 10],
  },
  {
    id: 4,
    isWinner: false,
    numbers: [
      [8, 19, 36, 51, 66],
      [2, 22, 45, 57, 71],
      [13, 30, "FREE", 48, 63],
      [5, 27, 40, 54, 74],
      [16, 24, 31, 60, 67],
    ],
    calledNumbers: [19, 45, 63, 60],
  },
];

export default function PlayBingoScreen() {
  const token = useAuthStore((state) => state.token?.access);
  const tenantId = "764d0518-6c72-4393-a4d6-31c40992a7b1";
  const sock = useSocket({
    namespace: `/tenant-${tenantId}`,
    token,
  });

  const { status, activeGames, nextScheduledGame } = useGameSubscription({
    tenantId,
    token,
  });

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <BingoHeader game={activeGames?.[0]?.game} />
      <CalledNumbersDisplay
        calledNumbers={activeGames?.[0]?.calledNumbers || []}
        lastCalledNumber={activeGames?.[0]?.lastNumberCalled}
      />

      <FlatList
        data={cardsData}
        numColumns={2}
        renderItem={({ item: card }) => <BingoCard {...card} key={card.id} />}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* FABs */}
      <Button icon={Send} size="icon" style={[styles.fab, styles.fabLeft]} />

      <Button
        size="icon"
        style={[styles.fab, styles.fabRight, styles.neonGlow]}
      >
        <Icon name={Plus} color="white" size={40} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    gap: SPACING_SM,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 140, // Height of the sticky header + some space
    paddingBottom: 40,
  },
  cardsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4, // Counteract card wrapper padding
  },
  cardWrapper: {
    padding: 4,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    zIndex: 40,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabLeft: {
    left: 24,
    width: 56,
    height: 56,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  sendIcon: {
    transform: [{ rotate: "-45deg" }, { translateY: -1 }, { translateX: 1 }],
  },
  fabRight: {
    right: 24,
    width: 64,
    height: 64,
    backgroundColor: `${PRIMARY_COLOR}cc`,
  },
  neonGlow: {
    shadowColor: PRIMARY_COLOR,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
  },
});
