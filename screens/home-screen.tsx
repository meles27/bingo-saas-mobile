import AppHeader from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
  SPACING_XL,
} from "@/theme/globals";
import { useRouter } from "expo-router";
import {
  Award,
  History,
  LayoutDashboard,
  MessageSquareText,
  Play,
  Wallet,
} from "lucide-react-native";
import React from "react";

const HomeScreen = () => {
  const router = useRouter();
  const primaryColor = useThemeColor({}, "primary");
  const backgroundColor = useThemeColor({}, "background");
  return (
    <View style={{ flex: 1 }}>
      {/* header section */}
      <AppHeader hideBackButton />
      {/* main section */}
      <ScrollView>
        <View
          style={{
            paddingHorizontal: SPACING_MD,
            paddingVertical: SPACING_LG,
            gap: SPACING_XL,
          }}
        >
          <Image
            source={{ uri: "https://picsum.photos/800/300?random=20" }}
            aspectRatio={2}
          />

          <View style={{ gap: SPACING_SM }}>
            {/* row 1 */}
            <View style={{ flexDirection: "row", gap: SPACING_MD }}>
              <Button
                variant="default"
                style={{
                  borderRadius: SPACING_SM,
                  height: 100,
                  flex: 1,
                }}
                icon={Play}
              >
                Join Game
              </Button>

              <Button
                variant="outline"
                style={{
                  borderRadius: SPACING_SM,
                  height: 100,
                  flex: 1,
                }}
                icon={Wallet}
              >
                Wallet
              </Button>
            </View>

            {/* row 2 */}
            <View style={{ flexDirection: "row", gap: SPACING_MD }}>
              <Button
                variant="outline"
                style={{
                  borderRadius: SPACING_SM,
                  height: 100,
                  flex: 1,
                }}
                icon={LayoutDashboard}
              >
                LeaderBoard
              </Button>

              <Button
                variant="outline"
                style={{
                  borderRadius: SPACING_SM,
                  height: 100,
                  flex: 1,
                }}
                icon={Award}
              >
                Rewards
              </Button>
            </View>

            {/* row 3 */}
            <View style={{ flexDirection: "row", gap: SPACING_MD }}>
              <Button
                variant="outline"
                style={{
                  borderRadius: SPACING_SM,
                  height: 100,
                  flex: 1,
                }}
                icon={History}
              >
                History
              </Button>

              <Button
                variant="outline"
                style={{
                  borderRadius: SPACING_SM,
                  height: 100,
                  flex: 1,
                }}
                icon={MessageSquareText}
              >
                Live Chat
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
