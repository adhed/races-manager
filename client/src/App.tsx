import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="nav-header">
          <h2>Races manager</h2>
          <ul className="nav-header__links">
            <li className="nav-header__link">
              <Link to="/">Calendar</Link>
            </li>
            <li className="nav-header__link">
              <Link to="/map">Map</Link>
            </li>
            <li className="nav-header__link nav-header__link--side">
              <Link to="/account">My account</Link>
            </li>
          </ul>
        </nav>

        <div className="content-wrapper">
          <Switch>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/map">
              <Map />
            </Route>
            <Route path="/">
              <Calendar />
            </Route>
          </Switch>
        </div>
        </Router>
    </div>
  );
}

function Calendar() {
  return <div>
      <h2>Calendar</h2>
      <p>View with calendar view with sport events</p>
    </div>;
}

function Account() {
  return <div>
      <h2>My account</h2>
      <p>You need to log in first! TODO: implement OAuth</p>
    </div>;
}

function Map() {
  return <div>
  <h2>Map</h2>
  <p>View with Leaflet map</p>
</div>;
}

export default App;
