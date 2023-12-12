import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerCamera: {
        flex: 1,
        color: "#D3F26A",
        position: "relative",
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
        width: "100%",
        height: "100%",
        objectFit: "cover",
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
});
