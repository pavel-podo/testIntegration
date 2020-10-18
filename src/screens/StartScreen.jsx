import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { THEME } from "../THEME";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import {codeStatusEdit,
        keyEedit,
        textEdit,
        finishTextEdit,
        deEncriptTextEdit,} from "../store/actions/main";

export const StartScreen = ({ navigation }) => {
  const codeStatus = useSelector((state) => state.mainReducer.codeStatus);
  const dispatch = useDispatch();
  const goToTheCod = () => {
    dispatch( codeStatusEdit('code'))
    dispatch( keyEedit(''))
    dispatch( textEdit(''))
    dispatch( finishTextEdit(''))
    dispatch( deEncriptTextEdit(''))
    navigation.navigate('Main')
  };
  const goToTheDecod = () => {
    dispatch( codeStatusEdit('deCode'))
    dispatch( keyEedit(''))
    dispatch( textEdit(''))
    dispatch( finishTextEdit(''))
    dispatch( deEncriptTextEdit(''))
    navigation.navigate('Main')
  };
  const goToTheSettimg = () => {
    navigation.navigate('Setting')
  };
  const goToTheAbout = () => {
    navigation.navigate('About')
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.btn}
          onPress={() => goToTheCod()}>
          <View style={styles.icon}>
            <Entypo name="arrow-with-circle-right" size={24} color="white" />
          </View>
          <Text style={styles.text}>Шифровать</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => goToTheDecod()}>
          <View style={styles.icon}>
            <Entypo name="arrow-with-circle-left"  size={24} color="white" />
          </View>
          <Text style={styles.text}>Разшифровать</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => goToTheSettimg()}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="settings"  size={24} color="white" />
          </View>
          <Text style={styles.text}>Настойки</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => goToTheAbout()}>
          <View style={styles.icon}>
            <AntDesign name="exclamationcircleo" size={24}  color="white" />
          </View>
          <Text style={styles.text}>О приложении </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bg_color,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: "100%",
  },
  btn: {
    marginVertical: 8,
    marginHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: THEME.btn_color,
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    width: '81%',
    textAlign: 'center'
  },
  buttonWrapper: {
    width: "100%",
  },
  icon: {
    width: '18%',
//    backgroundColor:'red',
    alignItems: 'center',
  }
});
