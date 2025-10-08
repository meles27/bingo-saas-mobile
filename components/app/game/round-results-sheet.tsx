import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  BORDER_RADIUS,
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
  SPACING_XL,
} from "@/theme/globals";
import { ArrowRight, Trophy, X } from "lucide-react-native";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

// --- Mock Data ---
const leaderboard = [
  {
    rank: 1,
    name: "Ethan",
    points: "+200 pts",
    avatar: "https://i.pravatar.cc/150?u=ethan",
    isUser: false,
  },
  {
    rank: 2,
    name: "Amelia (You)",
    points: "+150 pts",
    avatar: "https://i.pravatar.cc/150?u=amelia",
    isUser: true,
  },
  {
    rank: 3,
    name: "Noah",
    points: "+100 pts",
    avatar: "https://i.pravatar.cc/150?u=noah",
    isUser: false,
  },
];

// --- Helper Components ---
const ConfettiPiece = ({
  delay,
  color,
  left,
}: {
  delay: number;
  color: string;
  left: string;
}) => {
  const sheetHeight = Dimensions.get("window").height * 0.85; // Approximate sheet height
  const translateY = useSharedValue(-50);
  const rotateZ = useSharedValue(0);

  useEffect(() => {
    const animationDuration = 3000 + Math.random() * 1000;
    translateY.value = withRepeat(
      withTiming(sheetHeight + 50, {
        duration: animationDuration,
        easing: Easing.linear,
      }),
      -1,
      false,
      (isFinished) => {
        if (isFinished) {
          translateY.value = -50; // Reset position when animation finishes
        }
      }
    );
    rotateZ.value = withRepeat(
      withTiming(360, { duration: animationDuration, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
    opacity: translateY.value > sheetHeight - 50 ? 0 : 1,
  }));

  return (
    <Animated.View
      style={[
        styles.confettiPiece,
        { left: left as any as number, backgroundColor: color },
        animatedStyle,
      ]}
    />
  );
};

const ConfettiBackground = () => {
  const primaryColor = useThemeColor({}, "primary");
  const goldColor = "#ffd700";
  const pieces = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 3,
    color: i % 2 === 0 ? primaryColor : goldColor,
    left: `${Math.random() * 100}%`,
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {pieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          delay={piece.delay}
          color={piece.color}
          left={piece.left}
        />
      ))}
    </View>
  );
};

const LeaderboardItem = ({ item }: { item: (typeof leaderboard)[0] }) => {
  const primaryColor = useThemeColor({}, "primary");
  const cardColor = useThemeColor({}, "card");
  const primaryLight = useThemeColor(
    { light: "#f27f0d33", dark: "#f27f0d33" },
    "primary"
  );

  if (item.isUser) {
    return (
      <View
        style={[
          styles.leaderboardItem,
          {
            backgroundColor: primaryLight,
            borderWidth: 1,
            borderColor: primaryColor,
          },
        ]}
      >
        <Avatar size={48} style={{ borderWidth: 2, borderColor: primaryColor }}>
          <AvatarImage source={{ uri: item.avatar }} />
        </Avatar>
        <View style={styles.leaderboardInfo}>
          <Text style={styles.leaderboardName}>{item.name}</Text>
          <Text style={[styles.leaderboardRank, { color: primaryColor }]}>
            {item.rank === 1 ? "1st" : "2nd"} Place
          </Text>
        </View>
        <Text style={[styles.leaderboardPoints, { color: primaryColor }]}>
          {item.points}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.leaderboardItem, { backgroundColor: cardColor }]}>
      <Avatar size={48}>
        <AvatarImage source={{ uri: item.avatar }} />
      </Avatar>
      <View style={styles.leaderboardInfo}>
        <Text style={styles.leaderboardName}>{item.name}</Text>
        <Text style={styles.leaderboardRank}>
          {item.rank === 1 ? "1st" : "3rd"} Place
        </Text>
      </View>
      <Text style={[styles.leaderboardPoints, { color: primaryColor }]}>
        {item.points}
      </Text>
    </View>
  );
};

// --- Main Sheet Content Component ---
export function RoundResultsSheetContent({ onClose }: { onClose: () => void }) {
  const primaryColor = useThemeColor({}, "primary");
  const primaryLight = useThemeColor(
    { light: "#f27f0d33", dark: "#f27f0d33" },
    "primary"
  );
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor({}, "textMuted");

  return (
    <View style={styles.sheetContainer}>
      <ConfettiBackground />
      {/* Header */}
      <View style={styles.header}>
        <Text variant="title" style={styles.headerTitle}>
          Bingo Round Results
        </Text>
        <Button size="icon" variant="secondary" onPress={onClose}>
          <Icon name={X} />
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Congratulations Message */}
        <View style={styles.congratsContainer}>
          <Text style={[styles.congratsTitle, { color: textColor }]}>
            Congratulations, Amelia!
          </Text>
          <Text style={{ color: mutedColor }}>
            You placed{" "}
            <Text style={[styles.highlightText, { color: primaryColor }]}>
              2nd
            </Text>{" "}
            and earned{" "}
            <Text style={[styles.highlightText, { color: primaryColor }]}>
              150 points
            </Text>
            .
          </Text>
        </View>

        {/* Total Points Card */}
        <View style={[styles.pointsCard, { backgroundColor: primaryLight }]}>
          <View>
            <Text style={{ color: mutedColor }}>Total Points</Text>
            <Text style={[styles.pointsValue, { color: textColor }]}>
              2,350
            </Text>
          </View>
          <View style={[styles.trophyIcon, { backgroundColor: primaryColor }]}>
            <Icon name={Trophy} size={32} color="white" />
          </View>
        </View>

        {/* Leaderboard */}
        <Text variant="title" style={styles.sectionTitle}>
          Round Leaderboard
        </Text>
        <View style={styles.leaderboardContainer}>
          {leaderboard.map((item) => (
            <LeaderboardItem key={item.rank} item={item} />
          ))}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={[styles.progressLabel, { color: mutedColor }]}>
            Round 3 of 5
          </Text>
          <Progress value={60} height={10} />
        </View>
      </ScrollView>

      {/* Footer Action Button */}
      <View style={styles.footer}>
        <Button size="lg" style={styles.footerButton}>
          <View style={styles.footerButtonContent}>
            <Text style={styles.footerButtonText}>Next Round</Text>
            <Icon name={ArrowRight} color="white" />
          </View>
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
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: { flex: 1, textAlign: "center", marginLeft: 40 },
  scrollContent: { padding: SPACING_MD },
  congratsContainer: { alignItems: "center", paddingVertical: SPACING_LG },
  congratsTitle: { fontSize: 28, fontWeight: "800" },
  highlightText: { fontWeight: "bold" },
  pointsCard: {
    borderRadius: BORDER_RADIUS,
    padding: SPACING_MD,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointsValue: { fontSize: 24, fontWeight: "bold" },
  trophyIcon: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
  },
  sectionTitle: { marginTop: SPACING_XL, marginBottom: SPACING_MD },
  leaderboardContainer: { gap: SPACING_SM },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING_MD,
    padding: SPACING_SM,
    borderRadius: SPACING_SM,
  },
  leaderboardInfo: { flex: 1 },
  leaderboardName: { fontWeight: "bold" },
  leaderboardRank: { fontSize: 14, fontWeight: "500" },
  leaderboardPoints: { fontSize: 18, fontWeight: "bold" },
  progressContainer: { marginTop: SPACING_XL },
  progressLabel: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: SPACING_SM,
  },
  footer: { padding: SPACING_MD },
  footerButton: { width: "100%", height: 56, borderRadius: BORDER_RADIUS },
  footerButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING_SM,
  },
  footerButtonText: { fontSize: 18, fontWeight: "bold", color: "white" },
  confettiPiece: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
