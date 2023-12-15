import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
    Text,
    TextInput,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as MailComposer from "expo-mail-composer";
import * as Location from "expo-location";

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

//styles
import { styles } from "./styles/styles";
import { btnStyles } from "./styles/btnStyles";

const MainScreen = () => {
    const cameraRef = useRef();
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

    useEffect(() => {
        async function checkAvailability() {
            const isMailAvailable = await MailComposer.isAvailableAsync();
            setIsAvailable(isMailAvailable);
        }

        checkAvailability();
    }, []);

    const takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false,
        };

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }

            let deviceLocation = await Location.getCurrentPositionAsync({});
            let reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: deviceLocation.coords.latitude,
                longitude: deviceLocation.coords.longitude,
            });
            const cityName = reverseGeocode[0]?.city || "Unknown City";
            setLocation(cityName);
        } catch (error) {
            console.error("Error getting location:", error);
        }

        let newPhoto = await cameraRef.current.takePictureAsync(options);

        try {
            const asset = await MediaLibrary.createAssetAsync(newPhoto.uri);
            if (asset) {
                alert("Afbeelding opgeslagen in gallerij");
            } else {
                alert("Mislukt om afbeelding op te slaan in gallerij");
            }
        } catch (error) {
            console.error("Error saving image to media library:", error);
        }

        setPhoto(newPhoto);
    };

    const sendMail = async () => {
        const emailBody = `Categorie: ${category}\nBeschrijving: ${description}\n Monteur: ${engineer}\nLocatie: ${location}`;

        MailComposer.composeAsync({
            body: emailBody,
        });
    };

    if (photo) {
        return (
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{
                                resizeMode: "contain",
                                width: "100%",
                                height: "auto",
                                marginBottom: 10,
                            }}
                            source={require("./assets/logo.png")}
                        />
                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: 250,
                            objectFit: "cover",
                            position: "relative",
                            marginBottom: 30,
                        }}
                    >
                        <Image
                            style={{
                                borderRadius: 10,
                                width: "100%",
                                height: "100%",
                            }}
                            source={{
                                uri: "data:image/jpg;base64," + photo.base64,
                            }}
                        />

                        <TouchableOpacity
                            style={[
                                btnStyles.btnRound,
                                {
                                    position: "absolute",
                                    bottom: -30,
                                    right: -10,
                                    transform: [{ translateX: -35 }],
                                },
                            ]}
                            activeOpacity={0.9}
                            onPress={() => setPhoto(undefined)}
                        >
                            <MaterialCommunityIcons
                                style={[
                                    {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                ]}
                                name="camera"
                                size={42}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.textGreen}>Categorie</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.input}
                            selectedValue={category}
                            onValueChange={(currentCategory) =>
                                setCategory(currentCategory)
                            }
                        >
                            <Picker.Item
                                label="Grondkabels"
                                value="grondkabels"
                            />
                            <Picker.Item
                                label="Hoogspanningsmasten"
                                value="hoogspanningsmasten"
                            />
                            <Picker.Item
                                label="Luchtkabels"
                                value="luchtkabels"
                            />
                            <Picker.Item
                                label="Schakelkasten"
                                value="schakelkasten"
                            />
                        </Picker>
                    </View>
                    <Text style={styles.textGreen}>Beschrijving</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                height: 100,
                                textAlign: "left",
                                ...(Platform.OS === "android"
                                    ? { textAlignVertical: "top" }
                                    : { paddingTop: 8 }),
                            },
                        ]}
                        multiline={true}
                        secureTextEntry={false}
                        placeholder="Beschrijving"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Text style={styles.textGreen}>Monteur</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={false}
                        placeholder="Monteur"
                        value={engineer}
                        onChangeText={setEngineer}
                    />
                    <Text style={styles.textGreen}>Locatie</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={false}
                        placeholder="Location"
                        value={location}
                        onChangeText={setLocation}
                    />

                    {isAvailable ? (
                        <TouchableOpacity
                            style={[
                                btnStyles.btn,
                                {
                                    marginTop: 30,
                                },
                            ]}
                            activeOpacity={0.9}
                            onPress={sendMail}
                        >
                            <Text style={btnStyles.btnText}>
                                Verzenden via mail
                            </Text>
                        </TouchableOpacity>
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
            <TouchableOpacity
                style={[
                    btnStyles.btnRound,
                    {
                        position: "absolute",
                        bottom: 50,
                        left: "50%",
                        transform: [{ translateX: -35 }],
                    },
                ]}
                activeOpacity={0.9}
                onPress={takePic}
            >
                <MaterialCommunityIcons
                    style={styles.icon}
                    name="camera"
                    size={42}
                    color="black"
                />
            </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

export default MainScreen;
