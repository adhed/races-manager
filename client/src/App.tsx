import React from 'react';
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

require('react-leaflet-markercluster/dist/styles.min.css');

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
