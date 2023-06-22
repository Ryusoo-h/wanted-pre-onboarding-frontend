
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignUp from "../../apis/auth/postSignUp";

const useSignUp = (setIsComplete:(isComplete:boolean) => void):[
    string, (email:string, password:string) => void
] => {
    const [ message, setMessage ] = useState<string>('');
    const navigate = useNavigate();

    const submitSignUp = (email:string, password:string) => {
        postSignUp(email, password)
        .then(response => {
            switch (response.statusCode) {
                case 201:
                    navigate('/signin');
                    setIsComplete(true);
                    break;
                case 400:
                    setMessage(response.message);
                    break;
                default:
                    console.log("✅postSignUp API 에러: ", response);
            }
        }).catch(e => {
            console.log("✅회원가입 에러: ", e.message);
        })
    };
    return [ message, submitSignUp ];
};

export default useSignUp;