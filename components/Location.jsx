import { useState, useEffect } from 'react';
import { Platform, View, Text } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

export default function LocationComponent({ onLocationFetched }) {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === 'android' && !Device.isDevice) {
          setErrorMsg(
            'This will not work on an Android Emulator. Try it on a real device!'
          );
          return;
        }

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        
        onLocationFetched(location);  
      } catch (error) {
        setErrorMsg('Error fetching location');
      }
    })();
  }, []);

  return null; 
}


