import React, { useEffect, useState } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import { Button } from '@rneui/base';
import { lineString as makeLineString } from '@turf/helpers';
import { point } from '@turf/helpers';

import RouteSimulator from '../../utils/RouteSimulator';
import { directionsClient } from '../../MapboxClient';
import sheet from '../../styles/sheet';
// import { SF_OFFICE_COORDINATE } from '../../utils';
// import BaseExamplePropTypes from '../common/BaseExamplePropTypes';
// import Page from '../common/Page';
import PulseCircleLayer from '../common/PulseCircleLayer';
// import { Screen } from '@upward/core-ui-library'

import { useSelector } from 'react-redux';
const START_COORDINATE = [-97.74791, 30.25299]; //Start User Location
const END_COORDINATE = [-97.74791, 30.25299]; //Destination
const UserLocation = [-97.74791, 30.25299]; // [longitude, latitude]
const DestinationLocation = [2.3488, 48.8534]; // [longitude, latitude]
const StartLocation = UserLocation;
const CenterCoordinate = UserLocation;

export const DriveTheLine = () => {
  const [userLocation, setUserLocation] = useState(UserLocation);
  const [route, setRoute] = useState([START_COORDINATE, END_COORDINATE]);
  const [started, setStarted] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [routeSimulator, setSimulator] = useState(null);
  const { activity } = useSelector((state: any) => state.activity);

  useEffect(() => {
    const fetchRoute = async () => {
      const reqOptions = {
        waypoints: [
          { coordinates: [-97.74791, 30.25299] },
          { coordinates: [-97.74964, 30.26598] },
          { coordinates: [-97.75308, 30.2669] },
          { coordinates: [-97.76236, 30.25604] },
        ],
        profile: 'driving',
        geometries: 'geojson',
      };

      const res = await directionsClient.getDirections(reqOptions).send();
      // console.log("FIRE", res);
      // console.log("bob", { res: JSON.stringify(res.body.routes[0].geometry.coordinates, null, 2) });

      const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
      setRoute(newRoute);
      // const parsedCoords = activity.coords.slice(1)
      // const newRoute = makeLineString(parsedCoords);
      // setRoute(newRoute);
    };
    fetchRoute();
  }, []);

  console.log('ROUTE', route);
  // Action to center the map on user position
  const centeringButtonPress = () => {
    _camera.flyTo(userLocation, 1500);
    _camera.zoomTo(16);
  };

  // Update userposition on update location
  const onUserLocationUpdate = (newUserLocation) => {
    setUserLocation([newUserLocation.coords.longitude, newUserLocation.coords.latitude]);
  };

  const onStop = () => {
    setRoute(null);
    setStarted(false);
  };
  useEffect(() => {
    console.log('started', started);
    if (started) {
      console.log('start');
      const routeSimulator = new RouteSimulator(route);
      routeSimulator.addListener((currentPoint) => setCurrentPoint({ currentPoint }));
      routeSimulator.start();

      setSimulator({ routeSimulator });
    }
  }, [started]);

  // const renderDestinationPoint = () => {
  //   return DestinationLocation && DestinationLocation.length > 0 && started ? (
  //     <MapboxGL.PointAnnotation
  //       id="destination"
  //       title="destination location"
  //       coordinate={DestinationLocation}>
  //       <View style={styles.circle}>
  //         <View style={styles.innerCircle}>
  //           <View style={styles.dotCircle} />
  //         </View>
  //       </View>
  //     </MapboxGL.PointAnnotation>
  //   ) : null;
  // };

  const renderStart = () => {
    let backgroundColor = 'white';

    if (currentPoint) {
      backgroundColor = '#314ccd';
    }

    const style = [layerStyles.origin, { circleColor: backgroundColor }];

    return StartLocation.length > 0 ? (
      <>
        <MapboxGL.ShapeSource id="origin" shape={point(START_COORDINATE)}>
          <MapboxGL.Animated.CircleLayer id="originInnerCircle" style={style} />
        </MapboxGL.ShapeSource>
        {/* <MapboxGL.PointAnnotation
        id="start"
        title="start location"
        coordinate={StartLocation}>
        <View style={styles.circle}>
          <View style={styles.innerCircle}>
            <View style={styles.dotCircle} />
          </View>
        </View>
      </MapboxGL.PointAnnotation> */}
      </>
    ) : null;
  };
  const renderCurrentPoint = () => {
    if (!currentPoint) {
      return;
    }
    return <PulseCircleLayer shape={currentPoint} aboveLayerID="destinationInnerCircle" />;
  };

  const renderRoute = () => {
    return route ? (
      <MapboxGL.ShapeSource id="routeSource" shape={route}>
        <MapboxGL.LineLayer id="routeFill" style={layerStyles.route} belowLayerID="originInnerCircle" />
      </MapboxGL.ShapeSource>
    ) : null;
  };
  const renderProgressLine = () => {
    if (currentPoint === null || route === null) {
      return null;
    }
    console.log('route ', route?.geometry?.coordinates);
    const { nearestIndex } = currentPoint.currentPoint.properties;

    const coords = route?.geometry?.coordinates?.filter((c, i) => i <= nearestIndex);
    coords.push(currentPoint.currentPoint.geometry.coordinates);

    if (coords.length < 2) {
      return null;
    }

    const lineString = makeLineString(coords);
    // return <View/>
    return (
      <MapboxGL.Animated.ShapeSource id="progressSource" shape={lineString}>
        <MapboxGL.Animated.LineLayer id="progressFill" style={layerStyles.progress} aboveLayerID="routeFill" />
      </MapboxGL.Animated.ShapeSource>
    );
  };
  // Start Button
  const renderActions = () => {
    console.log('START BUTTON', started);
    return (
      <TouchableOpacity style={styles.startRouteButton} onPress={() => setStarted(true)}>
        <Text style={styles.text}>{!started ? 'Start' : 'Stop'}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {/* {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )} */}
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.flex}>
          <MapboxGL.MapView ref={(c) => (_map = c)} style={sheet.matchParent} styleURL={MapboxGL.StyleURL.Dark}>
            <MapboxGL.Camera zoomLevel={11} centerCoordinate={CenterCoordinate} />

            {/* <MapboxGL.UserLocation
              visible={true}
              onUpdate={newUserLocation =>
                onUserLocationUpdate(newUserLocation)
              }
            /> */}
            {renderRoute()}
            {renderCurrentPoint()}
            {/* {renderDestinationPoint()} */}
            {renderStart()}
            {renderProgressLine()}
            <MapboxGL.ShapeSource id="destination" shape={point(END_COORDINATE)}>
              <MapboxGL.CircleLayer id="destinationInnerCircle" style={layerStyles.destination} />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
          {renderActions()}
          {/* <CenteringButtonMap onPress={() => centeringButtonPress()} /> */}
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, .5)',
    height: '100%',
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startRouteButton: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 20,
    width: 100,
    height: 100,
    zIndex: 200,
  },
  text: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(68, 154, 235, .4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(68, 154, 235, 1)',
  },
});

const layerStyles = {
  route: {
    lineColor: '#1D1D1D',
    lineCap: 'round',
    lineWidth: 3,
    lineOpacity: 0.84,
  },
};
