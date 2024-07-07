import "./App.css";
import { useState } from "react";
import logo from "./logo.png";
import { Select } from "antd";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");

  return (
    <div className="App">
      <header>
        <img src={logo} className="headerLogo" alt="logo" />
        <Select
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1"
            },
            {
              label: "Mumbai Testnet",
              value: "0x13881"
            },
            {
              label: "Sepolia Testnet",
              value: "0xAA36A7"
            },
          ]}
          className="dropwdown"
        ></Select>
      </header>


    </div>

  );
};

export default App;
