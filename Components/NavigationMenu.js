import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

export default function NavigationMenu() {
  const navigation = useContext(NavigationContext);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Entypo name="home" size={26} color="white"></Entypo>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Locations")}>
        <Entypo name="location-pin" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Devices")}>
        <MaterialIcons name="on-device-training" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Music")}>
        <FontAwesome6 name="music" size={24} color="white" />
      </Pressable>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
