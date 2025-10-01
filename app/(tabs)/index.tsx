import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollView } from "@/components/ui/scroll-view";
import { View } from "@/components/ui/view";
import { urls } from "@/config/urls";
import { useApiResponseToast } from "@/hooks/base/api/use-api-response-toast";
import { useMutation } from "@/hooks/base/api/useMutation";
import { useQuery } from "@/hooks/base/api/useQuery";
import { useFocusEffect } from "expo-router";
import { Calendar, Coins, Repeat } from "lucide-react-native";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

export type Game = {
  id: string;
  name: string;
  description?: string;
  status: string;
  entryFee: number;
  currency: string;
  totalRounds: number;
  startedAt: string;
};

type GameListProps = {
  data: Game[];
};

export const GameList: React.FC<GameListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{item.name}</Text>
            <Badge variant="default">{item.status.toLowerCase()}</Badge>
          </View>

          {item.description ? (
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Coins size={18} color="#2563eb" />
              <Text style={styles.infoText}>
                {item.entryFee} {item.currency}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Repeat size={18} color="#16a34a" />
              <Text style={styles.infoText}>{item.totalRounds} rounds</Text>
            </View>
          </View>

          <View style={styles.dateRow}>
            <Calendar size={18} color="#ca8a04" />
            <Text style={styles.dateText}>
              {new Date(item.startedAt).toLocaleDateString()}
            </Text>
          </View>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 14,
    borderRadius: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 6,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: "#6b7280",
  },
});

const Index = () => {
  const mockData: Game[] = [
    {
      id: "1",
      name: "Friday Night Mega Prize",
      description:
        "Join the excitement for a chance to take home mega prizes every Friday night!",
      status: "scheduled",
      entryFee: 500,
      currency: "ETB",
      totalRounds: 6,
      startedAt: "2025-08-27T19:00:00Z",
    },
    {
      id: "2",
      name: "Weekend Jackpot Challenge",
      description:
        "Play and win amazing rewards every weekend — where fun meets fortune!",
      status: "running",
      entryFee: 200,
      currency: "ETB",
      totalRounds: 5,
      startedAt: "2025-09-01T18:30:00Z",
    },
    {
      id: "3",
      name: "Monday Madness Bingo",
      description:
        "Start your week with a thrilling bingo experience packed with surprises!",
      status: "completed",
      entryFee: 300,
      currency: "ETB",
      totalRounds: 4,
      startedAt: "2025-09-02T18:00:00Z",
    },
    {
      id: "4",
      name: "Tuesday Treasure Hunt",
      description:
        "Find hidden rewards and uncover treasure with every round played!",
      status: "scheduled",
      entryFee: 250,
      currency: "ETB",
      totalRounds: 3,
      startedAt: "2025-09-03T18:00:00Z",
    },
    {
      id: "5",
      name: "Wednesday Wild Win",
      description:
        "Midweek fun — enjoy fast-paced rounds and win instant prizes!",
      status: "running",
      entryFee: 400,
      currency: "ETB",
      totalRounds: 7,
      startedAt: "2025-09-04T19:30:00Z",
    },
    {
      id: "6",
      name: "Sunday Super Jackpot",
      description:
        "End your week with mega rewards — a grand jackpot awaits every Sunday!",
      status: "completed",
      entryFee: 1000,
      currency: "ETB",
      totalRounds: 10,
      startedAt: "2025-09-07T20:00:00Z",
    },
  ];

  const tenantsQuery = useQuery(urls.getTenantsUrl(), {
    apiScope: "global",
  });

  const tenantMutation = useMutation(urls.getTenantsUrl(), "POST", {
    apiScope: "global",
  });

  useApiResponseToast({
    isLoading: tenantMutation.isLoading,
    isError: tenantMutation.isError,
    isSuccess: tenantMutation.isSuccess,
    error: tenantMutation.error,
    data: tenantMutation.data,
  });

  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("Screen is focused");
      tenantsQuery.refetch();
      return () => console.log("Screen is unfocused");
    }, [])
  );

  return (
    <ScrollView>
      {/* <Card>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <CardHeader>
            <CardTitle>List of Tenants</CardTitle>
            <CardDescription>this is a list of tenants</CardDescription>
          </CardHeader>

          <View style={{ flex: 1, overflow: "scroll" }}>
            {tenantsQuery.isLoading && <ActivityIndicator />}

            {tenantsQuery.isError && (
              <Text>{JSON.stringify(tenantsQuery.error)}</Text>
            )}

            {tenantsQuery.isSuccess && (
              <Text>{JSON.stringify(tenantsQuery.data, null, 4)}</Text>
            )}
          </View>

          <Button
            style={{
              width: null,
              backgroundColor: Colors.dark.blue,
            }}
            variant="default"
            onPress={() => tenantsQuery.refetch()}
          >
            Refresh
          </Button>

          <Button onPress={() => tenantMutation.execute()}>
            create tenant
          </Button>
        </CardContent>
      </Card> */}
      <GameList data={mockData} />
    </ScrollView>
  );
};

export default Index;
