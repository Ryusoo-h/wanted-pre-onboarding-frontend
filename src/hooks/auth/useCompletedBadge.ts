import { useState } from "react";

const useCompletedBadge = ():{
    isShowCompletedBadge:boolean,
    showCompletedBadge:() => void,
    hideCompletedBadge:() => void,
} => {
    const [ isShowCompletedBadge, setIsShowCompletedBadge ] = useState<boolean>(false);
    
    const showCompletedBadge = () => {
        setIsShowCompletedBadge(true);
    }
    const hideCompletedBadge = () => {
        setIsShowCompletedBadge(false);
    }
    return { isShowCompletedBadge, showCompletedBadge, hideCompletedBadge }
};

export default useCompletedBadge;