import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
  const [sound, setSound] = React.useState();

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Kalutara", value: "Kalutara" },
    { label: "Colmbo", value: "Colmbo" },
  ]);
  const navigation = useNavigation();
  const navigateToScanner = () => {
    navigation.navigate("ScannerView");
  };
  const obj = {
    userID: "123456789",
    busNumber: "BUS - 0002",
    busLocation: "Colombo",
  };

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const createJourney = async () => {
    setLoading(true);

    await axios
      .post("https://csse-web-backend.herokuapp.com/ticket/scan", obj)
      .then((res) => {
        setLoading(false);
        console.log("this is if success", res.data);
        if (res.data.resCode == 202) {
          async function playSound() {
            console.log("Loading Sound");
            const { sound } = await Audio.Sound.createAsync(
              require("../assets/Balance.mp3")
            );
            setSound(sound);

            console.log("Playing Sound");
            await sound.playAsync();
          }
          playSound();
        }
        return Alert.alert("Sucess", res.data.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err.response.data);
      });
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Button
            title="Go to scanner page"
            onPress={navigateToScanner}
          ></Button>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select a Location"
          />
          <View style={{ marginTop: 50 }}>
            <Button title="Create Journey" onPress={createJourney}></Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomePage;
