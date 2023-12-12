import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
    Text,
    TextInput,
    View,
    SafeAreaView,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as MailComposer from "expo-mail-composer";
import * as Location from "expo-location";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { styles } from "./styles";
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
