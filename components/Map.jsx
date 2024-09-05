import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function Map({ latitude, longitude }) {
  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01, 
  };

  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map} 
      region={region}
      mapType="satellite"
      >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});





