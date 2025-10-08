import SearchPharmacyCard from "@/components/app/pharmacy/search-pharmacy-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { View } from "@/components/ui/view";
import {
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
  SPACING_XL,
} from "@/theme/globals";
import type { PharmacyListEntity } from "@/types/api/base/pharmacy.type";
import {
  DoorOpenIcon,
  NewspaperIcon,
  SearchIcon,
  StoreIcon,
} from "lucide-react-native";
import React from "react";
import { FlatList } from "react-native";

const pharmacies: PharmacyListEntity[] = [
  {
    id: 1,
    name: "GreenLife Pharmacy",
    location: "Addis Ababa",
    address: "Bole Road, Near Friendship Building",
    distance: "0.8 km",
    review_star: 4.6,
    phone: "+251911223344",
    is_open: true,
    open_hours: "8:00 AM - 10:00 PM",
    image_url: "https://picsum.photos/seed/pharmacy1/600/400",
  },
  {
    id: 2,
    name: "CityCare Drug Store",
    location: "Mekelle",
    address: "Romanat Street, Next to Dashen Bank",
    distance: "1.2 km",
    review_star: 4.3,
    phone: "+251920334455",
    is_open: false,
    open_hours: "9:00 AM - 9:00 PM",
    image_url: "https://picsum.photos/seed/pharmacy2/600/400",
  },
  {
    id: 3,
    name: "HealthPlus Pharmacy",
    location: "Adama",
    address: "Main Road, Opposite Damera Hotel",
    distance: "2.1 km",
    review_star: 4.8,
    phone: "+251922556677",
    is_open: true,
    open_hours: "7:30 AM - 11:00 PM",
    image_url: "https://picsum.photos/seed/pharmacy3/600/400",
  },
  {
    id: 4,
    name: "WellMed Pharmacy",
    location: "Dire Dawa",
    address: "Sabian Area, Near Bus Station",
    distance: "0.5 km",
    review_star: 4.4,
    phone: "+251930445566",
    is_open: true,
    open_hours: "8:00 AM - 10:30 PM",
    image_url: "https://picsum.photos/seed/pharmacy4/600/400",
  },
  {
    id: 5,
    name: "LifeCare Drug Center",
    location: "Hawassa",
    address: "Piazza Street, Near Hawassa University",
    distance: "1.0 km",
    review_star: 4.2,
    phone: "+251940998877",
    is_open: true,
    open_hours: "8:30 AM - 9:30 PM",
    image_url: "https://picsum.photos/seed/pharmacy5/600/400",
  },
  {
    id: 6,
    name: "Medico Pharmacy",
    location: "Gondar",
    address: "Central Market Area",
    distance: "2.8 km",
    review_star: 4.0,
    phone: "+251911334455",
    is_open: false,
    open_hours: "9:00 AM - 8:00 PM",
    image_url: "https://picsum.photos/seed/pharmacy6/600/400",
  },
  {
    id: 7,
    name: "Prime Health Pharmacy",
    location: "Bahir Dar",
    address: "Lake Tana Road, Near Kuriftu Resort",
    distance: "3.5 km",
    review_star: 4.7,
    phone: "+251933221100",
    is_open: true,
    open_hours: "8:00 AM - 10:00 PM",
    image_url: "https://picsum.photos/seed/pharmacy7/600/400",
  },
  {
    id: 8,
    name: "CurePlus Drug Store",
    location: "Jimma",
    address: "Abajifar Avenue, Near Post Office",
    distance: "1.7 km",
    review_star: 4.1,
    phone: "+251922334466",
    is_open: false,
    open_hours: "9:00 AM - 9:00 PM",
    image_url: "https://picsum.photos/seed/pharmacy8/600/400",
  },
  {
    id: 9,
    name: "Vital Pharmacy",
    location: "Harar",
    address: "Sheikh Abadir Street, Old Town",
    distance: "2.9 km",
    review_star: 4.5,
    phone: "+251915667788",
    is_open: true,
    open_hours: "7:00 AM - 11:00 PM",
    image_url: "https://picsum.photos/seed/pharmacy9/600/400",
  },
  {
    id: 10,
    name: "TrustMed Pharmacy",
    location: "Shire",
    address: "Shire City Center, Near Bus Terminal",
    distance: "0.9 km",
    review_star: 4.6,
    phone: "+251988112233",
    is_open: true,
    open_hours: "8:00 AM - 10:00 PM",
    image_url: "https://picsum.photos/seed/pharmacy10/600/400",
  },
];

const Search = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SPACING_MD,
        paddingVertical: SPACING_LG,
        gap: SPACING_LG,
      }}
    >
      <Input icon={SearchIcon} />

      <View style={{ flexDirection: "row", gap: SPACING_SM }}>
        <Button
          size="sm"
          variant="default"
          style={{ flex: 1 }}
          icon={DoorOpenIcon}
        >
          open now
        </Button>
        <Button
          size="sm"
          variant="outline"
          style={{ flex: 1 }}
          icon={NewspaperIcon}
        >
          near by
        </Button>
        <Button
          size="sm"
          variant="outline"
          style={{ flex: 1 }}
          icon={StoreIcon}
        >
          has stock
        </Button>
      </View>

      <FlatList
        data={pharmacies}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: SPACING_XL }}>
            <SearchPharmacyCard pharmacy={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Search;
