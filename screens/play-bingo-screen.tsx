import { BingoHeader } from "@/components/app/active-game/bingo-heder";
import { CalledNumbersDisplay } from "@/components/app/active-game/called-numbers-display";
import MyGameCards from "@/components/app/active-game/my-game-cards";
import { ParticleBackground } from "@/components/app/active-game/particle-background";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import { useAuthStore } from "@/store/auth-store";
import { useGameStore } from "@/store/game-store";
import { useTenantStore } from "@/store/tenant-store";
import { SPACING_SM } from "@/theme/globals";
import { GameSyncStateEntity } from "@/types/api/game/game.type";
import { useFocusEffect } from "expo-router";
import { Plus, Send } from "lucide-react-native";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

const PRIMARY_COLOR = "#7f13ec";
const BACKGROUND_COLOR = "#191022";

export default function PlayBingoScreen() {
  const activeGame = useGameStore((state) => state.activeGame);
  const status = useGameStore((state) => state.status);
  return (
    <View style={styles.container}>
      <ParticleBackground />

      {status == "connecting" && (
        <ActivityIndicator
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        />
      )}

      {status == "error" && (
        <View>
          <Text>Error</Text>
        </View>
      )}

      {status == "connected" && (
        <>
          <BingoHeader />
          <CalledNumbersDisplay
            calledNumbers={activeGame?.calledNumbers || []}
            lastCalledNumber={activeGame?.lastNumberCalled}
          />

          <MyGameCards />

          {/* FABs */}
          <Button
            icon={Send}
            size="icon"
            style={[styles.fab, styles.fabLeft]}
          />

          <Button
            size="icon"
            style={[styles.fab, styles.fabRight, styles.neonGlow]}
          >
            <Icon name={Plus} color="white" size={40} />
          </Button>
        </>
      )}
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
