import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/HomePage";
import ScannerView from "./src/ScannerView";

const Stack = createNativeStackNavigator();

const Scanner = () => {
  var data = "";
  const navigation = useNavigation();
  const navigateToLocationView = () => {};
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedAgain, setScannedAgain] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    // var data = data;
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate("HomePage", { userData: data });
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scannedAgain ? (
        <Button title={"NAvigatesdsd"} onPress={navigateToLocationView} />
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scannedAgain ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {scanned && (
        <>
          <Button title={"NAvigate"} onPress={navigateToLocationView} />
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScannedAgain(false)}
          />
        </>
      )}
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ScannerView">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ScannerView" component={Scanner} />
      </Stack.Navigator>
    </NavigationContainer>
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
