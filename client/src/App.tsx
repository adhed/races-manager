import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import { MyAccount } from './account/components';
import { Calendar } from './calendar/components';
import MapWrapper from './map/components/map/MapWrapper';
import Nav from './core/components/nav/Nav';

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
              <Calendar />
            </Route>
            <Route path="/add-event">
              <MapWrapper addEvent={true} />
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
