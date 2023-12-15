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
        padding: "8%",
        gap: 10,
        position: "relative",
    },

    camera: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

    textGreen: {
        color: "#D3F26A",
        fontSize: 20,
        marginTop:10,
    },

    input: {
        fontSize: 18,
        backgroundColor: "#fff",
        width: "100%",
        height: 50,
        color: "#000",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    
    pickerContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 10, // Adjust as needed
        overflow: "hidden", // Clip the inner Picker to the rounded borders
    },

    icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

});
