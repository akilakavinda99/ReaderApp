import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { Audio } from "expo-av";

const HomePage = ({ route }) => {
  const { userData } = route.params;
  console.log(userData);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState();
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: "Kalutara", value: "Kalutara" },
    { label: "Colombo", value: "Colombo" },
  ]);

  const navigation = useNavigation();

  const navigateToScanner = () => {
    navigation.navigate("ScannerView");
  };

  const obj = {
    userID: userData,
    busNumber: "BUS - 0002",
    busLocation: value,
  };

  useEffect(() => {
    return sound
      ? () => {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);
  async function playBalanceSound(path) {
    var req = path;
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Balance.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  async function playCreatedSound(path) {
    var req = path;
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Onboard.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  async function playEndingSound(path) {
    var req = path;
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Ending.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  async function playErrorSound(path) {
    var req = path;
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Error.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  const createJourney = async () => {
    setLoading(true);

    await axios
      .post("https://csse-web-backend.herokuapp.com/ticket/scan", obj)
      .then((res) => {
        setLoading(false);
        console.log("this is if success", res.data);
        if (res.data.resCode == 202) {
          playCreatedSound();
        } else if (res.data.resCode == 201) {
          playEndingSound();
        } else if (res.data.resCode == 402) {
          playBalanceSound();
        } else {
          playErrorSound();
        }
        return Alert.alert("Ticket Scanner", res.data.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.resCode == 402) {
          playBalanceSound();
        }
        console.log(err.response.data);
      });
  };

  return (
    <View
      style={{
        marginTop: 100,
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View
            style={{
              width: 180,
              height: 80,
              marginLeft: 100,
            }}
          >
            <Button
              title="Go to scanner page"
              onPress={navigateToScanner}
            ></Button>
          </View>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select a Location"
          />
          <View
            style={{ marginTop: 50, width: 140, height: 120, marginLeft: 120 }}
          >
            <Button title="Create Journey" onPress={createJourney}></Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomePage;
