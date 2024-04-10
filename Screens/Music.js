import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavigationMenu from "../Components/NavigationMenu";

export default function Music() {
  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      <Text>Music</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
