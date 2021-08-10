import React from "react";
import styled from "styled-components";
// import Logo from "../images/pix1.jpeg";
import SearchIcon from "@material-ui/icons/Search";
import { ShoppingBasketOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateProvider";
import { auth } from "../firebase";

const HeaderWrap = styled.div`
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    background: #131921;
    position: -webkit-sticky;
    top: 0;
    /* left: 0;
    right: 0; */
    /* margin-bottom: 20px; */
    z-index: 100;
    color: white;
    padding: 0 4% 0px 3%;
  }
  .logo {
    margin-top: 18px;
    margin: 0 20px;
    height: 30px;
    width: 100px;
    object-fit: cover;
    text-decoration: none;
    color: white;
  }
  .hearder-search {
    display: flex;
    align-items: center;
    flex: 1;
    border-radius: 24px;
  }
  .hearder-input {
    height: 12px;
    padding: 10px;
    width: 100%;
    border: none;
  }
  .header-nav {
    display: flex;
    margin-left: 40px;
    justify-content: space-evenly;
  }
  .header-option {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    color: white;
  }
  .header-option-lineOne {
    font-size: 10px;
    text-transform: capitalize;
    text-decoration: none;
  }
  .header-option-lineTwo {
    font-size: 13px;
    font-weight: 800;
    text-transform: capitalize;
  }
  .header-icon {
    padding: 5px;
    height: 22px !important;
    background: #cd9042;
  }
  .header-option-basket {
    color: white;
    display: flex;
    align-items: center;
  }
  .header-basket-count {
    margin: 0 10px;
  }
  .header-nav a {
    text-decoration: none;
  }
`;

export default function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user && user.email) {
      auth.signOut();
    }
  };
  return (
    <>
      <HeaderWrap>
        <div className="header">
          {/* <img src={Logo} className="logo" /> */}
          <Link to="/">
            <span className="logo">Pharmastore</span>
          </Link>
          <div className="hearder-search">
            <input type="text" className="hearder-input" />
            <SearchIcon className="header-icon" />
          </div>
          <div className="header-nav">
            <Link to={!user && "/login"}>
              <div className="header-option" onClick={handleAuthentication}>
                <span className="header-option-lineOne">
                  {" "}
                  {user ? user?.email : "hello Guest"}
                </span>
                <span className="header-option-lineTwo">
                  {user ? "Sign out" : "Sign in"}
                </span>
              </div>
            </Link>
            <div className="header-option">
              <span className="header-option-lineOne">Returns</span>
              <span className="header-option-lineTwo">& orders</span>
            </div>
            <div className="header-option">
              <span className="header-option-lineOne">your</span>
              <span className="header-option-lineTwo">prime</span>
            </div>
            <Link to="/checkout">
              <div className="header-option-basket">
                <ShoppingBasketOutlined />
                <span className="header-option-lineTwo header-basket-count">
                  {basket?.length}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </HeaderWrap>
    </>
  );
}
