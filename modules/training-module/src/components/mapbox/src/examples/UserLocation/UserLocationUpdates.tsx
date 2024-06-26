import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';
import MapboxGL, { Location } from '@rnmapbox/maps';

import Bubble from '../common/Bubble';
import { ExampleWithMetadata } from '../common/ExampleMetadata'; // exclude-from-example-doc
import { useDispatch, useSelector } from 'react-redux';
import { setActivity } from '@upward/training/provider/training.slice';

const UserLocationUpdates = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState<Location>();
  const { activity } = useSelector((state: any) => state.activity);

  useEffect(() => {
    const updatedActivity = {
      id: '1',
      date: '05/12/2024',
      startTime: '17:00',
      endTime: '18:00',
      coords: [[0, 0]],
    };

    // console.log({ updatedActivity: JSON.stringify(updatedActivity, null, 2) });

    dispatch(setActivity(updatedActivity));
  }, []);

  const latRef = useRef(0);
  const longRef = useRef(0);

  const setCoordinates = (currentLocation: any) => {
    const {
      timestamp,
      coords: { latitude, longitude, altitude },
    } = currentLocation;
    const truncLong = parseFloat(longitude);
    const truncLat = parseFloat(latitude);
    latRef.current = truncLat;
    longRef.current = truncLong;

    if (
      parseFloat(activity[activity?.coords?.length]?.coords?.latitude) !== parseFloat(latitude) ||
      parseFloat(activity[activity?.coords?.length - 1]?.coords?.longitude) !== parseFloat(longitude)
    ) {
      setLocation(currentLocation);

      const truncLong = parseFloat(longitude.toFixed(6));
      const truncLat = parseFloat(latitude.toFixed(6));
      const bob = [truncLong, truncLat];

      const updatedActivity = {
        id: '1',
        date: '05/12/2024',
        startTime: '17:00',
        endTime: '18:00',
        coords: [...activity.coords, bob],
      };



      dispatch(setActivity(updatedActivity));
    }
  };
  return (
    <>
      <MapboxGL.MapView style={styles.matchParent}>
        <MapboxGL.UserLocation minDisplacement={1} onUpdate={setCoordinates} />
        <MapboxGL.Camera followUserLocation followZoomLevel={16} />
      </MapboxGL.MapView>

      <Bubble>
        {location && (
          <>
            <Text>Timestamp: {location.timestamp}</Text>
            <Text>Longitude: {location.coords.longitude}</Text>
            <Text>Latitude: {location.coords.latitude}</Text>
            <Text>Altitude: {location.coords.altitude}</Text>
            <Text>Heading: {location.coords.heading}</Text>
            <Text>Accuracy: {location.coords.accuracy}</Text>
            <Text>Speed: {location.coords.speed}</Text>
          </>
        )}
      </Bubble>
    </>
  );
};

const styles = {
  matchParent: {
    flex: 1,
  },
};

export default UserLocationUpdates;
/* end-example-doc */

const metadata: ExampleWithMetadata['metadata'] = {
  title: 'User Location Updates',
  tags: ['UserLocation', 'UserLocation#onUpdate'],
  docs: `
Retrieves and shows location updates from UserLocation componen via the \`onUpdate\` callback
`,
};
UserLocationUpdates.metadata = metadata;
