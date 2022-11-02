import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const ScannerView = () => {
  console.log("sdsdr");
  const [hasPermission, setHasPermission] = useState(true);
  const [scanned, setScanned] = useState(false);
  //   useEffect(() => {
  //     (async () => {})();
  //   }, []);
  const getPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === true);
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  //   if (hasPermission === null) {
  //     return <Text>Requesting for camera permission</Text>;
  //   }
  //   if (hasPermission === false) {
  //     return <Text>No access to camera</Text>;
  //   }
  return (
    <View>
      {hasPermission ? (
        <View style={styles.container}>
          <Text>sdsd</Text>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
      ) : (
        <Button title="Get Permission" onPress={getPermission}></Button>
      )}
    </View>
  );
};

export default ScannerView;
