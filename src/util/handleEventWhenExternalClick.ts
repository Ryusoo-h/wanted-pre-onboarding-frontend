
const handleEventWhenExternalClick = (target:HTMLElement, handleEvent:() => void): void => {
    // target의 외부요소 클릭시 handleEvent를 실행함

    const handleExternalClick = (e: MouseEvent) => {
        if (!target.contains(e.target as Node)) {
            handleEvent();
            window.removeEventListener('mousedown', handleExternalClick);
        };
    }
    window.addEventListener('mousedown', handleExternalClick);
};

export default handleEventWhenExternalClick;