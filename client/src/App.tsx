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
          <ul>
            <li>
              <Link to="/">Calendar</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>
              <Link to="/account">My account</Link>
            </li>
          </ul>
        </nav>

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
      </Router>
    </div>
  );
}

function Calendar() {
  return <h2>Calendar</h2>;
}

function Account() {
  return <h2>account</h2>;
}

function Map() {
  return <h2>Map</h2>;
}

export default App;
