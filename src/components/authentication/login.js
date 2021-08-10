import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
// import ProductPix from "../../images/pix1.jpeg";
import { auth } from "../../firebase";

const Wrapper = styled.div`
  .login {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background: white;
  }
  img {
    margin: 20px auto;
    width: 100px;
    object-fit: cover;
  }
  .reg-btn {
  }
  .signin-btn {
    background: orange;
    height: 30px;
    width: 100%;
    border: 1px solid darkgrey;
    margin-top: 10px;
    text-transform: capitalize;
    font-size: 16px;
    font-weight: bold;
  }
  .login-container {
    width: 350px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid lightgray;
    padding: 20px;
  }
  .login-container h1 {
    margin-bottom: 20px;
    font-weight: 500;
  }
  .login-container h5 {
    /* margin-bottom: 5px; */
  }
  .login-container input {
    margin-bottom: 5px;
    background: white;
    width: 98%;
    height: 30px;
  }
  p {
    font-size: 12px;
    margin-top: 15px;
  }
`;

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    // connecting to firebase
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    // connecting to firebase

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <Wrapper>
        <div className="login">
          <Link to="/">
            {/* <img src={ProductPix} alt="" /> */}
            <h1>Pharmastore</h1>
          </Link>
          <div className="login-container">
            <h2>sign in</h2>
            <form>
              <h5>E-mail</h5>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h5>Password</h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>
                <button className="signin-btn" type="submit" onClick={signIn}>
                  sign in
                </button>
              </p>
            </form>
            <p>by signing in you agree to our terms and condition</p>
            <button className="reg-btn" onClick={register}>
              create an account
            </button>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
