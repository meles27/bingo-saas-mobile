// import { RoundResultsSheetContent } from "@/components/app/game/round-results-sheet";
// import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
// import { Button } from "@/components/ui/button";
// import { Icon } from "@/components/ui/icon";
// import { Image } from "@/components/ui/image";
// import { ScrollView } from "@/components/ui/scroll-view";
// import { Text } from "@/components/ui/text";
// import { View } from "@/components/ui/view";
// import { useThemeColor } from "@/hooks/useThemeColor";
// import {
//   BORDER_RADIUS,
//   SPACING_LG,
//   SPACING_MD,
//   SPACING_SM,
// } from "@/theme/globals";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { ArrowLeft } from "lucide-react-native";
// import React from "react";
// import { StyleSheet } from "react-native";

// // --- Mock Data & Helper Components (unchanged) ---
// const gameDetails = {
//   status: "Live",
//   totalRounds: "5",
//   totalPrize: "5000 Coins",
//   entryFee: "100 Coins",
//   startedAt: "2024-07-21 10:00 AM",
// };
// const rounds = [
//   {
//     title: "Round 1: Four Corners",
//     status: "In Progress",
//     prize: "1000 Coins",
//     cardSize: "5x5",
//     pattern: "Four Corners",
//     startedAt: "10:05 AM",
//   },
//   {
//     title: "Round 2: Straight Line",
//     status: "Upcoming",
//     prize: "1000 Coins",
//     cardSize: "5x5",
//     pattern: "Straight Line",
//   },
//   {
//     title: "Round 3: Full House",
//     status: "Upcoming",
//     prize: "3000 Coins",
//     cardSize: "5x5",
//     pattern: "Full House",
//   },
// ];
// const DetailRow = ({
//   label,
//   value,
//   status,
// }: {
//   label: string;
//   value: string;
//   status?: string;
// }) => {
//   const borderColor = useThemeColor(
//     { light: "#f27f0d33", dark: "#f27f0d4d" },
//     "border"
//   );
//   const greenColor = useThemeColor({}, "green");
//   return (
//     <View style={[styles.detailRow, { borderBottomColor: borderColor }]}>
//       <Text style={styles.detailLabel}>{label}</Text>
//       <Text
//         style={[styles.detailValue, status === "Live" && { color: greenColor }]}
//       >
//         {value}
//       </Text>
//     </View>
//   );
// };
// const RoundCard = ({ round }: { round: (typeof rounds)[0] }) => {
//   const primaryColor = useThemeColor({}, "primary");
//   const cardBackgroundColor = useThemeColor(
//     { light: "#f27f0d0D", dark: "#f27f0d1A" },
//     "card"
//   );
//   const borderColor = useThemeColor(
//     { light: "#f27f0d33", dark: "#f27f0d4d" },
//     "border"
//   );
//   const greenColor = useThemeColor({}, "green");
//   const getStatusColor = () =>
//     round.status === "In Progress"
//       ? greenColor
//       : useThemeColor({}, "textMuted");
//   return (
//     <View style={[styles.roundCard, { backgroundColor: cardBackgroundColor }]}>
//       <View style={styles.roundCardHeader}>
//         <Text style={styles.roundCardTitle}>{round.title}</Text>
//         <Text style={[styles.roundCardStatus, { color: getStatusColor() }]}>
//           {round.status}
//         </Text>
//       </View>
//       <View style={[styles.roundCardBody, { borderTopColor: borderColor }]}>
//         <DetailRow label="Prize" value={round.prize} />
//         <DetailRow label="Card Size" value={round.cardSize} />
//         <DetailRow label="Pattern" value={round.pattern} />
//         {round.startedAt && (
//           <DetailRow label="Started At" value={round.startedAt} />
//         )}
//       </View>
//     </View>
//   );
// };

// // --- Main Screen Component ---
// export default function GameDetailScreen() {
//   const router = useRouter();
//   const { isVisible, open, close } = useBottomSheet();
//   const backgroundColor = useThemeColor({}, "background");

//   return (
//     <View
//       style={[styles.flex1, { backgroundColor, paddingVertical: SPACING_MD }]}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* --- CORRECTED IMAGE BANNER --- */}
//         <View style={styles.bannerWrapper}>
//           <View style={styles.bannerContainer}>
//             <Image
//               source={{
//                 uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgMDpuouTK9vM8Oe4X8NdGO3M3zc7SwQRyz-dOwIqxiTbERwqUfMzEWsa8rNSl41ro5smLjkG4yxC8wCzEim5ygm_mYXYb6e-isb10yIs5CB2bPGdKf5bK3OcTFRkqxR-zi-4xtKvCFniGQMvUFnrlRLuK-hTw9FOr9Opy2gSQD5fHo5oDMhPt-1DhveoBX0aLv1T3VHjYQx_RRqBZ7tSu1Wc2Vh8lIfU1woHhALCihoXqgJgCmkwAi8oLCIRS5zlQLQ6CBBAvHWFr",
//               }}
//               style={styles.bannerImage}
//               contentFit="cover"
//             />
//             <LinearGradient
//               colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
//               style={styles.bannerGradient}
//             >
//               <View style={styles.bannerTextContainer}>
//                 <Text style={styles.bannerTitle}>Bingo Bash</Text>
//                 <Text style={styles.bannerSubtitle}>
//                   Get ready for a thrilling bingo adventure! Be the first to
//                   shout BINGO and win amazing prizes.
//                 </Text>
//               </View>
//             </LinearGradient>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text variant="title">Game Details</Text>
//           <View style={styles.detailsContainer}>
//             <DetailRow
//               label="Status"
//               value={gameDetails.status}
//               status={gameDetails.status}
//             />
//             <DetailRow label="Total Rounds" value={gameDetails.totalRounds} />
//             <DetailRow label="Total Prize" value={gameDetails.totalPrize} />
//             <DetailRow label="Entry Fee" value={gameDetails.entryFee} />
//             <DetailRow label="Started At" value={gameDetails.startedAt} />
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text variant="title">Rounds</Text>
//           <View style={styles.roundsContainer}>
//             {rounds.map((round, index) => (
//               <RoundCard key={index} round={round} />
//             ))}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Button variant="outline" onPress={open}>
//             View Last Round Results
//           </Button>
//         </View>
//       </ScrollView>

//       <View
//         style={[styles.footer, { backgroundColor: `${backgroundColor}CC` }]}
//       >
//         <Button size="lg" style={styles.footerButton}>
//           Play Now
//         </Button>
//         <Button size="lg" variant="secondary" style={styles.footerButton}>
//           Invite Friends
//         </Button>
//       </View>

//       <BottomSheet isVisible={isVisible} onClose={close} snapPoints={[0.9]}>
//         <RoundResultsSheetContent onClose={close} />
//       </BottomSheet>
//     </View>
//   );
// }

// // --- Styles ---
// const styles = StyleSheet.create({
//   flex1: { flex: 1 },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: SPACING_SM,
//     height: 60,
//   },
//   headerTitle: { flex: 1, textAlign: "center" },
//   headerSpacer: { width: 40 },
//   scrollContent: { paddingBottom: 150 },
//   bannerWrapper: { paddingHorizontal: SPACING_MD },
//   bannerContainer: {
//     minHeight: 220,
//     borderRadius: BORDER_RADIUS,
//     overflow: "hidden", // This is crucial for clipping children
//     position: "relative", // Needed for absolute positioning of children
//   },
//   bannerImage: {
//     ...StyleSheet.absoluteFillObject, // Make image fill the container
//     width: "100%",
//     height: "100%",
//   },
//   bannerGradient: {
//     ...StyleSheet.absoluteFillObject, // Make gradient fill the container
//     justifyContent: "flex-end",
//     padding: SPACING_MD,
//   },
//   bannerTextContainer: { gap: SPACING_SM / 2 },
//   bannerTitle: { color: "white", fontSize: 28, fontWeight: "bold" },
//   bannerSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 14 },
//   section: { paddingHorizontal: SPACING_MD, marginTop: SPACING_LG },
//   detailsContainer: { marginTop: SPACING_MD, borderTopWidth: 1 },
//   detailRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: SPACING_MD,
//     borderBottomWidth: 1,
//   },
//   detailLabel: { color: "#a1a1aa" },
//   detailValue: { fontWeight: "600" },
//   roundsContainer: { marginTop: SPACING_MD, gap: SPACING_MD },
//   roundCard: { padding: SPACING_MD, borderRadius: SPACING_SM },
//   roundCardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   roundCardTitle: { fontWeight: "bold", fontSize: 16 },
//   roundCardStatus: { fontSize: 14, fontWeight: "600" },
//   roundCardBody: {
//     marginTop: SPACING_SM,
//     borderTopWidth: 1,
//     paddingTop: SPACING_SM,
//     gap: SPACING_SM,
//   },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: SPACING_MD,
//     gap: SPACING_SM,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(242, 127, 13, 0.2)",
//   },
//   footerButton: { width: "100%" },
// });

import { RoundResultsSheetContent } from "@/components/app/game/round-results-sheet";
import { InviteSheetContent } from "@/components/app/invite-friends-sheet";
import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  BORDER_RADIUS,
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
} from "@/theme/globals";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

// --- Mock Data & Helper Components (unchanged) ---
const gameDetails = {
  status: "Live",
  totalRounds: "5",
  totalPrize: "5000 Coins",
  entryFee: "100 Coins",
  startedAt: "2024-07-21 10:00 AM",
};
const rounds = [
  {
    title: "Round 1: Four Corners",
    status: "In Progress",
    prize: "1000 Coins",
    cardSize: "5x5",
    pattern: "Four Corners",
    startedAt: "10:05 AM",
  },
  {
    title: "Round 2: Straight Line",
    status: "Upcoming",
    prize: "1000 Coins",
    cardSize: "5x5",
    pattern: "Straight Line",
  },
  {
    title: "Round 3: Full House",
    status: "Upcoming",
    prize: "3000 Coins",
    cardSize: "5x5",
    pattern: "Full House",
  },
];
const DetailRow = ({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status?: string;
}) => {
  const borderColor = useThemeColor(
    { light: "#f27f0d33", dark: "#f27f0d4d" },
    "border"
  );
  const greenColor = useThemeColor({}, "green");
  return (
    <View style={[styles.detailRow, { borderBottomColor: borderColor }]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text
        style={[styles.detailValue, status === "Live" && { color: greenColor }]}
      >
        {value}
      </Text>
    </View>
  );
};
const RoundCard = ({ round }: { round: (typeof rounds)[0] }) => {
  const cardBackgroundColor = useThemeColor(
    { light: "#f27f0d0D", dark: "#f27f0d1A" },
    "card"
  );
  const borderColor = useThemeColor(
    { light: "#f27f0d33", dark: "#f27f0d4d" },
    "border"
  );
  const greenColor = useThemeColor({}, "green");
  const getStatusColor = () =>
    round.status === "In Progress"
      ? greenColor
      : useThemeColor({}, "textMuted");
  return (
    <View style={[styles.roundCard, { backgroundColor: cardBackgroundColor }]}>
      <View style={styles.roundCardHeader}>
        <Text style={styles.roundCardTitle}>{round.title}</Text>
        <Text style={[styles.roundCardStatus, { color: getStatusColor() }]}>
          {round.status}
        </Text>
      </View>
      <View style={[styles.roundCardBody, { borderTopColor: borderColor }]}>
        <DetailRow label="Prize" value={round.prize} />
        <DetailRow label="Card Size" value={round.cardSize} />
        <DetailRow label="Pattern" value={round.pattern} />
        {round.startedAt && (
          <DetailRow label="Started At" value={round.startedAt} />
        )}
      </View>
    </View>
  );
};

// --- Main Screen Component ---
export default function GameDetailScreen() {
  const router = useRouter();
  const {
    isVisible: isResultsVisible,
    open: openResults,
    close: closeResults,
  } = useBottomSheet();
  // 2. Add state for the new invite sheet
  const {
    isVisible: isInviteVisible,
    open: openInvite,
    close: closeInvite,
  } = useBottomSheet();
  const backgroundColor = useThemeColor({}, "background");

  return (
    <View
      style={[styles.flex1, { backgroundColor, paddingVertical: SPACING_MD }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bannerWrapper}>
          <View style={styles.bannerContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/800/400?u=gamebanner" }}
              style={styles.bannerImage}
              contentFit="cover"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
              style={styles.bannerGradient}
            >
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>Bingo Bash</Text>
                <Text style={styles.bannerSubtitle}>
                  Get ready for a thrilling bingo adventure! Be the first to
                  shout BINGO and win amazing prizes.
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
        <View style={styles.section}>
          <Text variant="title">Game Details</Text>
          <View style={styles.detailsContainer}>
            <DetailRow
              label="Status"
              value={gameDetails.status}
              status={gameDetails.status}
            />
            <DetailRow label="Total Rounds" value={gameDetails.totalRounds} />
            <DetailRow label="Total Prize" value={gameDetails.totalPrize} />
            <DetailRow label="Entry Fee" value={gameDetails.entryFee} />
            <DetailRow label="Started At" value={gameDetails.startedAt} />
          </View>
        </View>
        <View style={styles.section}>
          <Text variant="title">Rounds</Text>
          <View style={styles.roundsContainer}>
            {rounds.map((round, index) => (
              <RoundCard key={index} round={round} />
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Button variant="outline" onPress={openResults}>
            View Last Round Results
          </Button>
        </View>
      </ScrollView>

      <View
        style={[styles.footer, { backgroundColor: `${backgroundColor}CC` }]}
      >
        <Button
          onPress={() => router.push("/bingo-game")}
          size="lg"
          style={styles.footerButton}
        >
          Play Now
        </Button>
        {/* 3. Wire up the "Invite Friends" button to open the sheet */}
        <Button
          size="lg"
          variant="secondary"
          style={styles.footerButton}
          onPress={openInvite}
        >
          Invite Friends
        </Button>
      </View>

      <BottomSheet
        isVisible={isResultsVisible}
        onClose={closeResults}
        snapPoints={[0.9]}
      >
        <RoundResultsSheetContent onClose={closeResults} />
      </BottomSheet>

      {/* 4. Add the new BottomSheet for inviting friends */}
      <BottomSheet
        isVisible={isInviteVisible}
        onClose={closeInvite}
        snapPoints={[0.85]}
      >
        <InviteSheetContent onClose={closeInvite} />
      </BottomSheet>
    </View>
  );
}

// --- Styles (unchanged) ---
const styles = StyleSheet.create({
  flex1: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING_SM,
    height: 60,
  },
  headerTitle: { flex: 1, textAlign: "center" },
  headerSpacer: { width: 40 },
  scrollContent: { paddingBottom: 150 },
  bannerWrapper: { paddingHorizontal: SPACING_MD },
  bannerContainer: {
    minHeight: 220,
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
    position: "relative",
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  bannerGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: SPACING_MD,
  },
  bannerTextContainer: { gap: SPACING_SM / 2 },
  bannerTitle: { color: "white", fontSize: 28, fontWeight: "bold" },
  bannerSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 14 },
  section: { paddingHorizontal: SPACING_MD, marginTop: SPACING_LG },
  detailsContainer: { marginTop: SPACING_MD, borderTopWidth: 1 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING_MD,
    borderBottomWidth: 1,
  },
  detailLabel: { color: "#a1a1aa" },
  detailValue: { fontWeight: "600" },
  roundsContainer: { marginTop: SPACING_MD, gap: SPACING_MD },
  roundCard: { padding: SPACING_MD, borderRadius: SPACING_SM },
  roundCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roundCardTitle: { fontWeight: "bold", fontSize: 16 },
  roundCardStatus: { fontSize: 14, fontWeight: "600" },
  roundCardBody: {
    marginTop: SPACING_SM,
    borderTopWidth: 1,
    paddingTop: SPACING_SM,
    gap: SPACING_SM,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING_MD,
    gap: SPACING_SM,
    borderTopWidth: 1,
    borderTopColor: "rgba(242, 127, 13, 0.2)",
  },
  footerButton: { width: "100%" },
});
