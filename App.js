import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const backgroundImages = [
  'https://i.pinimg.com/originals/85/ce/21/85ce211c6af636a911dfd0cf52b79d32.jpg',
  'https://i.pinimg.com/originals/70/97/83/70978302c570899f850da76272a6451f.jpg',
  'https://wallpaperaccess.com/full/1097513.jpg',
  'http://ayay.co.uk/mobiles/weather/strange/northern-lights.jpg'
]
const randomBackground = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  const _apiKey = "e4041ddb2ea5e59b90cbcaabee8e4436";
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState('istanbul');
  const [data, setData] = useState({});

  useEffect(() => {
    getWeather()
  }, [location])

  const getWeather = () => {
    if (location && location.trim() != '') {
      console.log("start.....")
      return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${_apiKey}`)
        .then(resp => resp.json())
        .then(json => setData(json))
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={{ uri: randomBackground }}>
        <View style={styles.container}>
          <Text style={[styles.title, styles.textShadow, { letterSpacing: 2 }]}>
            Weather
          </Text>

          {/* input */}
          <TextInput value={location} onChangeText={val => setLocation(val)}
            placeholder="Location"
            style={styles.input}
            placeholderTextColor="white" />

          {isLoading && <ActivityIndicator color="#fff" size={32} />}

          {(!isLoading && data && data.message) ? (
            <View>
              <Text style={{ fontSize: 14, color: 'red', backgroundColor: 'rgba(0,0,0,0.8)', padding: 10, textAlign: 'center' }}>Error! Please try again later.</Text>
            </View>
          ) : null}

          {!isLoading && data && (
            <View>
              {/* location */}
              <Text style={[styles.title, styles.textShadow, { fontSize: 20, letterSpacing: 2 }]}>
                {data.name} {`${data.sys?.country ? ', ' + data.sys.country : ''}`}
              </Text>

              {/* degree */}
              {
                data.main?.temp &&
                <Text style={[styles.title, styles.textShadow, { fontSize: 20, }]}>{Math.round(data.main.temp)}°C</Text>
              }

              {/* Description */}
              {
                data.weather && data.weather[0].description &&
                <Text style={[styles.title, styles.textShadow, { fontSize: 14, }]}>{data.weather[0].description}</Text>
              }

              {/* Sub description */}
              {
                data.main?.temp_min && data.main?.temp_max &&
                <Text style={[styles.title, styles.textShadow, { fontSize: 13, }]}>{Math.round(data.main.temp_min)}°C / {Math.round(data.main.temp_max)}°C</Text>
              }
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  title: {
    fontSize: 25,
    paddingVertical: 5,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  //input
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: '#fff',
    fontSize: 14,
    marginBottom: 10
  },

  //text shadow
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowRadius: 5
  }
});

export default App;
