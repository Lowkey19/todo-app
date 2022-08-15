import React, { FunctionComponent, useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { actions } from '../modules/todos';
import { IToDo } from '../modules/todos/types';
import { RootState } from '../store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToDoContainer = styled.div`
  border: 1px solid;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items; center;
  justify-content: center;
`;

const ToDoName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  > button {
    width: 150px;
    background-color: #002447;
    margin: 10px;
  }
`;

const ToDoList: FunctionComponent<ReduxProps> = (props: ReduxProps) => {
  const { toDoList, getToDoList, createToDo, updateToDo, deleteToDo } = props;

  const initialState: IToDo = {
    text: '',
    isCompleted: false,
  }

  const [listItems, setListItems] = useState<IToDo[]>([]);
  const [toDoItem, setToDoItem] = useState<IToDo>(initialState);

  useEffect(() => {
    getToDoList();
  }, []);

  useEffect(() => {
    setListItems(toDoList);
  }, [toDoList]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToDoItem({
      ...toDoItem,
      text: e.target.value,
    });
  }

  const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
    createToDo(toDoItem);
  }

  const handleUpdate = (item: IToDo) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateToDo({
      ...item,
      isCompleted: true,
    })
  }

  const handleDelete = (id?: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (id) deleteToDo(id);
  }

  return (
    <Container>
      <InputContainer>
        <TextField type={'text'} value={toDoItem.text} onChange={handleChange} />
        <Button onClick={handleCreate}>Create To do</Button>
      </InputContainer>
      {listItems && listItems.map((item) => {
        return (
          <ToDoContainer key={item._id}>
            <ToDoName>
              <h2>{item.text}</h2>
              {item.isCompleted && (<CheckCircleIcon />)}
            </ToDoName>
            <ActionContainer>
              <Button onClick={handleUpdate(item)}>Mark as completed</Button>
              <Button onClick={handleDelete(item?._id)}>Remove</Button>
            </ActionContainer>
          </ToDoContainer>
        )
      })}
    </Container>
  )
}

const mapStateToProps = (state: RootState) => ({
  toDoList: state.todo.toDoList,
  apiInProgress: state.todo.apiInProgress,
});

const mapDispatchToProps = {
  getToDoList: actions.getToDoList,
  createToDo: actions.createToDo,
  updateToDo: actions.updateToDo,
  deleteToDo: actions.deleteToDo,
}
const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(ToDoList);