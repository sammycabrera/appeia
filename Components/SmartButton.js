import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import NavigationMenu from "../Components/NavigationMenu";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

var mqtt = require("@taoqf/react-native-mqtt");
var options = {
  protocol: "mqtts",
  clientID: "frontend_2",
  username: "iotdomobeta",
  password: "hZREkxrENS6cTeSw",
  //clientID: "frontend_1",
  //username: "eiaiot1scm",
  //password: "so8rVCM9TdkZjY0Q",
};

export default function SmartButton({ title, topic, setvalue, value }) {
  const navigation = useContext(NavigationContext);

  const [animation, setanimation] = useState(new Animated.Value(0));
  const [press, setpress] = useState(false);

  const handlePress = () => {
    setpress(!press);
    startAnimation(press ? 1 : 0);

    var client = mqtt.connect("mqtt://iotdomobeta.cloud.shiftr.io", options);
    client.on("connect", function () {
      //client.publish("on", press ? "ON" : "OFF");

      //nuevo
      client.publish("Samir_C/cuartoN1/control", press ? "ON" : "OFF");

      client.end();
    });
  };

  const startAnimation = (value) => {
    Animated.timing(animation, {
      toValue: value === 1 ? 75 : 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    right: {
      transform: [{ translateX: animation }],
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text_title}>{title}dsd</Text>
      <View style={styles.container_button}>
        <Pressable style={styles.button_press} onPress={() => handlePress()}>
          <Animated.View
            style={[styles.button, animatedStyle.right]}
          ></Animated.View>
          <Ionicons name="moon-sharp" size={40} color="black" />
          <Entypo name="light-up" size={40} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 150,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text_title: {
    fontSize: 70,
    color: "black",
    width: "40%",
    textAlign: "center",
  },

  container_button: {
    width: "60%",
    height: "100%",
    borderLeftWidth: 4,
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button_press: {
    height: 60,
    width: 150,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    height: 60,
    width: 75,
    borderRadius: 30,
    backgroundColor: "black",
    position: "absolute",
    left: 0,
  },
});
