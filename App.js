import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TextInput,
    Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native";

export default function App() {
    const [category, setCategory] = useState("US Dollar");

    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
        useState();
    const [photo, setPhoto] = useState();

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

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>;
    } else if (!hasCameraPermission) {
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

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

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
                            // flex: 1,
                        }}
                    >
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                            source={{
                                uri: "data:image/jpg;base64," + photo.base64,
                            }}
                        />
                    </View>

                    {/* Foto opslaan op apparaat NIET VEREIST */}
                    {/* {hasMediaLibraryPermission ? (
                    <Pressable style={styles.btn} onPress={savePhoto}>
                        <Text style={styles.btnText}>Opslaan op apparaat</Text>
                    </Pressable>
                ) : undefined} */}
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
                                textAlignVertical: "top",
                            },
                        ]}
                        secureTextEntry={true}
                        placeholder="Omschrijving"
                    />
                    <Text style={styles.green}>Monteur</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Monteur"
                    />
                    <Text style={styles.green}>Locatie</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Location"
                    />
                    {/* Only shares picture */}
                    <Pressable style={styles.btn} onPress={sharePic}>
                        <Text style={styles.btnText}>Delen</Text>
                    </Pressable>
                </SafeAreaView>
            </ScrollView>
        );
    }

    // Make picture screen
    return (
        <SafeAreaView style={styles.containerCamera}>
            {/* <Text
                style={[
                    styles.green,
                    { fontSize: 32, textAlign: "center", paddingBottom: 30 },
                ]}
            >
                Energie4You
            </Text> */}
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

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: "#011302",
    //     alignItems: "start",
    //     justifyContent: "start",
    // },

    containerCamera: {
        flex: 1,
        color: "#D3F26A",
        backgroundColor: "#011302",
        position: "relative",
        // alignItems: "center",
        // justifyContent: "center",
    },

    container: {
        flex: 1,
        color: "#D3F26A",
        backgroundColor: "#011302",
        alignItems: "start",
        justifyContent: "start",
        padding: 75,
        paddingLeft: 30,
        paddingRight: 30,
        gap: 10,
        position: "relative",
    },

    camera: {
        flex: 1,
        width: "100%",
        height: "100%",
    },

    green: {
        color: "#D3F26A",
        fontSize: 20,
    },
    input: {
        fontSize: 18,
        backgroundColor: "white",
        width: "100",
        color: "#808080",
        borderRadius: 3,
        paddingLeft: 10,
        padding: 3,
    },
    btn: {
        backgroundColor: "#D3F26A",
        borderRadius: 3,
        padding: 15,
        paddingTop: 7,
        paddingBottom: 7,
    },
    btnRound: {
        backgroundColor: "#D3F26A",
        borderRadius: 100,
        width: 70,
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        fontSize: 20,
        color: "#25282B",
        textAlign: "center",
    },
});
