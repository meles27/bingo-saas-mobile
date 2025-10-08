import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { urls } from "@/config/urls";
import { SPACING_SM } from "@/theme/globals";
import { PharmacyListEntity } from "@/types/api/base/pharmacy.type";
import React from "react";

interface SearchPharmacyCardProps {
  pharmacy: PharmacyListEntity;
}

const SearchPharmacyCard: React.FC<SearchPharmacyCardProps> = ({
  pharmacy,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        // gap: SPACING_SM,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 2 }}>
        <Text numberOfLines={1} variant="subtitle">
          {pharmacy.name}
        </Text>
        <Text numberOfLines={1} variant="caption">
          {pharmacy.address}
        </Text>
        <Text numberOfLines={1} variant="body">
          {pharmacy.review_star}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Image
          style={{ borderRadius: 8, flexShrink: 0, flex: 1 }}
          variant="default"
          source={{ uri: pharmacy.image_url || urls.getRandomImageUrl() }}
        />
      </View>
    </View>
  );
};

export default SearchPharmacyCard;
