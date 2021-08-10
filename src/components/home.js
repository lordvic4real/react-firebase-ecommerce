import React from "react";
import Banner from "../images/pix2.jpeg";
import styled from "styled-components";
import Product from "./product";
import ProductPix from "../images/pix1.jpeg";
const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1500px;
  margin: auto;
  flex-direction: column;

  .img-wrap {
    /* display: flex;
    justify-content: center;
    max-width: 1500px;
    margin: 0 auto; */
  }
  img {
    width: 100%;
    z-index: -1;
    margin-bottom: -150px;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 110, 0, 1),
      rgba(0, 110, 220, 0.3)
    );
    object-fit: cover;
  }
  .home-row {
    display: flex;
    margin: 0 25px;
    z-index: 1;
  }
`;

export default function Home(props) {
  return (
    <>
      <Container>
        <img src={Banner} alt="banner" />
        <div className="home-row">
          <Product
            id="23242"
            title="panadol extra Paracetamol, also known as acetaminophen, is a medication used to treat fever and mild to moderate pain. "
            price="450"
            image={ProductPix}
            rating={5}
          />
          <Product
            id="23242"
            title="panadol it is inferior to ibuprofen in that respect, and the benefits of its use for fever are unclear."
            price="50"
            // image={ProductPix}
            rating={3}
          />
        </div>
        <div className="home-row">
          <Product
            id="2323242"
            title="panadol it is inferior to ibuprofen in that respect, and the benefits of its use for fever are unclear."
            price="50"
            // image={ProductPix}
            rating={3}
          />
          <Product
            id="2322242"
            title="panadol it is inferior to ibuprofen in that respect, and the benefits of its use for fever are unclear."
            price="50"
            // image={ProductPix}
            rating={9}
          />
          <Product
            id="232342"
            title="panadol it is inferior to ibuprofen in that respect, and the benefits of its use for fever are unclear."
            price="50"
            // image={ProductPix}
            rating={3}
          />
        </div>
        <div className="home-row">
          <Product
            id="2324288"
            title="panadol it is inferior to ibuprofen in that respect, and the benefits of its use for fever are unclear."
            price="50"
            // image={ProductPix}
            rating={3}
          />
        </div>
      </Container>
    </>
  );
}
