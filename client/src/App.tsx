import React from 'react';
import { Provider } from 'react-redux';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import './App.css';
import { MyAccount } from './account/components';
import MapWrapper from './map/components/map/MapWrapper';
import Nav from './core/components/nav/Nav';
import configureStore, { history } from './state/configureStore.dev';
import EventsCalendar from './calendar/components/events-calendar/EventsCalendar';
import AddEventWrapper from './map/components/add-event-wrapper/AddEventWrapper';

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedRouter history={history}>
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
              <Route path="/edit-event">
                <AddEventWrapper />
              </Route>
              <Route path="/">
                <MapWrapper />
              </Route>
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    </div>
  );
}

export default App;
