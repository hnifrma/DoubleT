import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';
import {loadUser} from './actions/authActions';
//css
import './App.css';

import ItemList from './components/ItemList';
import AppNavbar from './components/AppNavbar';
import ItemModal from './components/ItemModal';
import AboutUs from './components/AboutUs';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ItemList />
            
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
