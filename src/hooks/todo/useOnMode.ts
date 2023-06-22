
import { RefObject, useCallback, useState } from "react";
import handleEventWhenExternalClick from "../../util/handleEventWhenExternalClick";

// 수정모드, 삭제모드 시
// 해당 요소 외 요소는 disabled 된 UI 적용
const useOnMode = (thisTodo:RefObject<HTMLLIElement>):[
    boolean, (isAction:boolean) => void, () => void
] => {
    const [ isAction, setIsAction ] = useState<boolean>(false); // 액션에 따른 모드 결정 (액션 : 수정, 삭제)

    const onMode = useCallback(() => { // 해당 모드로 변경
        setIsAction(true);
        if(thisTodo.current) { // 외부 클릭시 모드 해제
            handleEventWhenExternalClick(thisTodo.current, () => {
                setIsAction(false);
            });
        };
    }, [thisTodo]);

    return [ isAction, setIsAction, onMode ];
};

export default useOnMode;