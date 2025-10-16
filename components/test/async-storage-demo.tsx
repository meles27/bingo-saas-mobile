import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageDemo = () => {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState<string | null>(null);

  // Load saved value on mount
  useEffect(() => {
    const loadName = async () => {
      try {
        const value = await AsyncStorage.getItem("user_name");
        if (value) setSavedName(value);
      } catch (error) {
        console.error("Error loading name:", error);
      }
    };
    loadName();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("user_name", name);
      setSavedName(name);
      Alert.alert("Saved!", `Your name "${name}" has been stored.`);
    } catch (error) {
      console.error("Error saving name:", error);
    }
  };

  const handleClear = async () => {
    try {
      await AsyncStorage.removeItem("user_name");
      setSavedName(null);
      Alert.alert("Cleared!", "Stored name has been removed.");
    } catch (error) {
      console.error("Error clearing name:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage Demo</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Clear" color="red" onPress={handleClear} />
      </View>

      <Text style={styles.result}>
        {savedName ? `Stored name: ${savedName}` : "No name stored yet"}
      </Text>
    </View>
  );
};

export default AsyncStorageDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
  },
  result: {
    fontSize: 16,
    marginTop: 10,
  },
});
