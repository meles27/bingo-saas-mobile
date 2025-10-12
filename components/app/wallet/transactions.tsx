import { JsonViewer } from "@/components/json-viewer";
import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Transactions = () => {
  const transactionsQuery = useQuery<any>(urls.getTransactionsUrl(), {});
  return (
    <>
      {transactionsQuery.isLoading && (
        <ActivityIndicator
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        />
      )}

      {transactionsQuery.isError && (
        <View>
          <Text>Error</Text>
          <Text>{transactionsQuery.error.data?.detail}</Text>
        </View>
      )}

      {transactionsQuery.isSuccess && (
        <JsonViewer data={transactionsQuery.data} />
      )}
    </>
  );
};

export default Transactions;
