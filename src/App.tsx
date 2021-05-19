import 'regenerator-runtime/runtime'
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import NavBar from './components/NavBar';
import HomePage from './pages';
import EntityPage from './pages/Entity';
import { RecoilRoot } from 'recoil';
import AddEntityPage from './pages/AddEntity';


function App() {

  useEffect(() => {
    // in this case, we only care to query the contract when signed in
    if (window.walletConnection.isSignedIn()) {
      // TODO:

    }
  }, [])

  return (
    <RecoilRoot>
      <Router>
        <NavBar />
        <div className="max-w-6xl m-auto">
          <Switch>
            <Route path="/add">
              <AddEntityPage />
            </Route>
            <Route path="/detail">
              <EntityPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </RecoilRoot>
  )
}

export default App
