import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/authentication/login";
import Checkout from "./components/checkout/checkout";
import Header from "./components/header";
import Home from "./components/home";
import { auth } from "./firebase";
import { useStateValue } from "./stateProvider";

function App() {
  const [{ basket }, dispatch] = useStateValue();
  React.useEffect(() => {
    // will only run once when the app components loads
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is", authUser);
      if (authUser) {
        //the user just logged in/ the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
