import { useState } from "react";
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { fetchWeather } from "../api";

export default function HomeScreen() {
  const [keyword, setKeyword] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    Keyboard.dismiss();
    setLoading(true);
    fetchWeather(keyword)
      .then(data => {
        setWeather(data);
        setKeyword('');
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.Content
          title="Weather Forecast"
          style={styles.appbarContent}
        />
      </Appbar.Header>
      <View style={styles.searchRow}>
        <TextInput
          label="Search city"
          mode="outlined"
          style={styles.searchInput}
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />
        <Button
          mode="contained"
          icon="search-web"
          style={styles.searchButton}
          loading={loading}
          onPress={handleFetch}
        >
          Search
        </Button>
      </View>
      {weather && (
      <View style={styles.result}>
        <Text>{weather.name}</Text>
        <Text>{Math.round(weather.main.temp)} °C</Text>
        <Text>{weather.weather[0].description}</Text>
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appbarContent: {
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  searchButton: {
  },
  result: {
  marginTop: 24,
  paddingHorizontal: 16,
  },
});
