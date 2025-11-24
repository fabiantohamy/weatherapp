import { Card, Text, Button } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import WeatherDetails from "./WeatherDetails";

export default function WeatherCard({ weather, onAddFavorite, onRemoveFavorite }) {
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const tempMin = Math.round(weather.main.temp_min);
  const tempMax = Math.round(weather.main.temp_max);
  const windSpeed = weather.wind?.speed;
  const humidity = weather.main.humidity;
  const pressure = weather.main.pressure;

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const description = weather.weather[0].description;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.city}>{weather.name}</Text>
        <Text style={styles.condition}>{description}</Text>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: iconUrl }}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <WeatherDetails
          temp={temp}
          feelsLike={feelsLike}
          tempMin={tempMin}
          tempMax={tempMax}
          windSpeed={windSpeed}
          humidity={humidity}
          pressure={pressure}
          description={description}
        />
      </Card.Content>
      {(onAddFavorite || onRemoveFavorite) && (
        <Card.Actions style={styles.actions}>
          {onAddFavorite && (
            <Button
              mode="contained"
              icon="star-outline"
              onPress={() => onAddFavorite(weather)}
            >
              Add to favorites
            </Button>
          )}
          {onRemoveFavorite && (
            <Button
              mode="contained-tonal"
              icon="delete"
              onPress={() => onRemoveFavorite(weather)}
            >
              Remove
            </Button>
          )}
        </Card.Actions>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  condition: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 70,
    height: 70,
  },
  actions: {
    justifyContent: "center",
    paddingBottom: 8,
  },
});
