import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Clipboard,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
  Share,
} from "react-native";
import { THEME } from "../THEME";
import {
  keyEedit,
  textEdit,
  finishTextEdit,
  deEncriptTextEdit,
} from "../store/actions/main";
import { MessageBox } from "./mesageBox";
import { ChekingFinishText } from './ChekingFinishText';
import { lang } from "../lang/lang";

export const MainScreen = () => {
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    bgColor: "",
    textColor: "",
    time: 5000,
  });
  const [showCodeButton, setShowCodeButton] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const dispatch = useDispatch();
  /*useEffect(()=>{
    dispatch(changeKey()
    )
  },[dispatch])
  */
  const codeStatus = useSelector((state) => state.mainReducer.codeStatus);
  const currentLang = useSelector((state) => state.mainReducer.askiiCod);
  const mainText = useSelector((state) => state.mainReducer.startText);
  const key = useSelector((state) => state.mainReducer.key);
  const decodingText = useSelector((state) => state.mainReducer.deEncriptText);
  const finishText = useSelector((state) => {
    console.log("store - ", state);
    return state.mainReducer.finishText;
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: finishText,
      });
    } catch (error) {
      console.log("share error", error);
    }
  };

  const pasteText = async () => {
    const text = await Clipboard.getString();
    dispatch(textEdit(text));
    clearInputs()
  };
  const clearAll = () =>{
    dispatch(keyEedit(''))
    dispatch(textEdit(''))
    dispatch(finishTextEdit(''))
    dispatch(deEncriptTextEdit(''))
  }
  const clearInputs = () => {
    console.log('-----clear------')
    dispatch(deEncriptTextEdit(''))
    dispatch(finishTextEdit(''))
  }
  function textToArr(text) {
    let arr = [];
    let fullArr = [];

    for (let i = 0; i < text.length; i++) {
      let simbol = text[i];
      let nSimbol = currentLang.indexOf(simbol);
      arr.push(nSimbol);
      fullArr.push({ s: simbol, n: nSimbol });
    }
    return arr;
  }
  function codeText(textSimArray, keySimArray) {
    let i = -1,
      long = currentLang.length;
    let retArr = textSimArray.map((e) => {
      i++;
      i > keySimArray.length - 1 ? (i = 0) : false;

      let result = (e + keySimArray[i]) % long;
      return result;
    });

    return retArr;
  }
  function arrToText(arr) {
    let str = "";
    arr.forEach((element) => {
      str = str + currentLang[element];
    });
    return str;
  }
  function deCodeText(textArr, keyArr) {
    let i = -1;
    let long = currentLang.length;
    let result = textArr.map((e) => {
      i++;
      i == keyArr.length ? (i = 0) : false;
      //(l + t - k) % l
      let r = long + e - keyArr[i];
      if (r >= long) {
        r = r % long;
      } else {
        false;
      }
      return r;
    });
    return result;
  }
  function changeSymbols(text, symbols) {
    for (let i = 0; i < text.length; i++) {
      if (symbols.indexOf(text[i]) < 0) {
        return text[i];
        break;
      }
    }
    return false;
  }
  function showMessage(text, bgColor, textColor, time) {
    console.log('show message', text, bgColor, textColor, time)
    setErrorMessage({
      message: text,
      bgColor: bgColor,
      textColor: textColor,
    });
    setTimeout(() => setErrorMessage({ message: "" }), time);

  }
  function mainTest(text, key) {
    /*
    - получить допустимые символы 'currentLang'
    - проверить символы в тексте и в ключе
    - перевети симоволы ключа в масив
    - перевести символы текста в масив
    - зашифровать, получить масив шифрованых символов
    - перевести зашифрованный масив в текст
    ---
    - перевеси шифрованый текст в масив
    - перевести ключ в масив (уже сделанно)
    - разшифровать - получить мачив символов
    - перевести масив в текст
    */
    let //currentLang
      textArray = textToArr(text),
      keyArray = textToArr(key),
      testCodeText = codeText(textArray, keyArray),
      testResultCode = arrToText(testCodeText),
      ///--
      CodeSimbols = textToArr(testResultCode),
      decode = deCodeText(CodeSimbols, keyArray),
      decodetText = arrToText(decode);
    if (text == decodetText) {
      console.log(`text - ${text}
      key - ${key}
      code - ${testResultCode}
      decode - ${decodetText}`);
    } else {
      console.log("----START----");
      console.log("test text - ", text);
      console.log("array symbol text - ", textArray);
      console.log("test key - ", key);
      console.log("currentLang - ", currentLang.length);
      console.log("testCodeText", testCodeText);
      console.log("testResultCode", testResultCode);
      console.log("------------------");
      console.log("testDecode symbol", CodeSimbols);
      console.log("testDecodeText", decode);
      console.log("decodetText", decodetText);
      console.log("----FINISH----");
    }
  }

  const onChangeText = (text) => {

    clearInputs()
    dispatch(textEdit(text));
  };
  const onChangeKey = (text) => {
    clearInputs()
    dispatch(keyEedit(text));
    if (text.length < 3) {
      setShowCodeButton(true);
    } else {
      setShowCodeButton(false);
    }
  };

  let onPressDeCode = () => {
    let textArr = textToArr(mainText), // числовой масив текста
      keyArr = textToArr(key), // числовой масив ключа
      codeArr = deCodeText(textArr, keyArr), // числовой масив закодированого текста
      codingText = arrToText(codeArr);
    dispatch(finishTextEdit(codingText));

  };

  let onPressCode = () => {
    if (mainText.length > 500) {
      showMessage('Длина текста на может \n быть больше 500 символов', 'grey', 'white', 'rgba(128,128,128,0.5)')
      return
    }
    let i = changeSymbols(mainText, currentLang);
    if (i !== false) {
      console.log('Неправильный символ - ' + i.charCodeAt())
      showMessage('Неправильный символ ' + i, 'rgba(255,0,0,0.7)', 'white', 2000)
      return;
    }

    let textArr = textToArr(mainText), // числовой масив текста
      keyArr = textToArr(key), // числовой масив ключа
      codeArr = codeText(textArr, keyArr), // числовой масив закодированого текста
      codingText = arrToText(codeArr);

    dispatch(finishTextEdit(codingText));

    //codeText(textToArr(currentLang), textToArr(currentLang));
    let decodeArr = deCodeText(codeArr, keyArr), // числовой масив закодированого текста
      changeText = arrToText(decodeArr);

    dispatch(deEncriptTextEdit(changeText));

  };

  const showPaswordTougle = () => {
    showKey ? setShowKey(false) : setShowKey(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} elevation={7}>
        {errorMessage.message !== "" ? (
          <MessageBox
            text={errorMessage.message}
            bgColor={errorMessage.bgColor}
            textColor={errorMessage.textColor}
          ></MessageBox>
        ) : (
            false
          )}
        <TouchableOpacity></TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.mainWrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              numberOfLines={4}
              multiline
              value={mainText}
              placeholder={"Введите текст..."}
              onChangeText={(text) => onChangeText(text)}
            ></TextInput>
            <View style={styles.inputIconWrapper}>
              <TouchableOpacity
                style={styles.touchInputIcon}
                onPress={() => pasteText()}
              >
                <FontAwesome5
                  name="paste"
                  size={24}
                  color={THEME.header_color}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              secureTextEntry={showKey ? false : true}
              value = {key}
              style={styles.input}
              placeholder={"Введите ключ..."}
              autoCapitalize={"none"}
              //value={Key}
              onChangeText={(text) => onChangeKey(text)}
            ></TextInput>
            <View style={styles.inputIconWrapper}>
              <TouchableOpacity
                style={styles.touchInputIcon}
                onPress={() => showPaswordTougle()}
              >
                {showKey ? (
                  <Octicons name="eye" size={24} color={THEME.header_color} />
                ) : (
                    <Octicons
                      name="eye-closed"
                      size={24}
                      color={THEME.header_color}
                    />
                  )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            {codeStatus == 'code' ? (
              <View style={styles.btn}>
                <Button
                  title="Шифровать"
                  onPress={onPressCode}
                  disabled={showCodeButton}
                  color={THEME.btn_color}
                ></Button>
              </View>
            ) : false}
            {codeStatus == 'deCode' ? (
              <View style={styles.btn}>
                <Button
                  title="Разшифровать"
                  onPress={onPressDeCode}
                  color={THEME.btn_color}
                ></Button>
              </View>
            ) : false}
            <View style={styles.btn}>
              <Button
                title="Очистить"
                onPress={() => clearAll()}
                color={THEME.btn_color}
              ></Button>
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              numberOfLines={4}
              multiline
              placeholder={"Результат..."}
              editable={false}
              value={finishText}
            ></TextInput>
            <View style={styles.inputIconWrapper}>
              <TouchableOpacity
                style={styles.touchInputIcon}
                onPress={() => onShare()}
              >
                <FontAwesome5
                  name="share-alt"
                  size={24}
                  color={THEME.header_color}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnWrapper}>
          <View style={styles.btn}>
            <Button
              title="Копировать"
              // onPress={}
              color={THEME.btn_color}
              style={{padding:30,color:'green'}}
            ></Button> 
            </View>
            
          </View>
          {decodingText ? (<ChekingFinishText decodingText={decodingText}></ChekingFinishText>) : false}


        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bg_color,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    width: "100%",
    height: 80,
    backgroundColor: THEME.header_color,
    marginBottom: 5,
  },
  scroll: {
    width: "100%",
  },
  mainWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    backgroundColor: THEME.bg_color,
  },
  input: {
    width: "85%",
    //width: "100%",
  },
  inputWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "80%",
    marginVertical: 8,
    paddingHorizontal: 5,
  },
  inputIconWrapper: {
    width: "14%",
    height: "100%",
  },
  touchInputIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical:8,
  },
  btn: {
    width: "45%",
  },
  text: {
    color: "white",
  },
  modalMessage: {
    backgroundColor: "#d3d3d3cc",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 50,
  },
  errorBlock: {
    backgroundColor: "#BF3030cc",
    position: "absolute",
    padding: 10,
    borderRadius: 8,
    zIndex: 200,
  },
});

let changeLangArr = (text) => {
  let mapArray = [];
  for (let i = 0; i < str.length; i++) {
    let arr = { i, str: str[i] };
    mapArray.push(arr);
  }
  console.log(mapArray);
  console.log(str);
};
