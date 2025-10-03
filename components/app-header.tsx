import { useSidebar } from "@/hooks/base/use-sidebar";
import { useRouter } from "expo-router";
import { ArrowLeft, Menu } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AppHeaderProps {
  title?: string | (() => React.ReactNode | string);
  hideTitle?: boolean;
  hideBackButton?: boolean;
  hideMenuButton?: boolean;
}

const RenderTitle: React.FC<{
  title: string | (() => React.ReactNode | string);
}> = ({ title }) => {
  const info = typeof title === "function" ? title() : title;
  return (
    <>
      {typeof title == "string" ? (
        <Text numberOfLines={1} className="text-lg font-bold">
          {title}
        </Text>
      ) : (
        info
      )}
    </>
  );
};

const AppHeader: React.FC<AppHeaderProps> = ({
  title = "Alpha Betting",
  hideTitle = false,
  hideBackButton = false,
  hideMenuButton = false,
}) => {
  const router = useRouter();
  const { openSidebar } = useSidebar();

  return (
    <View
      className="flex-row justify-between items-center px-4 py-2 border rounded-3xl mx-2"
      style={{ borderColor: "rgba(0,0,0,0.1)" }}
    >
      {/* Back Button */}
      {!hideBackButton && (
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} />
        </TouchableOpacity>
      )}

      {/* Title */}
      {!hideTitle && (
        <View className="flex flex-col flex-1">
          <RenderTitle title={title} />
        </View>
      )}

      {/* Menu Button */}
      {!hideMenuButton && (
        <TouchableOpacity onPress={openSidebar} className="p-2">
          <Menu size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppHeader;
