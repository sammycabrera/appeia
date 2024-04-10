import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import NavigationMenu from "../Components/NavigationMenu";
import { FontAwesome6 } from "@expo/vector-icons";
export default function Card({ value }) {
  const navigation = useContext(NavigationContext);
  return (
    <View style={styles.container}>
      <FontAwesome6 name="temperature-half" size={100} color="black" />
      <Text style={styles.value_temp}>{" " + value}C° </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  value_temp: {
    fontSize: 70,
    color: "black",
  },
});
