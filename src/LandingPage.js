import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Button,
  Pressable,
  TouchableOpacity,
  Text,
} from "react-native";

const LandingPage = () => {
  const naigation = useNavigation();
  const navigateToScan = () => {
    naigation.navigate("ScannerView");
  };
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 100,
        }}
      >
        Bus Ticket Scanner
      </Text>
      <View
        style={{
          marginTop: 50,
        }}
      >
        <Image
          style={{
            marginTop: 50,
            marginLeft: 90,
            marginBottom: 30,
            width: 200,
            height: 200,
          }}
          source={{
            uri: "https://i.postimg.cc/52xyXX1q/qr-code.png",
          }}
        />
      </View>
      <TouchableOpacity onPress={navigateToScan}>
        <Image
          style={{
            width: 80,
            height: 80,
            marginLeft: 145,
            marginTop: 30,
          }}
          source={{
            uri: "https://i.postimg.cc/5tQhbMjd/camera2.png",
          }}
        />
      </TouchableOpacity>
      {/* <Button title="Scan Now" onPress={navigateToScan}></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default LandingPage;
