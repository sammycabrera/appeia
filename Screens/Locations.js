import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import NavigationMenu from "../Components/NavigationMenu";
import MapView, { Marker, Polyline } from "react-native-maps";

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

export default function Locations() {
  const [region, setRegion] = useState({
    latitude: 10.3928525,
    longitude: -75.4623964,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [marker, setmarker] = useState({
    latitude: 10.4128525,
    longitude: -75.4623964,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapready, setmapready] = useState(false);

  const [array_map, setarray_map] = useState([marker]);

  useEffect(() => {
    var client = mqtt.connect("mqtt://iotdomobeta.cloud.shiftr.io", options);
    client.subscribe("Samir_C/cuartoN1/Location");
    var lat;
    var long;
    client.on("message", function (topic, message) {
      lat = message.toString().split(":")[0];
      long = message.toString().split(":")[1];

      setarray_map((array_map) => [
        ...array_map,
        { latitude: parseFloat(lat), longitude: parseFloat(long) },
      ]);
      setmarker({
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });
  }, []);
  return (
    <View style={styles.container}>
      <NavigationMenu></NavigationMenu>
      <Text>Locations</Text>
      <MapView
        style={styles.map}
        region={region}
        onMapReady={() => setmapready(true)}
      >
        <Marker coordinate={marker} title="ubicacion 1"></Marker>
        <Polyline
          coordinates={array_map}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
            "#B24112",
            "#E5845C",
            "#238C23",
            "#7F0000",
          ]}
          strokeWidth={6}
        />
      </MapView>
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
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
});
