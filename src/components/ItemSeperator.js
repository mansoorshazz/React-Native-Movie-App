import { View } from "react-native";
import React from "react";



const ItemSeperator = ({ height, width }) => {


    return (
        <View style={{ height, width }} />
    );

}



ItemSeperator.defaultProps = {
    height: 0,
    width: 0,
}




export default ItemSeperator;