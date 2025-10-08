import { Text } from "@/components/ui/text";
import { SPACING_SM } from "@/theme/globals";
import React from "react";
import { FlatList, Image, ListRenderItem, View } from "react-native";

interface Drug {
  id: string | number;
  name: string;
  category: string;
  imageUrl: string;
}

interface PopularDrugsProps {
  title: string;
}

export const PopularDrugs: React.FC<PopularDrugsProps> = ({ title }) => {
  const popularDrugs = [
    {
      id: "1",
      name: "Amoxicillin",
      category: "Antibiotic",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCYoeZf9Q3L7WEA7Ns-o8WDrVZ4QE4wkxxAr8yskjmOD3S8-IrZpVKhtsRuChwjASA-A1xnjZAlcV0siaPMRgXKqSQjlTZm4ywgY6SWScWgZTrG9g0lMcYVyNeK8QrJU3hwlSBpmoao_2gzMH2_BXWOjSqZAMU8BtKx91iKWCiQiEY1vMAnFCUTY0k5A9G2oiLUcw3KxV0YRRDHH-uSiJZ8zbNoCbvgtEIiR1sKf7_yB2zomvOux3hUJuNU9BpP6ebpHxU-oJJnyHax",
    },
    {
      id: "2",
      name: "Ibuprofen",
      category: "Pain Reliever",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA2Tth5JRImvif3Z_tISftvg1jBSA02EO-pSM45EoWZ730xG4RqHpJGwzsMoo8OeldDuKnatZ6ud4EjFOshSCYWhHTZeCdwIocP6rwK4Wtn5sNRYsiwV3EnMEexzGHZ4gWuSlMOKGZKI74aQc-gQzVJlFYD8CQRaIqdKrMQXdQ9xf4RykQrS33hnJehTA8M-xOlMdrD2haDRSkBuaizMywDqszblJArpBDp_zcmdX890_F5zVY3gGr-7I_ax5RYM1iohz_oE0T-_nf6",
    },
    {
      id: "3",
      name: "Lisinopril",
      category: "Blood Pressure",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBBQvB0Am0EFqrKiIlFsIoeykMA3tgPhO36BK0L0lcCKNGQdTm4oRV2MrjXmnHDSIcqm7ypIGqN0fCuSBFuBVdjJ5ihzgofhtXFBxk5XmkO0pCD4dE0Wy7N7LADpqBBTb-ERwEHYK_tuyqNPfapUteTrkDzyG7hUD4mlPdYsXeYFApNUVMCD8lU1EZ0ENvr_QZ-n9f9VrySA7yHOGOxporzW_r9VlqofWdeKOPK8REahTeBUeoy_4LHS8tX4x7V1zj58oGguZumLu0b",
    },
    {
      id: "4",
      name: "Metformin",
      category: "Diabetes",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBwRVVHTO_4WM-HhsQnrD4HoGJg1Oe4JX3ARbOIC0CJh-QK4SMJscLV6e65eCbikJhzJZnFPMx9irqMg1D6dJH--9hqDYodS5ZhaQ4-yTdwDPhY9ijfEVkcW1st8L4zQYYG2qobwtplwEkf0cpXmn_n4hyoOsrEqy1IKEdx9zHariesIya8jY_bp6aFbS2sJj-ri44C4fNFNZD4XBb4ByPNSmHQ6RbP38XWDxPP-VnTtF9WpTghl0jihOtPuWQ3zb4oru7Nl6c0rWdq",
    },
  ];

  const renderItem: ListRenderItem<Drug> = ({ item: drug }) => (
    <View
      style={{
        width: "48%",
        gap: 8,
      }}
    >
      <Image
        source={{ uri: drug.imageUrl }}
        style={{
          aspectRatio: 1,
          width: "100%",
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      <View style={{ marginTop: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{drug.name}</Text>
        <Text style={{ fontSize: 12, color: "#666" }}>{drug.category}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ gap: SPACING_SM }}>
      <Text variant="subtitle">{title}</Text>
      <FlatList
        data={popularDrugs}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      />
    </View>
  );
};
