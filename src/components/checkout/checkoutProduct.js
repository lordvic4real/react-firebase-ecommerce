import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../stateProvider";

const Container = styled.div`
  .checkout-product {
    display: flex;
    margin: 20px 0;
  }
  .checkout-p-img {
    object-fit: contain;
    height: 180px;
    width: 180px;
  }
  .checkout-p-info {
    padding: 0 0 0 20px;
  }
  .checkout-p-info button {
    background: #f0c14b;
    border: 1px solid #f0c14b;
  }
  .checkout-p-rating {
    display: flex;
  }
  .checkout-p-price {
  }
  .checkout-p-title {
    font-size: 17px;
    font-weight: 800;
    max-width: 400px;
    text-transform: capitalize;
  }
`;

export default function CheckoutProduct({ id, image, price, rating, title }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <>
      <Container>
        <div className="checkout-product">
          <div>
            <img src={image} alt="p-pix" className="checkout-p-img" />
          </div>

          <div className="checkout-p-info">
            <p className="checkout-p-title">{title}</p>
            <p className="checkout-p-price">
              <small>$</small>
              <b>{price}</b>
            </p>
            <div className="checkout-p-rating">
              {Array(rating)
                .fill()
                .map((_i) => (
                  <p>⭐</p>
                ))}
            </div>
            <button onClick={removeFromBasket}>remove from basket</button>
          </div>
        </div>
      </Container>
    </>
  );
}
