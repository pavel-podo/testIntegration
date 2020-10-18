import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const MessageBox = (props) => {
    console.log(props)
  return (
    <View style={styles.messageBoxWrapper}>
      <View style={{ ...styles.messageBox, backgroundColor: props.bgColor }}>
        <Text style={{ color: props.textColor }}>{props.text}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  messageBoxWrapper: {
      alignItems:"center",
    width: "100%",
    top: 50,
    position: "absolute",
    zIndex: 200,
  },
  messageBox: {
    padding: 10,
    borderRadius: 8,
    
  },
});
