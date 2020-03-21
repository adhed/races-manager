import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import { MyAccount } from './account/components';
import MapWrapper from './map/components/map/MapWrapper';
import Nav from './core/components/nav/Nav';
import AddEventWrapper from './map/components/add-event-wrapper/AddEventWrapper';
import EventsCalendar from './calendar/components/events-calendar/EventsCalendar';
import configureStore from './state';

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Nav></Nav>
          <div className="content-wrapper">
            <Switch>
              <Route path="/account">
                <MyAccount />
              </Route>
              <Route path="/calendar">
                <EventsCalendar />
              </Route>
              <Route path="/add-event">
                <AddEventWrapper />
              </Route>
              <Route path="/">
                <MapWrapper />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
