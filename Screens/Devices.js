import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavigationMenu from "../Components/NavigationMenu";
import SmartButton from "../Components/SmartButton";

export default function Devices() {
  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      {/* <StatusBar style="auto" /> */}
      <SmartButton></SmartButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 100,
  },
});
