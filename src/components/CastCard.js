import React from "react";
import { View, StyleSheet, Text, Image } from "react-native"
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import { getPoster } from "../services/MovieService";

const Castcard = ({ originalName, image, characterName }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image ? { uri: getPoster(image) } : Images.NOIMAGE} resizeMode="cover" />
            <Text style={styles.originalName} >{originalName}</Text>
            <Text style={styles.characterName} >{characterName}</Text>
        </View>
    );
}



const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        image: {
            height: 120,
            width: 80,
            borderRadius: 10,
        },
        originalName: {
            width: 80,
            color: Colors.BLACK,
            fontWeight: "bold",
        },
        characterName: {
            width: 80,
            color: Colors.LIGHT_GREY,
            fontWeight: "bold",
            fontSize: 10,

        }
    }
)



export default Castcard;




