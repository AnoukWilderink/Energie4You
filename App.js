import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./pages/WelcomeScreen";
import MainScreen from "./MainScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomeScreen">
                <Stack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{ title: "Terug", headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
