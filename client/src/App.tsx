import React, { useEffect } from 'react';
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
import AddEventWrapper, { EventFormType } from './map/components/add-event-wrapper/AddEventWrapper';
import { MAP_API_KEY } from './config/api-credentials';

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);

function App() {

  const addGoogleMapsApiScript = () => {
    const scriptTag = document.createElement('script');
    scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places`;
    scriptTag.async = true;
    document.body.appendChild(scriptTag);
  };

  useEffect(() => {
    addGoogleMapsApiScript();
  }, []);

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
                <AddEventWrapper mode={EventFormType.Add} />
              </Route>
              <Route path="/edit-event">
                <AddEventWrapper mode={EventFormType.Edit} />
              </Route>
              <Route path="/event-added">
                <AddEventWrapper mode={EventFormType.EventAdded} />
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
