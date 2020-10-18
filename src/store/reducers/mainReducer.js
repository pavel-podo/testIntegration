import { 
        CODE_STATUS, 
        KEY, 
        TEXT,
        FINISH_TEXT,  
        DE_ENCRIPT_TEXT,
        //--
        ENCRIPT_TEXT, 
        START_ENCRIPT_TEXT, 
         } from "../types";

const initialState = {
    startText: '',
    finishText: '',
    encriptText: '',
    key: '',
    askiiCod: `\\'!"#$%&()*+,-./0123456789:;<=>? @ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{|}~АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя\n`,
    deEncriptText: '',
    codeStatus: 'code',
};
export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case KEY: return { ...state, key: action.payload }
        case TEXT: return { ...state, startText: action.payload }
        case FINISH_TEXT: return { ...state, finishText: action.payload }
        case DE_ENCRIPT_TEXT: return { ...state, deEncriptText: action.payload }
        case CODE_STATUS: return { ...state, codeStatus: action.payload }
        //----
        case ENCRIPT_TEXT: return { ...state, encriptText: action.payload }
        default: return state
    }
    return state;
};
