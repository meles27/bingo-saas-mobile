import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import { useThemeColor } from "@/hooks/useThemeColor";
import { UserWalletEntity } from "@/types/api/base/wallet.type";
import { AlertTriangle } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { WalletCard } from "./wallet-card";

const LoadingState = () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" />
    <Text style={{ marginTop: 10 }}>Loading Wallet...</Text>
  </View>
);

const ErrorState = ({ message }: { message: string }) => {
  const destructiveColor = useThemeColor({}, "destructive");
  return (
    <View style={styles.centered}>
      <Icon name={AlertTriangle} color={destructiveColor} size={48} />
      <Text style={styles.errorTitle}>Failed to load wallet</Text>
      <Text style={styles.errorDetail}>{message}</Text>
    </View>
  );
};

const MyWallet = () => {
  const myWalletQuery = useQuery<UserWalletEntity>(urls.getMyWalleteUrl(), {});

  return (
    <View style={styles.container}>
      {myWalletQuery.isLoading && <LoadingState />}

      {myWalletQuery.isError && (
        <ErrorState
          message={
            myWalletQuery.error.data?.detail || "An unknown error occurred."
          }
        />
      )}

      {myWalletQuery.isSuccess && <WalletCard data={myWalletQuery.data} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  errorDetail: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default MyWallet;
