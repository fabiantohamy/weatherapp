import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (weather) => {
    if (!weather) return;
  
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === weather.id)) {
        return prev;
      }
      return [...prev, weather];
    });
  };
  
  const handleRemoveFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
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

