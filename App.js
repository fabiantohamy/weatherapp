import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import { fetchFavoritesFromDb, addFavoriteToDb, removeFavoriteFromDb } from "./services/favoritesService";

const Tab = createBottomTabNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const dbFavorites = await fetchFavoritesFromDb();
        setFavorites(dbFavorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  const handleAddFavorite = async (weather) => {
    if (!weather) return;
    try {
      await addFavoriteToDb(weather);
  
      setFavorites((prev) => {
        if (prev.some((fav) => String(fav.id) === String(weather.id))) {
          return prev;
        }
        return [...prev, weather];
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };  
  
  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavoriteFromDb(id);

      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Favorites') {
                iconName = 'star';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6C4AB6',
            tabBarInactiveTintColor: '#B39DDB',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home">
            {() => (
              <HomeScreen
                onAddFavorite={handleAddFavorite}
              />
            )}
          </Tab.Screen> 
          <Tab.Screen name="Favorites">
            {() => (
              <FavoritesScreen
                favorites={favorites}
                onRemoveFavorite={handleRemoveFavorite}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

