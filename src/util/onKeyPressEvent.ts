import { KeyboardEvent } from "react";

const onKeyPressEvent = (e: KeyboardEvent<HTMLInputElement>, key:string, eventFunction:() => void) => {
    if (e.key === key) {
        eventFunction();
    }
}
export default onKeyPressEvent;