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
        padding: 30,
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
        marginTop:10,
    },
    input: {
        fontSize: 18,
        backgroundColor: "white",
        width: "100",
        height: 50,
        color: "#000",
        borderRadius: 5,
        paddingLeft: 10,
        padding: 3,

    },
    
    pickerContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 10, // Adjust as needed
        overflow: "hidden", // Clip the inner Picker to the rounded borders
    },

});
