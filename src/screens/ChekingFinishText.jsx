import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { THEME } from "../THEME";

export const ChekingFinishText = (props) => {
  return (
    <View style = {styles.messageBox}
    >
      <Text style={{ color: THEME.header_color }}>Поверка текста - </Text>
      <Text style={{ backgroundColor: THEME.bg_color }}>
        {props.decodingText}
      </Text>
    </View>
  );
};
const styles =  StyleSheet.create({
    messageBox:{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        borderRadius: 8,
        width: "80%",
        marginVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: THEME.bg_color,
        flexDirection: "column",
        alignItems: "flex-start",
  }})