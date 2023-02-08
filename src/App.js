import './App.css';
import Header from './components/Layout/Header';
import { Fragment } from 'react';
import RootContainer from './components/Layout/RootContainer'
function App() {
  return (
    <Fragment>
      <Header></Header>
      <RootContainer></RootContainer>
    </Fragment>
  );
}

export default App;
