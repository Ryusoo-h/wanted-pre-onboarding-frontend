import styled from 'styled-components';
import Container from '../components/common/Container';
import { useState } from 'react';
import TodoList from '../components/todoList/TodoList';
import { TodoType } from '../types/todoList';

const BackgroundImage = styled('div')<{path:string}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background-image: url(${props => props.path});
    background-position: center;
    background-size: 1920px 980px;
    background-repeat: no-repeat;
    animation-duration: 2.5s;
    animation-name: smaller;
    transition-timing-function: ease-out;
    @keyframes smaller {
        from {
            opacity: 0;
            background-size: 2016px 1029px;
        }
        to {
            opacity: 1;
            background-size: 1920px 980px;
        }
    }
`;

const MemoPad = styled.img`
    margin-top: -36px;
`;

const List = () => {
    // TODO : 나중에 값 받아와서 저장 (지금은 테스트를 위해 가짜값 넣음)
    const [ todoList, setTodoList ] = useState<TodoType[]>([
        {
            id: 1,
            todo: "맛있는 저녁 먹기",
            isCompleted: true,
            userId: 1
        },
        {
            id: 2,
            todo: "디자인 마무리하기",
            isCompleted: true,
            userId: 1
        },
        {
            id: 3,
            todo: "UI 구현하기",
            isCompleted: false,
            userId: 1
        },
        {
            id: 4,
            todo: "로그인 구현하기",
            isCompleted: false,
            userId: 1
        },
        {
            id: 5,
            todo: "TODO 구현하기",
            isCompleted: false,
            userId: 1
        },
        {
            id: 6,
            todo: "2시간마다 일어나서 허리 펴주기! 지금부터 펴볼까?!",
            isCompleted: false,
            userId: 1
        }
    ]);
    return (
    <>
        <BackgroundImage path={`${process.env.PUBLIC_URL}/img/background.jpg`}/>
        <Container>
            <>
                <MemoPad src={`${process.env.PUBLIC_URL}/img/memo-pad.svg`} alt="complete-Sign-Up-badge" />
                <TodoList todoList={todoList} />
            </>
        </Container>
    </>
    );
};

export default List;