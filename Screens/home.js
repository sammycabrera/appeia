import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import NavigationMenu from "../Components/NavigationMenu";
import Card from "../Components/Card";
import { LineChart } from "react-native-chart-kit";

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

var cont = 0;
export default function Home() {
  const navigation = useContext(NavigationContext);
  const [temp, settemp] = useState(0);

  //Eje X y eje Y de la grafica
  const [y_axis, sety_axis] = useState([0]);
  const [x_axis, setx_axis] = useState([0]);

  useEffect(() => {
    var client = mqtt.connect("mqtt://iotdomobeta.cloud.shiftr.io", options);
    client.subscribe("Samir_C/cuartoN1/temperature");

    client.on("message", function (topic, message) {
      settemp(parseFloat(message.toString()));
      //arrays de las graficas
      cont = cont + 1;
      setx_axis((x_axis) => [...x_axis, cont]);
      sety_axis((y_axis) => [...x_axis, parseFloat(message.toString())]);
    });
  }, []);
  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      <Card value={temp}></Card>
      {/* <LineChart
        data={{ labels: x_axis, datasets: [{ data: y_axis }] }}
      ></LineChart> */}
      <LineChart
        data={{
          labels: x_axis.slice(-20),
          datasets: [
            {
              data: y_axis.slice(-20),
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="C°"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#000",
          backgroundGradientFrom: "#000",
          backgroundGradientTo: "#000",
          decimalPlaces: 2, //optional, defaults to  2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          //padding: 20,
        }}
      />
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
