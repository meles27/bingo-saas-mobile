import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { urls } from "@/config/urls";
import { useApiResponseToast } from "@/hooks/base/api/use-api-response-toast";
import { useMutation } from "@/hooks/base/api/useMutation";
import { useAuthStore } from "@/store/auth-store";
import { useGameStore } from "@/store/game-store";
import { SPACING_SM, SPACING_XS } from "@/theme/globals";
import { GameCardStatus } from "@/types/api/game/game-card.type";
import { Loader2 } from "lucide-react-native";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CardCell } from "./card-cell";

const PRIMARY_COLOR = "#7f13ec";

type CallbackProps = "register" | "bingo" | "disqualify";

interface BingoCardProps {
  id: string;
  serial: number;
  layout: number[];
  isInteractive?: boolean; // Controls if cells can be daubed
  isOwned?: boolean; // Optional visual highlight
  cardStatus?: GameCardStatus;
  callback?: (actionType: CallbackProps) => void;
}

export const BingoCard = React.memo(
  ({
    id,
    serial,
    layout,
    isOwned = false,
    cardStatus,
    isInteractive = true,
    callback,
  }: BingoCardProps) => {
    const activeGame = useGameStore((state) => state.activeGame);
    const user = useAuthStore((state) => state.user);

    /**
     * say bingo
     */
    const bingoMutation = useMutation<object, { templateId: string }>(
      urls.getGameWinnersUrl(activeGame?.id || ""),
      "POST",
      {}
    );

    const registerMutation = useMutation<object, { templateId: string }>(
      urls.getGameCardsUrl(activeGame?.id || ""),
      "POST",
      {}
    );

    useApiResponseToast({
      isLoading: bingoMutation.isLoading,
      isError: bingoMutation.isError,
      error: bingoMutation.error,
      isSuccess: bingoMutation.isSuccess,
    });

    useApiResponseToast({
      isLoading: registerMutation.isLoading,
      isError: registerMutation.isError,
      error: registerMutation.error,
      isSuccess: registerMutation.isSuccess,
    });

    useEffect(() => {
      if (bingoMutation.isSuccess) {
        callback?.("bingo");
      }
    }, [bingoMutation.isSuccess]);

    useEffect(() => {
      if (registerMutation.isSuccess) {
        callback?.("register");
      }
    }, [registerMutation.isSuccess]);

    const isPlaying =
      activeGame?.status == "in_progress" &&
      isInteractive &&
      cardStatus != "disqualified" &&
      isOwned;

    const isRegisterable = activeGame?.status == "waiting";

    const handleRegisteration = (info: {
      userId: string;
      templateId: string;
    }) => {
      registerMutation.execute(info);
    };

    return (
      <View style={[styles.cardContainer]}>
        <View style={styles.content}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Card #{serial}</Text>
            {isPlaying && (
              <Button
                disabled={bingoMutation.isLoading}
                onPress={() =>
                  bingoMutation.execute({
                    templateId: id,
                  })
                }
                size="sm"
                variant="outline"
                loading={bingoMutation.isLoading}
                style={{
                  height: 28,
                  backgroundColor: "orange",
                  paddingHorizontal: SPACING_SM,
                }}
              >
                Bingo
              </Button>
            )}

            {isRegisterable && (
              <Button
                disabled={registerMutation.isLoading || isOwned}
                onPress={() =>
                  handleRegisteration({
                    userId: user?.id || "",
                    templateId: id,
                  })
                }
                size="sm"
                // variant="outline"

                loading={registerMutation.isLoading}
                style={[
                  {
                    height: 28,
                    backgroundColor: "blue",
                    paddingHorizontal: SPACING_SM,
                  },
                  {
                    backgroundColor: isOwned ? "green" : undefined,
                  },
                ]}
              >
                {registerMutation.isLoading && (
                  <Loader2 className="animate-spin mr-2" />
                )}
                {isOwned ? "Registered" : "Register"}
              </Button>
            )}

            {cardStatus == "disqualified" && (
              <TouchableOpacity disabled>
                <Badge>Disqualified</Badge>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.grid}>
            {/* Bingo letters */}
            <View style={styles.row}>
              {["B", "I", "N", "G", "O"].map((letter) => (
                <Text key={letter} style={styles.headerCell}>
                  {letter}
                </Text>
              ))}
            </View>

            {/* Number cells */}
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {layout
                  .slice(rowIndex * 5, rowIndex * 5 + 5)
                  .map((num, colIndex) => (
                    <CardCell
                      key={colIndex}
                      num={num}
                      isInteractive={isInteractive}
                    />
                  ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
    margin: 4,
  },

  content: { padding: 8 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "Space Grotesk",
  },
  grid: {
    flexDirection: "column",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING_XS,
  },
  headerCell: {
    width: "20%", // exactly 5 columns
    textAlign: "center",
    color: PRIMARY_COLOR,
    fontWeight: "700",
    fontFamily: "Space Grotesk",
    marginBottom: 4,
  },
});
