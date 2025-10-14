import { CardTemplateList } from "@/components/app/card-template/card-template-list";
import { AddCardSheet } from "@/components/app/game/add-card-sheet";
import { BingoHeader } from "@/components/app/game/bingo-heder";
import { CalledNumbersDisplay } from "@/components/app/game/called-numbers-display";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { View } from "@/components/ui/view";
import { useVisibilityManager } from "@/hooks/base/use-visibility-control";
import { useGameStore } from "@/store/game-store";
import { SPACING_SM } from "@/theme/globals";
import { FlashList } from "@shopify/flash-list";
import { Plus, Send } from "lucide-react-native";
import { default as React } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

const DATA = [
  {
    title: "First Item",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cum molestiae assumenda quam, alias perferendis libero nisi. Animi illo ut ipsa voluptatibus a velit, suscipit quaerat. Vel, dicta doloribus",
  },
];

const MyList = () => {
  return (
    <FlashList
      data={DATA}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
};

const PRIMARY_COLOR = "#7f13ec";
const BACKGROUND_COLOR = "#191022";

type ActionType = "add-cart";

export default function PlayBingoScreen() {
  const activeGame = useGameStore((state) => state.activeGame);
  const { states, actions } = useVisibilityManager<ActionType>(["add-cart"]);

  return (
    <View style={styles.container}>
      {/* <ParticleBackground /> */}

      {!activeGame && (
        <ActivityIndicator
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        />
      )}

      {activeGame && (
        <>
          <BingoHeader />
          <CalledNumbersDisplay
            calledNumbers={activeGame?.calledNumbers || []}
            lastCalledNumber={activeGame?.lastNumberCalled}
          />

          {/* <MyListn /> */}
          {/* <MyGameCards /> */}
          <CardTemplateList />
          {/* FABs */}
          <Button
            icon={Send}
            size="icon"
            style={[styles.fab, styles.fabLeft]}
          />

          <Button
            onPress={() => actions.open("add-cart")}
            size="icon"
            style={[styles.fab, styles.fabRight, styles.neonGlow]}
          >
            <Icon name={Plus} color="white" size={40} />
          </Button>
        </>
      )}

      <AddCardSheet
        isVisible={states["add-cart"]}
        onClose={() => actions.toggle("add-cart")}
        onAddCards={(cards) => console.log(cards)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    gap: SPACING_SM,
  },
  scrollView: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    zIndex: 40,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabLeft: {
    left: 24,
    width: 56,
    height: 56,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  sendIcon: {
    transform: [{ rotate: "-45deg" }, { translateY: -1 }, { translateX: 1 }],
  },
  fabRight: {
    right: 24,
    width: 64,
    height: 64,
    backgroundColor: `${PRIMARY_COLOR}cc`,
  },
  neonGlow: {
    shadowColor: PRIMARY_COLOR,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
  },
});
