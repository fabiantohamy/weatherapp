import { useState } from "react";
import { StyleSheet, View, Keyboard } from 'react-native';
import { Appbar, TextInput, Button, Snackbar } from 'react-native-paper';
import { fetchWeather } from "../api";
import WeatherCard from "../components/WeatherCard";

export default function HomeScreen({ onAddFavorite }) {
  const [keyword, setKeyword] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const handleAddFavorite = (weatherData) => {
    onAddFavorite(weatherData);
    setSnackbarMessage(`${weatherData.name} added to favorites`);
    setSnackbarVisible(true);
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
          loading={loading}
          onPress={handleFetch}
        >
          Search
        </Button>
      </View>
      {weather && (
        <WeatherCard
          weather={weather}
          onAddFavorite={handleAddFavorite}
        />
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
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
});
