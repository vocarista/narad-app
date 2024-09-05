import React, { useState } from 'react';
import { View } from 'react-native';
import Map from '../components/Map';
import Location from '../components/Location';
import Slider from '../components/Slider'



export default function Index() {
  const [location, setLocation] = useState(null); // Explicit type for location

  const handleLocationFetched = (loc) => {
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  return (
    <View style={{
       flex: 1,
       backgroundColor:'#ede4e4'
     }}>
      {location && <Map latitude={location.latitude} longitude={location.longitude} />}
      <Location onLocationFetched={handleLocationFetched} />
      <Slider></Slider>   
    </View>
  );
}



