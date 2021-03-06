import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

const backgroundImages = [
  require('./src/assets/bg1.jpg'),
  require('./src/assets/bg2.jpg'),
  require('./src/assets/bg3.jpg'),
  require('./src/assets/bg4.jpg')
];
const randomBackground = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

const App = () => {
  const _apiKey = "e4041ddb2ea5e59b90cbcaabee8e4436";
  const [isLoading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [data, setData] = useState({});

  const getWeather = () => {
    if (location && location.trim() != '') {
      setLoading(true)
      return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${(location.trim())}&units=metric&appid=${_apiKey}`)
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
        source={randomBackground}>
        <View style={styles.container}>
          <Text style={[styles.title, styles.textShadow, { letterSpacing: 2 }]}>
            Weather
          </Text>

          {/* input */}
          <View style={styles.inputContainer}>
            <TextInput value={location} onChangeText={val => setLocation(val)}
              placeholder="Location"
              style={styles.input}
              placeholderTextColor="white" />
            <TouchableHighlight disabled={!location && location.trim() != ''} onPress={() => getWeather()} style={{ backgroundColor: 'rgba(0,0,0,0.5)', marginBottom: 5, borderRadius: 5, width: 40, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#FFF', fontSize: 14 }}>GET</Text>
            </TouchableHighlight>
          </View>

          {/* loading */}
          {isLoading && <ActivityIndicator color="#fff" size={32} />}

          {/* error message */}
          {(!isLoading && data && data.message) ? (
            <View>
              <Text style={{ fontSize: 14, color: 'red', backgroundColor: 'rgba(0,0,0,0.8)', padding: 10, textAlign: 'center' }}>Error! Please try again later.</Text>
            </View>
          ) : null}

          {/* get weather data */}
          {!isLoading && data && (
            <View>
              {/* location */}
              <Text style={[styles.title, styles.textShadow, { fontSize: 30, letterSpacing: 2 }]}>
                {data.name}{`${data.sys?.country ? ', ' + data.sys.country : ''}`}
              </Text>

              {/* degree */}
              {
                data.main?.temp &&
                <Text style={[styles.title, styles.textShadow, { fontSize: 27, }]}>{Math.round(data.main.temp)}??C</Text>
              }

              {/* description */}
              {
                data.weather && data.weather[0].description &&
                <Text style={[styles.title, styles.textShadow, { fontSize: 24, }]}>{data.weather[0].description}</Text>
              }

              {/* sub description */}
              {
                data.main?.temp_min && data.main?.temp_max &&
                <Text style={[styles.title, styles.textShadow, { fontSize: 21, }]}>{Math.round(data.main.temp_min)}??C / {Math.round(data.main.temp_max)}??C</Text>
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
  inputContainer: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    height: 40
  },
  input: {
    color: '#fff',
    fontSize: 14,
    flex: 1
  },

  //text shadow
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowRadius: 5
  }
});

export default App;
