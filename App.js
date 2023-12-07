import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
    Image,
    Pressable,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import * as MailComposer from "expo-mail-composer";
import * as Location from "expo-location";
import { ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { styles } from './styles';

export default function App() {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
        useState();
    const [photo, setPhoto] = useState();

    const [isAvailable, setIsAvailable] = useState(false);

    const [category, setCategory] = useState("Grondkabels");
    const [description, setDescription] = useState("");
    const [engineer, setEngineer] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        (async () => {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission =
                await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(
                mediaLibraryPermission.status === "granted"
            );
        })();
    }, []);

    // Move the email composer availability check outside of the conditional rendering
    useEffect(() => {
        async function checkAvailability() {
            const isMailAvailable = await MailComposer.isAvailableAsync();
            setIsAvailable(isMailAvailable);
        }

        checkAvailability();
    }, []);

    if (
        hasCameraPermission === undefined ||
        hasMediaLibraryPermission === undefined
    ) {
        return <Text>Requesting permissions...</Text>;
    } else if (!hasCameraPermission || !hasMediaLibraryPermission) {
        return (
            <Text>
                Permission for the camera not granted. Please change this in
                settings.
            </Text>
        );
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false,
        };

        // Get device's current location
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            // Use reverse geocoding to get the city name
            let reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            // Extract the city name from the response
            const cityName = reverseGeocode[0]?.city || "Unknown City";

            setLocation(cityName);
        } catch (error) {
            console.error("Error getting location:", error);
        }

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    const sendMail = async () => {
        const emailBody = `Categorie: ${category}\nOmschrijving: ${description}\n Monteur: ${engineer}\nLocatie: ${location}`;

        MailComposer.composeAsync({
            body: emailBody,
        });
    };

    if (photo) {
        return (
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <Text
                        style={[
                            styles.green,
                            {
                                fontSize: 32,
                                textAlign: "center",
                                paddingBottom: 30,
                            },
                        ]}
                    >
                        Energie4You
                    </Text>
                    <View
                        style={{
                            width: "100%",
                            height: 250,
                            objectFit: "cover",
                            borderRadius: 3,
                        }}
                    >
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={{
                                uri: "data:image/jpg;base64," + photo.base64,
                            }}
                        />
                    </View>

                    <Pressable
                        style={styles.btn}
                        onPress={() => setPhoto(undefined)}
                    >
                        <Text style={styles.btnText}>Opnieuw maken</Text>
                    </Pressable>

                    <Text style={styles.green}>Categorie</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={category}
                        onValueChange={(currentCategory) =>
                            setCategory(currentCategory)
                        }
                    >
                        <Picker.Item label="Grondkabels" value="grondkabels" />
                        <Picker.Item
                            label="Hoogspanningsmasten"
                            value="hoogspanningsmasten"
                        />
                        <Picker.Item label="Luchtkabels" value="luchtkabels" />
                        <Picker.Item
                            label="Schakelkasten"
                            value="schakelkasten"
                        />
                    </Picker>
                    <Text style={styles.green}>Omschrijving</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                height: 100,
                                textAlign: "left",
                                verticalAlign: "top",
                            },
                        ]}
                        secureTextEntry={false}
                        placeholder="Omschrijving"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Text style={styles.green}>Monteur</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={false}
                        placeholder="Monteur"
                        value={engineer}
                        onChangeText={setEngineer}
                    />
                    <Text style={styles.green}>Locatie</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={false}
                        placeholder="Location"
                        value={location}
                        onChangeText={setLocation}
                    />

                    {isAvailable ? (
                        <Pressable
                            style={({ pressed }) => [
                                styles.btn,
                                pressed && styles.btnPressed,
                            ]}
                            onPress={sendMail}
                        >
                            <Text style={styles.btnText}>Send Mail</Text>
                        </Pressable>
                    ) : (
                        <Text>Email not available</Text>
                    )}
                </SafeAreaView>
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={styles.containerCamera}>
            <Camera style={styles.camera} ref={cameraRef} />
            <Pressable
                style={[
                    styles.btnRound,
                    {
                        position: "absolute",
                        bottom: 50,
                        left: "50%",
                        transform: [{ translateX: -35 }],
                    },
                ]}
                onPress={takePic}
            >
                <Text style={styles.btnText}>click</Text>
            </Pressable>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

