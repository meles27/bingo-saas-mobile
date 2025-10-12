import MyWallet from "@/components/app/wallet/my-wallet";
import { TransactionItem } from "@/components/app/wallet/transaction-item";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { ToggleGroupSingle } from "@/components/ui/toggle";
import { View } from "@/components/ui/view";
import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import { SPACING_LG, SPACING_MD, SPACING_SM } from "@/theme/globals";
import { TransactionListEntity } from "@/types/api/base/transaction.type";
import { Filter } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { PaginatedResponse } from "../types/api/base/index";

export default function WalletScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filterItems = [
    { value: "All", label: "All" },
    { value: "Deposits", label: "Deposits" }, // Credits
    { value: "Withdrawals", label: "Withdrawals" }, // Debits
  ];

  // --- Data Fetching ---
  const transactionsQuery = useQuery<PaginatedResponse<TransactionListEntity>>(
    urls.getTransactionsUrl()
  );

  // --- Client-Side Filtering Logic ---
  const filteredTransactions = useMemo(() => {
    if (!transactionsQuery.data?.results) return [];
    switch (activeFilter) {
      case "Deposits":
        return transactionsQuery.data?.results.filter(
          (t) => parseFloat(t.amount) > 0
        );
      case "Withdrawals":
        return transactionsQuery.data?.results.filter(
          (t) => parseFloat(t.amount) < 0
        );
      case "All":
      default:
        return transactionsQuery.data?.results;
    }
  }, [activeFilter, transactionsQuery.data]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <MyWallet />

      {/* --- Transactions Section --- */}
      <View style={styles.transactionsContainer}>
        <View style={styles.transactionsHeader}>
          <Text variant="title">Recent Transactions</Text>
          <Button variant="ghost" size="sm">
            <View style={styles.filterButtonContent}>
              <Text>Filter</Text>
              <Icon name={Filter} size={16} />
            </View>
          </Button>
        </View>

        <View style={styles.transactionFilters}>
          <ToggleGroupSingle
            items={filterItems}
            value={activeFilter}
            onValueChange={(value) => value && setActiveFilter(value)}
          />
        </View>

        {/* Transaction List States */}
        {transactionsQuery.isLoading && <ActivityIndicator />}

        {transactionsQuery.isError && (
          <Text style={styles.errorText}>
            {transactionsQuery.error.data?.detail ||
              "Could not load transactions."}
          </Text>
        )}

        {transactionsQuery.isSuccess && (
          <View style={styles.transactionList}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item) => (
                <TransactionItem key={item.id} transaction={item} />
              ))
            ) : (
              <Text style={styles.emptyText}>No transactions found.</Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: SPACING_LG,
    gap: 32, // Consistent gap between wallet and transactions
  },
  transactionsContainer: {
    paddingHorizontal: SPACING_MD,
  },
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
  transactionFilters: {
    marginBottom: SPACING_MD,
    alignItems: "flex-start",
  },
  transactionList: {
    gap: SPACING_SM,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginVertical: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#a1a1aa",
    marginVertical: 20,
  },
});
