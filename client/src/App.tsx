import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import { MyAccount } from './account/components';
import { Calendar } from './calendar/components';
import MapWrapper from './map/components/map/MapWrapper';

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="nav-header">
          <h2>Races manager</h2>
          <ul className="nav-header__links">
            <li className="nav-header__link">
              <Link to="/">Map</Link>
            </li>
            <li className="nav-header__link">
              <Link to="/calendar">Calendar</Link>
            </li>
            <li className="nav-header__link nav-header__link--side">
              <Link to="/account">My account</Link>
            </li>
          </ul>
        </nav>

        <div className="content-wrapper">
          <Switch>
            <Route path="/account">
              <MyAccount />
            </Route>
            <Route path="/calendar">
              <Calendar />
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
