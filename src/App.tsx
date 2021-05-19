import 'regenerator-runtime/runtime'
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import NavBar from './components/NavBar';
import HomePage from './pages';
import EntityPage from './pages/Entity';

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')


function App() {

  useEffect(() => {
    // in this case, we only care to query the contract when signed in
    if (window.walletConnection.isSignedIn()) {
      // TODO:

    }
  }, [])

  return (
    <Router>
      <NavBar />
      <div className="m-auto max-w-7xl">
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/:entity">
            <EntityPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
