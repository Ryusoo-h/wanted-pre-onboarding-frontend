
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useToken } from "../useToken";
import handleEventWhenExternalClick from "../../util/handleEventWhenExternalClick";

// 수정모드, 삭제모드 시
// 해당 요소 외 요소는 disabled 된 UI 적용
const useModes = ():{
    isAddTodoInputFocusing:boolean,
    setIsAddTodoInputFocusing:(isAddTodoInputFocusing:boolean) => void,
    isTodoModifing:boolean,
    setIsTodoModifing:(isTodoModifing:boolean) => void,

    thisTodo:RefObject<HTMLLIElement>,
    isModify:boolean,
    setIsModify:(isModify:boolean) => void,
    isDelete:boolean,
    setIsDelete:(isDelete:boolean) => void,
    onModifyMode:() => void,
    onDeleteMode:() => void,
} => {
    const thisTodo = useRef<HTMLLIElement>(null);
    const [ isAddTodoInputFocusing, setIsAddTodoInputFocusing ] = useState<boolean>(false); // 새 todo 추가중 === true
    const [ isTodoModifing, setIsTodoModifing ] = useState<boolean>(false); // todo 수정모드 === true
    const [isModify, setIsModify] = useState<boolean>(false); // 수정 모드 결정
    const [isDelete, setIsDelete] = useState<boolean>(false); // 삭제 모드 결정
    const { checkTokenAndInvoke } = useToken();

    const onMode = useCallback((setIsMode:(isMode:boolean) => void) => { // 해당 모드로 변경
        setIsMode(true);
        if(thisTodo.current) { // 외부 클릭시 모드 해제
            handleEventWhenExternalClick(thisTodo.current, () => {
                setIsMode(false);
            });
        };
    }, []);
    
    const onModifyMode = useCallback(() => {
        onMode(setIsModify);
    }, [onMode]);

    const onDeleteMode = useCallback(() => {
        onMode(setIsDelete);
    }, [onMode]);

    useEffect(() => {
        checkTokenAndInvoke();
    }, [isAddTodoInputFocusing, isTodoModifing]);

    return { 
        isAddTodoInputFocusing,
        setIsAddTodoInputFocusing,
        isTodoModifing,
        setIsTodoModifing,

        thisTodo,
        isModify,
        setIsModify,
        isDelete,
        setIsDelete,
        onModifyMode,
        onDeleteMode
    };
};

export default useModes;