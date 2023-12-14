import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Pressable,
    SafeAreaView,
} from "react-native";
import { btnStyles } from "../btnStyles";

const WelcomeScreen = ({ navigation }) => {
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const handleButtonRelease = () => {
        setIsButtonPressed(false);
    };

    const handleButtonPress = () => {
        setIsButtonPressed(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.img}
                    source={require("../assets/logo.png")}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.text}>
                    Ga direct aan de slag om het gevonden defect vast te leggen
                </Text>
                <Pressable
                    style={({ pressed }) => [
                        btnStyles.btn,
                        {
                            backgroundColor: pressed
                                ? "#a9c255" // Darker green when pressed
                                : btnStyles.btnRound.backgroundColor,
                        },
                    ]}
                    onPressIn={handleButtonPress}
                    onPressOut={handleButtonRelease}
                    onPress={() => navigation.navigate("MainScreen")}
                >
                    <Text style={btnStyles.btnText}>Defect melden</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#011302",
        padding: 30,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: "100%",
        resizeMode: "contain",
    },
    bottomContainer: {
        justifyContent: "flex-end",
    },
    text: {
        color: "#ffffff",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
});

export default WelcomeScreen;
