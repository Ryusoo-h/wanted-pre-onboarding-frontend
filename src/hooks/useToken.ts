
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useToken = ():{
    getToken:() => string | null, 
    isToken:() => boolean, 
    checkTokenAndInvoke:(trueAction?:() => void) => void,
    login:(token:string) => void,
    logout:() => void
} => {
    const navigate = useNavigate();

    const getToken = useCallback(():string | null => {
        return localStorage.getItem("access_token");
    }, []);

    const isToken = useCallback(():boolean => {
        return getToken() !== null;
    }, [getToken])

    const checkTokenAndInvoke = useCallback((trueAction?:() => void):void => {
        if (!isToken()) {
            navigate("/signin");
        } else {
            trueAction && trueAction();
        };
    }, [isToken, navigate]);
    
    const login = (token:string):void => {
        localStorage.setItem("access_token", token);
        navigate("/");
    }

    const logout = ():void => {
        localStorage.removeItem("access_token");
        navigate("/signin");
    }
    
    return { getToken, isToken, checkTokenAndInvoke, login, logout };
};