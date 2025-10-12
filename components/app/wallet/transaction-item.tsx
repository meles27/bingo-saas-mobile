import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { SPACING_MD, SPACING_SM } from "@/theme/globals";
import { TransactionListEntity } from "@/types/api/base/transaction.type"; // Assuming this is the correct path
import { formatDateTime } from "@/utils/format-datetime";
import { formatPrice } from "@/utils/format-price";
import {
  ArrowDown,
  ArrowUp,
  Gift,
  LucideIcon,
  Ticket,
} from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";

// Helper to translate API data into specific UI props
const getTransactionDetails = (
  transaction: TransactionListEntity
): {
  icon: LucideIcon;
  label: string;
  description: string;
  isCredit: boolean;
} => {
  const amount = parseFloat(transaction.amount);
  const isCredit = amount > 0;
  let icon: LucideIcon = isCredit ? ArrowDown : ArrowUp;
  let label = transaction.reason || "Transaction";

  // Customize based on reason/gateway if needed
  if (transaction.reason?.toLowerCase().includes("win")) {
    icon = Gift;
  }
  if (transaction.reason?.toLowerCase().includes("fee")) {
    icon = Ticket;
  }

  return {
    icon,
    label,
    description: transaction.gateway || transaction.notes || "",
    isCredit,
  };
};

interface TransactionItemProps {
  transaction: TransactionListEntity;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { icon, label, description, isCredit } =
    getTransactionDetails(transaction);

  const amountColor = isCredit ? "#10b981" : "#f43f5e"; // Success Green vs. Error Red

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftSection}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: `${amountColor}20` }, // Faded background color
          ]}
        >
          <Icon name={icon} color={amountColor} size={24} />
        </View>
        <View>
          <Text style={styles.transactionLabel}>{label}</Text>
          <Text style={styles.transactionDesc}>{description}</Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={[styles.transactionAmount, { color: amountColor }]}>
          {formatPrice(transaction.amount, transaction.currency)}
        </Text>

        <Text style={styles.transactionDesc}>
          {formatDateTime(transaction.createdAt, {})}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING_SM,
    backgroundColor: "#27272a20", // Neutral background color
    borderRadius: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING_MD,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  transactionLabel: { fontWeight: "600", fontSize: 16 },
  transactionDesc: { fontSize: 14, color: "#a1a1aa" },
  transactionAmount: { fontWeight: "700", fontSize: 16 },
});
