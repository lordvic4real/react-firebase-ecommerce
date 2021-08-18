import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/authentication/login";
import Checkout from "./components/checkout/checkout";
import Header from "./components/header";
import Home from "./components/home";
import Payment from "./components/payment/payment";
import { auth } from "./firebase";
import { useStateValue } from "./stateProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const promise = loadStripe(
    "pk_test_51H7y6QI1uf3Mdow7kCC2HqY9DqKs3uUdVNvydSuWPJBwljGJYD3Cv8u2b802SQyJwnNBF65Teb2HEkXEj49DDQaB00bQDGjbCL"
  );

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
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
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
