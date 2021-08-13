import React from "react";
import styled from "styled-components";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../stateProvider";
import { getBasketTotal } from "../../reducer";
import { useHistory } from "react-router-dom";

const Wrap = styled.div`
  .subtotal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    height: 100px;
    padding: 20px;
    background: #f3f3f3;
    border: 1px solid #dddddd;
    border-radius: 3px;
  }
  .subtotal-gift {
    display: flex;
    align-items: center;
  }
  .subtotal-gift input {
    margin-right: 5px;
  }
  .subtotal button {
    border-radius: 2px;
    width: 100%;
    background: #f0b1b4;
    height: 30px;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
`;

export default function SubTotal() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  return (
    <Wrap>
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                Subtotal({basket.length} items) :<strong>{value}</strong>
              </p>
              <small className="subtotal-gift">
                <input type="checkbox" /> this order contains a gift
              </small>
            </>
          )}
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
        <button onClick={(e) => history.push("/payment")}>
          proceed to checkout
        </button>
      </div>
    </Wrap>
  );
}
