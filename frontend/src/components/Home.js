import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='content'>
        <h2>SorroWallet 💵</h2>
        <h4>Welcome to your CryptoWallet</h4>
        <Button
          onClick={() => navigate("/yourWallet")}
          className="frontPageButton green"
          type="primary"
        >
          Create Account
        </Button>

        <Button
          onClick={() => navigate("/recover")}
          className="frontPageButton"
          type="default"
        >
          Login with your seedphrase
        </Button>

      </div>
    </>
  )
}
