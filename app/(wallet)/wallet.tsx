import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { ToggleGroupSingle } from "@/components/ui/toggle";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  BORDER_RADIUS,
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
  SPACING_XL,
} from "@/theme/globals";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Filter, Gift, Plus, Ticket } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

// --- Mock Data ---
const transactions = [
  {
    id: "1",
    type: "Entry Fee",
    description: "Bingo Blitz",
    amount: -2.0,
    icon: Ticket,
    color: "#FFFFFF",
  },
  {
    id: "2",
    type: "Winnings",
    description: "Bingo Blitz",
    amount: 15.0,
    icon: Plus,
    color: "#f27f0d",
  },
  {
    id: "3",
    type: "Bonus",
    description: "Bingo Blitz",
    amount: 5.0,
    icon: Gift,
    color: "#f27f0d",
  },
];

// --- Helper Components ---
const TransactionItem = ({ item }: { item: (typeof transactions)[0] }) => {
  const primaryColor = useThemeColor({}, "primary");
  const primaryLight = useThemeColor(
    { light: "#f27f0d33", dark: "#f27f0d33" },
    "primary"
  );
  const textColor = useThemeColor({}, "text");
  const mutedColor = useThemeColor({}, "textMuted");

  return (
    <View style={[styles.transactionItem, { backgroundColor: primaryLight }]}>
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.transactionIconWrapper,
            { backgroundColor: primaryLight },
          ]}
        >
          <Icon name={item.icon} color={textColor} size={24} />
        </View>
        <View>
          <Text style={[styles.transactionType, { color: textColor }]}>
            {item.type}
          </Text>
          <Text style={[styles.transactionDesc, { color: mutedColor }]}>
            {item.description}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: item.amount > 0 ? primaryColor : textColor },
        ]}
      >
        {item.amount > 0
          ? `+$${item.amount.toFixed(2)}`
          : `-$${Math.abs(item.amount).toFixed(2)}`}
      </Text>
    </View>
  );
};

// --- Main Screen Component ---
export default function WalletScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");
  const primaryLight = useThemeColor(
    { light: "#f27f0d33", dark: "#f27f0d33" },
    "primary"
  );

  const [activeFilter, setActiveFilter] = useState("All");
  const filterItems = [
    { value: "All", label: "All" },
    { value: "Deposits", label: "Deposits" },
    { value: "Withdrawals", label: "Withdrawals" },
  ];

  return (
    <View style={[styles.flex1, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: primaryLight }]}>
          <Text style={[styles.balanceLabel, { color: primaryColor }]}>
            Total Balance
          </Text>
          <Text style={[styles.balanceAmount, { color: textColor }]}>
            $25.50
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Button style={styles.actionButton}>Deposit</Button>
          <Button variant="secondary" style={styles.actionButton}>
            Withdraw
          </Button>
          <Button variant="secondary" style={styles.actionButton}>
            Buy Credits
          </Button>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionsHeader}>
          <Text variant="title" style={{ color: textColor }}>
            Recent Transactions
          </Text>
          <Button variant="ghost" size="sm">
            <View style={styles.filterButtonContent}>
              <Text style={{ color: primaryColor }}>Filter</Text>
              <Icon name={Filter} color={primaryColor} size={16} />
            </View>
          </Button>
        </View>

        {/* Transaction Filters */}
        <View style={styles.transactionFilters}>
          <ToggleGroupSingle
            items={filterItems}
            value={activeFilter}
            onValueChange={(value) => value && setActiveFilter(value)}
            size="default"
            variant="outline"
          />
        </View>

        {/* Transaction List */}
        <View style={styles.transactionList}>
          {transactions.map((item) => (
            <TransactionItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      {/* Sticky Footer Gradient */}
      <LinearGradient
        colors={[`${backgroundColor}00`, `${backgroundColor}FF`]}
        style={styles.footerGradient}
      />
    </View>
  );
}

// --- Styles ---
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
  scrollContent: { padding: SPACING_MD },
  balanceCard: {
    borderRadius: BORDER_RADIUS,
    padding: SPACING_MD,
    marginBottom: SPACING_LG,
    alignItems: "center",
  },
  balanceLabel: { fontSize: 14, opacity: 0.8 },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: SPACING_SM / 2,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: SPACING_MD,
    marginBottom: SPACING_XL,
  },
  actionButton: { flex: 1, borderRadius: BORDER_RADIUS },
  transactionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING_MD,
  },
  filterButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING_SM,
  },
  transactionFilters: { marginBottom: SPACING_MD, alignItems: "flex-start" },
  transactionList: { gap: SPACING_SM },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: SPACING_SM,
    padding: SPACING_SM,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING_MD,
  },
  transactionIconWrapper: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  transactionType: { fontWeight: "600" },
  transactionDesc: { fontSize: 14 },
  transactionAmount: { fontWeight: "600" },
  footerGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    pointerEvents: "none",
  },
});
