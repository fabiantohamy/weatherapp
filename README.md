## Used technologies

**React Native & Expo**  
The application is built with React Native and runs in the Expo environment.

**React Native Paper**  
The user interface uses the React Native Paper library, which provides ready-made Material Design components (e.g. cards, buttons and AppBar headers).

**React Navigation**  
Navigation between the different screens (Home, Favorites) is implemented with the React Navigation library and a bottom tab navigator.

**OpenWeatherMap API**  
Weather data is fetched from the OpenWeatherMap REST API. The user enters a city name in the search field, and the response is displayed in a `WeatherCard` component with key weather details.

**Firebase**  
Favorite cities are stored in Firebase so that the user’s favorites are persisted between app sessions.

**Environment variables (.env)**  
To run the app, you need an OpenWeatherMap API key.

1. Create a `.env` file in the project root.  
2. Add your OpenWeatherMap API key: `EXPO_PUBLIC_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE`  
3. Start the app: `npx expo start`
