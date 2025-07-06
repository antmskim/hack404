import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, PermissionsAndroid, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import globalStyles from '../theme/globalStyles';
import { colors } from '../theme/colors.js';
import { spacing } from '../theme/spacing.js';
import { typography } from '../theme/typography.js';
import Logo from '../components/Logo';
import ButtonXL from '../components/buttonXL';
import FishCard from '../components/fishCard';
import NavBar from '../components/navBar';
import { GOOGLE_MAPS_API_KEY } from '@env';

const ZONES = [
  { "zone": 1, "min_lat": 54.00012386864811, "max_lat": 56.85937337040139, "min_lon": -91.74225773341936, "max_lon": -82.19715702723646 },
  { "zone": 2, "min_lat": 50.09634176817805, "max_lat": 55.094659657337075, "min_lon": -95.15368106302658, "max_lon": -85.83969773671373 },
  { "zone": 3, "min_lat": 47.01815072105589, "max_lat": 52.61755574238614, "min_lon": -95.14899916922643, "max_lon": -88.40165554999406 },
  { "zone": 4, "min_lat": 45.55297647293542, "max_lat": 49.03657608289817, "min_lon": -93.11643542020002, "max_lon": -86.0622813111797 },
  { "zone": 5, "min_lat": 44.52766751918643, "max_lat": 49.048882784302836, "min_lon": -87.17118204790347, "max_lon": -82.39618037848656 },
  { "zone": 6, "min_lat": 43.03705323011985, "max_lat": 47.42113738181973, "min_lon": -90.5266314310084, "max_lon": -82.56745039148167 },
  { "zone": 7, "min_lat": 43.58883955152281, "max_lat": 46.92047433447511, "min_lon": -85.25111802865727, "max_lon": -79.10092273945142 },
  { "zone": 8, "min_lat": 44.56370839105748, "max_lat": 45.73528873259553, "min_lon": -84.94188601245766, "max_lon": -80.19472014894832 },
  { "zone": 9, "min_lat": 42.28869448127343, "max_lat": 45.249972817634614, "min_lon": -83.58465909579283, "max_lon": -76.00206681739746 },
  { "zone": 10, "min_lat": 42.21144616349253, "max_lat": 45.32625956970323, "min_lon": -84.43409415547702, "max_lon": -76.51967904575265 },
  { "zone": 11, "min_lat": 42.26163607296828, "max_lat": 47.33088194783845, "min_lon": -83.96885550896561, "max_lon": -74.32395279708651 },
  { "zone": 12, "min_lat": 42.30937892743851, "max_lat": 49.41600382644567, "min_lon": -80.33208542827806, "max_lon": -73.38516766001772 },
  { "zone": 13, "min_lat": 45.50621278441743, "max_lat": 47.81364736607231, "min_lon": -83.46463332277542, "max_lon": -82.05579002441612 },
  { "zone": 14, "min_lat": 43.31196927148781, "max_lat": 45.098045125020797, "min_lon": -80.67175334307172, "max_lon": -79.06324675285037 },
  { "zone": 15, "min_lat": 43.08772834567728, "max_lat": 45.69900593016838, "min_lon": -81.40840860057358, "max_lon": -75.5723875636681 },
  { "zone": 16, "min_lat": 42.36037368072524, "max_lat": 43.94890278501026, "min_lon": -80.52084954334522, "max_lon": -78.22722227112906 },
  { "zone": 17, "min_lat": 44.2498511767699, "max_lat": 45.650640899932605, "min_lon": -79.42543864501225, "max_lon": -78.20161603597269 },
  { "zone": 18, "min_lat": 44.12182968259789, "max_lat": 44.74913215984673, "min_lon": -79.81759710853202, "max_lon": -79.06026283129086 },
  { "zone": 19, "min_lat": 41.676563675929096, "max_lat": 43.079529697505656, "min_lon": -83.14970081839881, "max_lon": -78.90594796781669 },
  { "zone": 20, "min_lat": 43.07721799706185, "max_lat": 45.20547247307458, "min_lon": -79.89062851292569, "max_lon": -74.31965056122245 }
];



function getZone(lat, lon) {
  for (const z of ZONES) {
    if (
      lat >= z.min_lat && lat <= z.max_lat &&
      lon >= z.min_lon && lon <= z.max_lon
    ) {
      return z.zone;
    }
  }
  return null;
}

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [currentZone, setCurrentZone] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setIsLoadingLocation(true);
        setLocationError(null);
        
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to determine your fishing zone.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setLocationError('Location permission denied');
            setIsLoadingLocation(false);
            return;
          }
        }

        Geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const userLocation = { latitude: latitude, longitude: longitude };
            const zone = getZone(latitude, longitude);
            
            console.log('Setting location:', userLocation, 'Zone:', zone);
            setLocation(userLocation);
            setCurrentZone(zone);
            setIsLoadingLocation(false);
            
            console.log('Location updated:', userLocation, 'Zone:', zone);
          },
          (error) => {
            console.warn('Location error:', error);
            setLocationError('Unable to get location');
            setIsLoadingLocation(false);
            
            // Show user-friendly error message
            switch (error.code) {
              case 1:
                Alert.alert('Location Access Denied', 'Please enable location access to determine your fishing zone.');
                break;
              case 2:
                Alert.alert('Location Unavailable', 'Unable to determine your location. Please check your GPS settings.');
                break;
              case 3:
                Alert.alert('Location Timeout', 'Location request timed out. Please try again.');
                break;
              default:
                Alert.alert('Location Error', 'An error occurred while getting your location.');
            }
          },
          { 
            enableHighAccuracy: true, 
            timeout: 15000, 
            maximumAge: 10000 
          }
        );
      } catch (error) {
        console.error('Error in getLocation:', error);
        setLocationError('Location service error');
        setIsLoadingLocation(false);
      }
    };

    getLocation();
  }, []);

  const getZoneDisplayText = () => {
    if (isLoadingLocation) {
      return "Locating...";
    }
    
    if (locationError) {
      return "Location unavailable";
    }
    
    if (currentZone) {
      return `You're in Zone ${currentZone}`;
    }
    
    // This will show when location is found but user is not in a defined zone
    if (location) {
      return "Outside defined zones";
    }
    
    return "Zone not found";
  };

  const retryLocation = async () => {
    try {
      setIsLoadingLocation(true);
      setLocationError(null);
      setMapError(null);
      
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setLocationError('Location permission denied');
          setIsLoadingLocation(false);
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const userLocation = { latitude: latitude, longitude: longitude };
          const zone = getZone(latitude, longitude);
          
          console.log('Retry - Setting location:', userLocation, 'Zone:', zone);
          setLocation(userLocation);
          setCurrentZone(zone);
          setIsLoadingLocation(false);
        },
        (error) => {
          setLocationError('Unable to get location');
          setIsLoadingLocation(false);
        },
        { 
          enableHighAccuracy: true, 
          timeout: 15000, 
          maximumAge: 10000 
        }
      );
    } catch (error) {
      setLocationError('Location service error');
      setIsLoadingLocation(false);
    }
  };

  // Generate HTML for Google Maps with better error handling
  const getMapHTML = () => {
    if (!location) return '';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body, #map {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          .error-message {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #4a90a4;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <div id="error" class="error-message" style="display: none;">
          Map failed to load
        </div>
        <script>
          function initMap() {
            try {
              const location = { lat: ${location.latitude}, lng: ${location.longitude} };
              const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: location,
                mapTypeId: 'hybrid'
              });
              
              const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: "${currentZone ? `Zone ${currentZone}` : 'Your Location'}"
              });
              
              const infoWindow = new google.maps.InfoWindow({
                content: "${currentZone ? `You are in fishing zone ${currentZone}` : 'Outside defined fishing zones'}"
              });
              
              marker.addListener('click', () => {
                infoWindow.open(map, marker);
              });
              
              console.log('Map initialized successfully');
            } catch (error) {
              console.error('Map initialization error:', error);
              document.getElementById('map').style.display = 'none';
              document.getElementById('error').style.display = 'flex';
            }
          }
          
          function handleMapError() {
            console.error('Google Maps failed to load');
            document.getElementById('map').style.display = 'none';
            document.getElementById('error').style.display = 'flex';
          }
          
          window.gm_authFailure = handleMapError;
        </script>
        <script async defer 
          src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&onerror=handleMapError">
        </script>
      </body>
      </html>
    `;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />

        <Text style={globalStyles.h2}>
          {getZoneDisplayText()}
        </Text>
        
        <View style={styles.map}>
          {(() => {
            // Debug logging
            console.log('Render check:', { 
              hasLocation: !!location, 
              hasError: !!locationError, 
              isLoading: isLoadingLocation,
              location: location,
              currentZone: currentZone
            });
            
            // Show map if we have location, regardless of zone
            if (location && !isLoadingLocation && !locationError) {
              return (
                <WebView
                  style={{ flex: 1, borderRadius: 16 }}
                  source={{ html: getMapHTML() }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                  scalesPageToFit={true}
                  mixedContentMode="compatibility"
                  onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                    setMapError('Map failed to load');
                  }}
                  onHttpError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView HTTP error: ', nativeEvent);
                    setMapError('Map failed to load');
                  }}
                  onLoadEnd={() => {
                    console.log('WebView loaded successfully');
                  }}
                />
              );
            }
            
            // Show placeholder for all other cases
            return (
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>
                  {isLoadingLocation ? "Loading map..." : 
                   locationError ? "Map unavailable" : 
                   mapError ? "Map failed to load" :
                   "Waiting for location..."}
                </Text>
                {(locationError || mapError) && (
                  <ButtonXL 
                    title="Retry Location" 
                    onPress={retryLocation}
                    style={styles.retryButton}
                  />
                )}
              </View>
            );
          })()}
        </View>

        <View style={styles.hugContainer}>
          <View style={styles.buttonRow}>
            <ButtonXL title="Scan catch" onPress={() => navigation.navigate('Scan')}/>
            <ButtonXL title="View FishDex" onPress={() => navigation.navigate('Dex')}/>
          </View>
          <View style={styles.buttonRow}>
            <ButtonXL title="Track Stats"/>
            <ButtonXL title="Check Zone" onPress={() => navigation.navigate('Map')}/>
          </View>
        </View>

        <View style={globalStyles.container}>
          <Text style={globalStyles.h2}>
            Recent Catches
          </Text>
          <ScrollView 
            horizontal={true}
            contentContainerStyle={styles.cardRow}>
            <FishCard />
            <FishCard />
            <FishCard />
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.navContainer}>
        <NavBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999999,
  },
  cardRow: {
    flexDirection: 'row',
    overflow: 'visible',
    gap: spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: spacing.md,
  },
  hugContainer: {
    alignSelf: 'flex-start',
    flexShrink: 1,
    flexGrow: 0,
    gap: spacing.md,
  },
  map: {
    height: 175,
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryAccent.teal,
    borderWidth: 1,
    borderColor: colors.secondaryAccent.teal,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  mapPlaceholderText: {
    ...globalStyles.textBody,
    color: colors.neutral.white,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary.blue,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
});

export default HomeScreen;