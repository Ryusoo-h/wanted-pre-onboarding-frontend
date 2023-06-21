
import Container from '../components/common/Container';
import TodoList from '../components/todo/TodoList';
import * as S from './List.style';
import { useToken } from '../hooks/useToken';
import useTodoList from '../hooks/todo/useTodoList';
import useSortTodoList from '../hooks/todo/useSortTodoList';

const List = () => {
    const [ todoList, setTodoList, alert ] = useTodoList();
    const [ isLatestSort, sortTodoList ] = useSortTodoList();
    const { logout } = useToken();

    return (
        <>
            <S.BackgroundImage path={`${process.env.PUBLIC_URL}/img/background.jpg`}/>
            <Container>
                <>
                    <S.MemoPad src={`${process.env.PUBLIC_URL}/img/memo-pad.svg`} alt="complete-Sign-Up-badge" />
                    <TodoList todoList={todoList} setTodoList={setTodoList} isLatestSort={isLatestSort} />
                    <S.Alert>{alert}</S.Alert>
                    <S.RightButtonsWrapper className="flex">
                        <div className="top">
                            <S.SortButton onClick={() => {sortTodoList(todoList, setTodoList)}} isLatestSort={isLatestSort}>
                                <img src={`${process.env.PUBLIC_URL}/img/icon/ic-blue-arrow.svg`} alt="arrow-icon" />
                            </S.SortButton>
                        </div>
                        <div className="bottom">
                            <S.LogoutButton onClick={() => {logout()}}>
                                <img src={`${process.env.PUBLIC_URL}/img/icon/ic-logout.svg`} alt="logout-icon" />
                            </S.LogoutButton>
                        </div>
                    </S.RightButtonsWrapper>
                </>
            </Container>
        </>
    );
};

export default List;