import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../stateProvider";
const Wrap = styled.div`
  .payment {
  }
  .payment-container {
  }
  .payment-title {
  }
  .payment-address {
  }
`;
export default function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <>
      <Wrap>
        <div className="payment">
          <div className="payment-container">
            <div className="payment-section">
              <div className="payment-title">
                <h3>delivery address</h3>
              </div>
              <div className="payment-address">
                <p>{user?.email}</p>
              </div>
            </div>
            <div className="payment-section">
              <div className="payment-title">
                <h3>delivery address</h3>
              </div>
              <div className="payment-address">
                <p>delivery address</p>
              </div>
            </div>
            <div className="payment-section">
              <div className="payment-title">
                <h3>delivery address</h3>
              </div>
              <div className="payment-address">
                <p>delivery address</p>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </>
  );
}
