import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";


const { height, width } = Dimensions.get("screen")

const setWidth = (w) => (width / 100) * w;


const GenreCard = ({ genereName, active, onPress }) => {

    var bgColor = active ? Colors.ACTIVE : Colors.WHITE
    var txtColor = active ? Colors.WHITE : Colors.ACTIVE

    return (
        <TouchableOpacity
            onPress={() => onPress(genereName)}
            style={
                {
                    ...styles.container,
                    backgroundColor: bgColor,
                }
            } activeOpacity={0.5}>
            <Text style={{ ...styles.genereText, color: txtColor }}>{genereName}</Text>

        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        elevation: 3,
        marginVertical: 10,
        width: setWidth(25),
        height: 30,
    },
    genereText: {
        fontSize: 13,
    }
},);



export default GenreCard;