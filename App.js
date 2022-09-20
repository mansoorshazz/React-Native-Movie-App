import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HOmeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

const Stack = createStackNavigator()

export default () => {

  // const [fontLoaded] = useFonts({
  //   Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
  //   Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
  //   Light: require("./assets/fonts/NunitoSans-Light.ttf")
  // });

  // console.warn(fontLoaded);

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='home' component={HOmeScreen} options={{ headerShown: false }} />

        <Stack.Screen name='movie' component={MovieScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

