import React from "react";
import styled from "styled-components";
import ProductPix from "../images/pix1.jpeg";
import { useStateValue } from "../stateProvider";

const Container = styled.div`
  .product {
    display: flex;
    flex-direction: column;
    background: white;
    align-items: center;
    justify-content: flex-end;
    z-index: 1;
    min-width: 100px;
    max-height: 400px;
    padding: 20px;
    width: 100%;
    margin-right: 20px;
  }
  .product img {
    width: 100%;
    object-fit: cover;
    max-height: 200px;
    margin-bottom: 15px;
  }
  .product button {
    border: 1px solid #111;
    background: papayawhip;
    margin-top: 10px;
    color: #111;
  }

  .product-info {
    height: 200px;
    margin: 5px 0 15px 0;
  }
  .product-price {
    margin: 5px 0 0 0;
  }
  .product-rating {
    display: flex;
  }
`;
export default function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  // console.log("this is the basket", basket);

  const addToBasket = () => {
    // dispatch an action into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        image: image,
        title: title,
        rating: rating,
        price: price,
      },
    });
  };
  return (
    <>
      <Container>
        <div className="product">
          <div className="product-info">
            <p>{title}</p>
            <p className="product-price">
              <small>$</small>
              <strong>{price}</strong>
            </p>
            <div className="product-rating">
              {Array(rating)
                .fill()
                .map((_i) => (
                  <p>⭐</p>
                ))}
            </div>
          </div>
          <img src={image} alt="" />
          <button onClick={addToBasket}>Add to basket</button>
        </div>
      </Container>
    </>
  );
}
