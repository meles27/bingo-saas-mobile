import { Card, CardContent } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/searchbar";
import { View } from "@/components/ui/view";
import React, { useState } from "react";

export default function SearchBarDemo() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <Card style={{ backgroundColor: "transparent", boxShadow: "none" }}>
      <CardContent>
        <View>
          <SearchBar
            placeholder="Search for anything..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={handleSearch}
          />
        </View>
      </CardContent>
    </Card>
  );
}
