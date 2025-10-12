import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { BORDER_RADIUS, SPACING_MD, SPACING_SM } from "@/theme/globals";
import { UserWalletEntity } from "@/types/api/base/wallet.type";
import { formatPrice } from "@/utils/format-price";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowDownToLine,
  ArrowRightLeft,
  ArrowUpFromLine,
  LucideIcon,
  User,
} from "lucide-react-native";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const ActionItem = ({
  icon,
  label,
  onPress,
}: {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.actionItem}>
    <Button
      icon={icon}
      size="icon"
      variant="ghost"
      style={styles.actionButton}
    />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

interface WalletCardProps {
  data: UserWalletEntity;
}

export const WalletCard = ({ data }: WalletCardProps) => {
  const { user, total, available, reserved, currency } = data;

  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    translateY.value = withSpring(0);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const userFullName = `${user.firstName} ${user.lastName}`;

  return (
    <Animated.View style={animatedStyle}>
      <LinearGradient
        colors={["#4c1d95", "#7c3aed"]}
        style={styles.cardContainer}
      >
        {/* Card Header with User Info */}
        <View style={styles.cardHeader}>
          <Avatar>
            <AvatarImage source={{ uri: user.image || undefined }} />
            <AvatarFallback>
              <Text>
                <Icon name={User} />
              </Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <Text style={styles.userName}>{userFullName}</Text>
            <Text style={styles.userHandle}>@{user.username}</Text>
          </View>
        </View>

        {/* Total Balance Section */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.totalBalanceText}>
            {formatPrice(total, currency)}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Available and Reserved Section */}
        <View style={styles.subBalanceContainer}>
          <View style={styles.subBalanceItem}>
            <Text style={styles.subBalanceLabel}>Available</Text>
            <Text style={styles.subBalanceAmount}>
              {formatPrice(available, currency)}
            </Text>
          </View>
          <View style={styles.subBalanceItem}>
            <Text style={styles.subBalanceLabel}>Reserved</Text>
            <Text style={styles.subBalanceAmount}>
              {formatPrice(reserved, currency)}
            </Text>
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.actionsContainer}>
          <ActionItem
            icon={ArrowDownToLine}
            label="Deposit"
            onPress={() => console.log("Deposit pressed")}
          />
          <ActionItem
            icon={ArrowUpFromLine}
            label="Withdraw"
            onPress={() => console.log("Withdraw pressed")}
          />
          <ActionItem
            icon={ArrowRightLeft}
            label="Transfer"
            onPress={() => console.log("Transfer pressed")}
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    padding: SPACING_MD,
    gap: 20,
    marginHorizontal: SPACING_MD,
    elevation: 10,
    shadowColor: "#4c1d95",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING_SM,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  userHandle: {
    fontSize: 14,
    color: "#e9d5ff",
  },
  balanceSection: {
    alignItems: "center",
    gap: SPACING_SM,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#e9d5ff",
  },
  totalBalanceText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  subBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subBalanceItem: {
    alignItems: "center",
    gap: 4,
  },
  subBalanceLabel: {
    fontSize: 14,
    color: "#e9d5ff",
  },
  subBalanceAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: SPACING_SM,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  actionItem: {
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
});
