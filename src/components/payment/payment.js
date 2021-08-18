import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getBasketTotal } from "../../reducer";
import { useStateValue } from "../../stateProvider";
import CheckoutProduct from "../checkout/checkoutProduct";
import axios from "axios";

const Wrap = styled.div`
  .payment {
    background: gray;
  }
  .payment-container {
    background: white;
  }
  .payment-container h1 {
    padding: 10px;
    font-weight: 400;
    text-align: center;
    background: rgb(237, 235, 237);

    border: 1px solid lightgray;
  }
  a {
    text-decoration: none;
  }
  .payment-section {
    display: flex;
    padding: 20px;
    margin: 0 20px;
    border-bottom: 1px solid lightgray;
  }
  .payment-title {
    flex: 0.2;
  }
  .payment-address,
  .payment-items,
  .payment-detail {
    flex: 0.8;
  }
  .payment-items {
  }
  .payment-detail {
  }
`;

export default function Payment() {
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [{ basket, user }, dispatch] = useStateValue();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const handleChange = async (event) => {
    //fancy stripe stuff
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentintent = paymentment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        history.replace("/orders");
      });
  };
  const hanndleSubmit = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  React.useEffect(() => {
    // generate a stripe secret which allow us to charge a client
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects the total in the currency subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  return (
    <>
      <Wrap>
        <div className="payment">
          <div className="payment-container">
            <h1>
              checkout (<Link to="/checkout">{basket?.length} items</Link>)
            </h1>
            <div className="payment-section">
              <div className="payment-title">
                <h3>delivery address</h3>
              </div>
              <div className="payment-address">
                <p>{user?.email || "hello dear"}</p>
                <p> no 20 react lane</p>
                <p>brytahub gwagwalada</p>
              </div>
            </div>
            <div className="payment-section">
              <div className="payment-title">
                <h3>review items and delivery</h3>
              </div>
              <div className="payment-items">
                {basket &&
                  basket.map((item) => (
                    <CheckoutProduct
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      rating={item.rating}
                      image={item.image}
                    />
                  ))}
              </div>
            </div>
            <div className="payment-section">
              <div className="payment-title">
                <h3>payment method</h3>
              </div>
              <div className="payment-detail">
                <form onSubmit={hanndleSubmit}>
                  <CardElement onChange={handleChange} />
                  <div className="payment-pricecontainer">
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          <h3>order total {value}</h3>
                        </>
                      )}
                      decimalScale={2}
                      value={getBasketTotal(basket)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    <button disabled={processing || disabled || succeeded}>
                      <span>{processing ? <p>processing</p> : "buy now"}</span>
                    </button>
                  </div>
                  {error && <div>{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </>
  );
}
