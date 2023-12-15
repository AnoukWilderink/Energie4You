import { StyleSheet } from "react-native";

export const btnStyles = StyleSheet.create({
    btn: {
        backgroundColor: "#D3F26A",
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 100,
        width: "100%",
    },
    btnRound: {
        backgroundColor: "#D3F26A",
        borderRadius: 100,
        width: 65,
        height: 65,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        fontSize: 20,
        color: "#25282B",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});
