import { useState } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Snackbar } from 'react-native-paper';
import WeatherCard from '../components/WeatherCard';

export default function FavoritesScreen({ favorites, onRemoveFavorite }) {
  const hasFavorites = favorites && favorites.length > 0;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRemoveFavorite = (favorite) => {
    onRemoveFavorite(favorite.id);
    setSnackbarMessage(`${favorite.name} removed from favorites`);
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.Content
          title="Favorites"
          style={styles.appbarContent}
        />
      </Appbar.Header>

      {hasFavorites && (
        <ScrollView>
          {favorites.map((fav) => (
            <WeatherCard
              key={fav.id}
              weather={fav}
              onRemoveFavorite={() => handleRemoveFavorite(fav)}
            />
          ))}
        </ScrollView>
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
});
