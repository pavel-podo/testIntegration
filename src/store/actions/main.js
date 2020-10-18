import {CODE_STATUS,KEY, TEXT,ENCRIPT_TEXT,START_ENCRIPT_TEXT,DE_ENCRIPT_TEXT,FINISH_TEXT} from '../types'
export const keyEedit  = (key)=>{
    return{
        type :KEY,
        payload:key
    }
} 
export const textEdit  = (newText)=>{
    return{
        type :TEXT,
        payload: newText
    }
}    

export const finishTextEdit = (finishText) =>{
    return{
        type:FINISH_TEXT,
        payload:finishText
    }
}
export const deEncriptTextEdit = (deEncriptText) =>{
    return{
        type:DE_ENCRIPT_TEXT,
        payload:deEncriptText
    }
}
export const codeStatusEdit = (codeStatus) =>{
    return{
        type:CODE_STATUS,
        payload:codeStatus
    }
}
export const encriptTextEdit = (encriptText) =>{
    return{
        type:ENCRIPT_TEXT,
        payload:encriptText
    }
}