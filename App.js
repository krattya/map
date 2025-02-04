import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const App = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required!');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);


  const onMapLongPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkers([...markers, { latitude, longitude }]);
  };

  if (!region) {
    return <View />;
  }

  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      onLongPress={onMapLongPress}
      showsUserLocation
      followUserLocation
      showsMyLocationButton
    >
      {/* Render markers on the map */}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
        />
      ))}
    </MapView>
  );
};

export default App;
