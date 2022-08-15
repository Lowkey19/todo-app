import React from 'react'
import styled from 'styled-components';
import store from './store';
import { Provider } from 'react-redux';

import ToDoList from './components/ToDoList';

const AppContainer = styled.div`
  background-color: #eee;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <ToDoList />
      </AppContainer>
    </Provider>
  );
}

export default App;
