import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function WeatherDetails({
  temp,
  feelsLike,
  tempMin,
  tempMax,
  windSpeed,
  humidity,
  pressure,
  description,
}) {
  
  return (
    <View style={styles.row}>
      <View style={styles.column}>
        <LabelValue label="Wind" value={windSpeed != null ? `${windSpeed} m/s` : "-"} />
        <LabelValue label="Temperature" value={temp != null ? `${temp} °C` : "-"} />
        <LabelValue label="Pressure" value={pressure != null ? `${pressure} hPa` : "-"} />
        <LabelValue label="Humidity" value={humidity != null ? `${humidity} %` : "-"} />
      </View>
      <View style={styles.column}>
        <LabelValue label="Feels Like" value={feelsLike != null ? `${feelsLike} °C` : "-"} />
        <LabelValue label="Min Temperature" value={tempMin != null ? `${tempMin} °C` : "-"} />
        <LabelValue label="Max Temperature" value={tempMax != null ? `${tempMax} °C` : "-"} />
        <LabelValue label="Description" value={description != null ? description : "-"} />
      </View>
    </View>
  );
}

function LabelValue({ label, value }) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  column: {
    flex: 1,
  },
  item: {
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
  },
  value: {
    fontSize: 14,
  },
});
