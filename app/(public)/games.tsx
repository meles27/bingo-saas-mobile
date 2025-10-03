import AppHeader from "@/components/app-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { urls } from "@/config/urls";
import { useApiResponseToast } from "@/hooks/base/api/use-api-response-toast";
import { useMutation } from "@/hooks/base/api/useMutation";
import { useQuery } from "@/hooks/base/api/useQuery";
import { useActiveManager } from "@/hooks/base/use-active-manager";
import { useCarouselWidth } from "@/hooks/base/use-carousel-width";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFocusEffect } from "expo-router";
import { Bell, Calendar, Coins, Repeat } from "lucide-react-native";
import { default as React, useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export function CarouselCustomWidth() {
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");

  const products = [
    { id: 1, name: "Wireless Headphones", price: "$99.99", rating: "4.8" },
    { id: 2, name: "Smart Watch", price: "$199.99", rating: "4.9" },
    { id: 3, name: "Bluetooth Speaker", price: "$79.99", rating: "4.7" },
    { id: 4, name: "Phone Case", price: "$24.99", rating: "4.6" },
    { id: 5, name: "Wireless Charger", price: "$39.99", rating: "4.8" },
  ];

  const itemWidth = useCarouselWidth();

  return (
    <View>
      <Carousel itemWidth={itemWidth} spacing={16} showIndicators={false}>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            style={{
              backgroundColor: cardColor,
              minHeight: 160,
              padding: 20,
            }}
          >
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View>
                <Text
                  variant="title"
                  style={{ color: textColor, fontSize: 18, marginBottom: 8 }}
                >
                  {product.name}
                </Text>
                <Text
                  style={{ color: textColor, opacity: 0.7, marginBottom: 12 }}
                >
                  ⭐ {product.rating} rating
                </Text>
              </View>
              <Text
                variant="title"
                style={{ color: "#10b981", fontSize: 20, fontWeight: "bold" }}
              >
                {product.price}
              </Text>
            </View>
          </CarouselItem>
        ))}
      </Carousel>

      <Text variant="caption" style={{ marginTop: 16 }}>
        Swipe to see more products →
      </Text>
    </View>
  );
}

const slides = [
  {
    id: 1,
    title: "Full Width Slide 1",
    content: "This slide takes the full width of the container",
  },
  {
    id: 2,
    title: "Full Width Slide 2",
    content: "Perfect for hero sections and main content",
  },
  {
    id: 3,
    title: "Full Width Slide 3",
    content: "Uses paging for smooth navigation",
  },
  {
    id: 4,
    title: "Full Width Slide 4",
    content: "Default behavior - no spacing needed",
  },
];

export function BottomSheetSnapPoints() {
  const { isVisible, open, close } = useBottomSheet();

  return (
    <View>
      <Button onPress={open}>Custom Snap Points</Button>

      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title="Custom Heights"
        snapPoints={[0.2, 0.5, 0.8, 0.95]}
      >
        <View style={{ gap: 16 }}>
          <Text variant="title">Multiple Snap Points</Text>
          <Text>
            This sheet has four different snap points: 20%, 50%, 80%, and 95% of
            screen height. Try dragging to see how it snaps to each position.
          </Text>
          <View style={{ gap: 12 }}>
            <Text variant="body">Available heights:</Text>
            <Text>• 20% - Peek view</Text>
            <Text>• 50% - Medium height</Text>
            <Text>• 80% - Large view</Text>
            <Text>• 95% - Nearly fullscreen</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

export function AvatarDemo() {
  return (
    <View className="flex flex-row items-center gap-4 p-4">
      <Avatar size={60}>
        <AvatarImage
          source={{
            uri: "https://avatars.githubusercontent.com/u/99088394?v=4",
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>

      <Avatar size={60}>
        <AvatarImage
          source={{
            uri: "https://avatars.githubusercontent.com/u/99088394?v=4",
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>

      <Avatar size={60}>
        <AvatarImage
          source={{
            uri: "https://avatars.githubusercontent.com/u/99088394?v=4",
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>

      <Avatar size={60}>
        <AvatarImage
          source={{
            uri: "https://avatars.githubusercontent.com/u/99088394?v=4",
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>

      <Avatar size={60}>
        <AvatarImage
          source={{
            uri: "https://avatars.githubusercontent.com/u/99088394?v=4",
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar size={60}>
        <AvatarImage
          source={{
            uri: "https://avatars.githubusercontent.com/u/99088394?v=4",
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar size={60}>
        <AvatarImage
          source={{
            uri: "https://avatars.githubusercontent.com/u/99088394?v=4",
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </View>
  );
}

export function CardNotification() {
  return (
    <Card style={{ maxWidth: 400 }}>
      <CardHeader>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: "#3b82f6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name={Bell} color="white" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <CardTitle>New Notification</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </View>
        </View>
      </CardHeader>
      <CardContent>
        <Text>
          You have a new message from John Doe. Click to view the full
          conversation and respond.
        </Text>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Dismiss</Button>
        <Button>View Message</Button>
      </CardFooter>
    </Card>
  );
}

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

const Index = () => {
  const mutedForeground = useThemeColor({}, "mutedForeground");
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

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredUsers = mockData.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.status === filter;
    return matchSearch && matchFilter;
  });

  const tenantsQuery = useQuery(urls.getTenantsUrl(), { apiScope: "global" });
  const tenantMutation = useMutation(urls.getTenantsUrl(), "POST", {
    apiScope: "global",
  });

  const { actions, activeKey } = useActiveManager(
    ["all", "completed", "in progress", "cancelled", "scheduled"],
    "all"
  );

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
    <ScrollView className="flex flex-1 flex-col bg-background gap-4 overflow-auto">
      <AppHeader
        // title={() => <Text className="border">Games</Text>}
        hideBackButton
      />
      <CarouselCustomWidth />
      <CardNotification />
      <AvatarDemo />
      <BottomSheetSnapPoints />
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4 gap-6"
        renderItem={({ item }) => (
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-1 px-4 pt-3">
              <Text className="text-base font-bold text-gray-900 flex-1 mr-2">
                {item.name}
              </Text>
              <Badge>{item.status.toLowerCase()}</Badge>
            </View>

            {/* Description */}
            {item.description ? (
              <Text
                className="text-sm text-gray-600 px-4 mb-2"
                numberOfLines={2}
              >
                {item.description}
              </Text>
            ) : null}

            {/* Divider */}
            <View className="h-px bg-gray-100 my-1" />

            {/* Info Row */}
            <View className="flex-row justify-between px-4 mb-2">
              <View className="flex-row items-center space-x-1.5">
                <Coins size={18} color="#2563eb" />
                <Text className="text-sm font-semibold text-gray-800">
                  {item.entryFee} {item.currency}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1.5">
                <Repeat size={18} color="#16a34a" />
                <Text className="text-sm font-semibold text-gray-800">
                  {item.totalRounds} rounds
                </Text>
              </View>
            </View>

            {/* Date Row */}
            <View className="flex-row items-center px-4 pb-3 space-x-1.5">
              <Calendar size={18} color="#ca8a04" />
              <Text className="text-xs text-gray-500">
                {new Date(item.startedAt).toLocaleDateString()}
              </Text>
            </View>
          </Card>
        )}
      />
    </ScrollView>
  );
};

export default Index;
