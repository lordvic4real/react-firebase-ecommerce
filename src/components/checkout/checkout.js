import React from "react";
import styled from "styled-components";
import ProductPix from "../../images/pix1.jpeg";
import { useStateValue } from "../../stateProvider";
import SubTotal from "../subtotal/subtotal";
import CheckoutProduct from "./checkoutProduct";
const Wrapper = styled.div`
  .checkout {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: white;
    height: max-content;
    margin-top: 50px;
  }
  .checkout-left {
    flex: 1;
  }
  .checkout-ad {
    width: 100%;
    margin-bottom: 10px;
    height: 120px;
    object-fit: cover;
  }
  .checkout-title {
    margin-right: 10px;
    padding: 10px;
    border-bottom: 1px solid lightgray;
  }
  .checkout-right {
  }
`;
export default function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <>
      <Wrapper>
        <div className="checkout">
          <div className="checkout-left">
            <img className="checkout-ad" alt="" src={ProductPix} />
            <div>
              <h3>Hello, {user?.email}</h3>
              <h2 className="checkout-title">your shopping basket</h2>
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
          <div className="checkout-right">
            <SubTotal />
          </div>
        </div>
      </Wrapper>
    </>
  );
}
