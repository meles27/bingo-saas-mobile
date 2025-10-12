import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import JSONTree from "react-native-json-tree";

interface JsonViewerProps {
  title?: string;
  data: any;
  theme?: any;
  invertTheme?: boolean;
}

const defaultTheme = {
  scheme: "monokai",
  author: "wimer hazenberg (http://www.monokai.nl)",
  base00: "#272822",
  base01: "#383830",
  base02: "#49483e",
  base03: "#75715e",
  base04: "#a59f85",
  base05: "#f8f8f2",
  base06: "#f5f4f1",
  base07: "#f9f8f5",
  base08: "#f92672",
  base09: "#fd971f",
  base0A: "#f4bf75",
  base0B: "#a6e22e",
  base0C: "#a1efe4",
  base0D: "#66d9ef",
  base0E: "#ae81ff",
  base0F: "#cc6633",
};

const JsonViewer: React.FC<JsonViewerProps> = ({
  title = "JSON Data",
  data,
  theme = defaultTheme,
  invertTheme = false,
}) => {
  const handleCopy = async () => {
    try {
      const formatted = JSON.stringify(data, null, 2);
      await Clipboard.setStringAsync(formatted);
      Alert.alert("Copied!", "JSON data has been copied to clipboard ✅");
    } catch (err) {
      Alert.alert("Error", "Failed to copy JSON data ❌");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.treeContainer}>
        <JSONTree data={data} theme={theme} invertTheme={invertTheme} />
      </View>
    </View>
  );
};

export { JsonViewer };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  copyButton: {
    backgroundColor: "#444",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  copyText: {
    color: "#f8f8f2",
    fontWeight: "600",
  },

  treeContainer: {
    overflow: "scroll",
    backgroundColor: "#1e1e1e",
    padding: 10,
    flex: 1,
  },
});
