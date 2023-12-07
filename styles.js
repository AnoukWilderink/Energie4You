import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: "#011302",
    //     alignItems: "start",
    //     justifyContent: "start",
    // },

    containerCamera: {
        flex: 1,
        color: "#D3F26A",
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
