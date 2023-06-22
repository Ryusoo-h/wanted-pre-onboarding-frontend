
import { useState } from "react";
import postSignIn from "../../apis/auth/postSignIn";

const useSignIn = (
    setIsComplete:(isComplete:boolean) => void, 
    login:(token:string) => void
):[
    string, (email:string, password:string) => void
] => {
    const [ message, setMessage ] = useState<string>("");

    const submitSignIn = (email:string, password:string) => {
        postSignIn(email, password)
        .then( response => {
            if (response.statusCode === 200 && response.access_token) {
                setIsComplete(false);
                login(response.access_token);
            } else {
                switch (response.statusCode) {
                    case 401:
                        setMessage("비밀번호가 올바르지 않습니다.")
                        break;
                    case 404:
                        if (response.message) {
                            setMessage(response.message);
                        }
                        break;
                    default:
                        setMessage("로그인에 실패했습니다.");
                        console.log('✅postSignIn API 에러: ', response);
                }
            }
        }).catch( e => {
            console.log("✅로그인 에러: ", e.message);
        });
    };

    return [ message, submitSignIn ]
};

export default useSignIn;