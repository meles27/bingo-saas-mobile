import { BingoCard } from "@/components/app/game/bingo-card";
import { BingoHeader } from "@/components/app/game/bingo-heder";
import { CalledNumbersDisplay } from "@/components/app/game/called-numbers-display";
import { ParticleBackground } from "@/components/app/game/particle-background";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/components/ui/toast";
import { View } from "@/components/ui/view";
import { useSocket } from "@/hooks/base/api/use-socket";
import { SocketEvent } from "@/lib/socket/socket.schema";
import { useAuthStore } from "@/store/auth-store";
import { SPACING_SM } from "@/theme/globals";
import { Plus, Send } from "lucide-react-native";
import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

const PRIMARY_COLOR = "#7f13ec";
const BACKGROUND_COLOR = "#191022";

// Mock data for the cards from HTML
const cardsData = [
  {
    id: 1,
    isWinner: true,
    numbers: [
      [3, 11, 5, 14, 9],
      [17, 28, 20, 25, 22],
      [33, 41, "FREE", 38, 31],
      [48, 52, 58, 46, 55],
      [63, 71, 68, 75, 61],
    ],
    calledNumbers: [3, 41, 68, 22, 55, 11, 20, 75, 9],
  },
  {
    id: 2,
    isWinner: false,
    numbers: [
      [7, 1, 12, 4, 15],
      [18, 21, 29, 26, 23],
      [35, 44, "FREE", 39, 30],
      [50, 56, 47, 53, 59],
      [65, 70, 62, 73, 66],
    ],
    calledNumbers: [18, 44, 62, 59, 15],
  },
  {
    id: 3,
    isWinner: false,
    numbers: [
      [2, 10, 6, 13, 8],
      [16, 27, 19, 24, 21],
      [32, 40, "FREE", 37, 34],
      [49, 51, 57, 45, 54],
      [64, 72, 67, 74, 60],
    ],
    calledNumbers: [16, 40, 67, 21, 60, 10],
  },
  {
    id: 4,
    isWinner: false,
    numbers: [
      [8, 2, 13, 5, 16],
      [19, 22, 30, 27, 24],
      [36, 45, "FREE", 40, 31],
      [51, 57, 48, 54, 60],
      [66, 71, 63, 74, 67],
    ],
    calledNumbers: [19, 45, 63, 60],
  },
];

export default function BingoNightScreen() {
  const token = useAuthStore((state) => state.token?.access);
  const tenantId = "764d0518-6c72-4393-a4d6-31c40992a7b1";
  const socket = useSocket({
    namespace: `/tenant-${tenantId}`,
    autoConnect: token ? true : false,
    token,
  });

  const toast = useToast();
  useEffect(() => {
    socket.on("connect", () => {
      toast.success("Connected", "Successfully connected to the server");
      console.log("[Socket] Connected");
    });
    socket.on("disconnect", () => {
      console.log("[Socket] Disconnected");
      toast.warning("Disconnected", "Disconnected from the server");
    });

    socket.on("error", (error: any) => {
      toast.error("Error", "Failed to connect to the server");
      console.error("[Socket] Error:", error);
    });

    socket.on<{
      message: string;
      user: {
        id: string;
        email: string;
      };
    }>(SocketEvent.T_WELCOME, (response) => {
      toast.success("Wellcome", response?.payload?.message);
      console.log("[Socket] Welcome:", response);
    });
  }, [socket.status, toast]);

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <BingoHeader />
      <CalledNumbersDisplay />

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
