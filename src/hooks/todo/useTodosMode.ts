
import { useEffect, useState } from "react";
import { useToken } from "../useToken";

// 수정모드, 삭제모드 시
// 해당 todo Li element 외 element는 disabled 된 UI 적용
const useTodosMode = ():[ boolean, (isDoingMode:boolean) => void ] => {
    const [ isDoingMode, setIsDoingMode ] = useState<boolean>(false); 
    const { checkTokenAndInvoke } = useToken();

    useEffect(() => {
        checkTokenAndInvoke();
    }, [isDoingMode]);

    return [ isDoingMode, setIsDoingMode ];
    
};

export default useTodosMode;