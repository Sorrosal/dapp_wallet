import "./App.css";
import { useState } from "react";
import logo from "./logo.jpg";
import { Select } from "antd";
import { Routes, Route } from "react-router-dom";
import {WalletView} from "./components/WalletView";
import {Home} from "./components/Home";
import {RecoverAccount} from "./components/RecoverAccount";
import {CreateAccount} from "./components/CreateAccount";

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
      
      {wallet && seedPhrase ? (
        <Routes>
          <Route
            path="/yourWallet"
            element={
              <WalletView
                wallet={wallet}
                setWallet={setWallet}
                seedPhrase={seedPhrase}
                setSeedPhrase={setSeedPhrase}
                selectedChain={selectedChain}
                />
            }
            />
        </Routes>

      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/recover"
            element={
              <RecoverAccount
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
                />
            }
            />
            <Route
              path="/yourWallet"
              element={
                <CreateAccount
                  setSeedPhrase={setSeedPhrase}
                  setWallet={setWallet}
                  />
              }
              />
        </Routes>
      )}

    </div>

  );
};

export default App;
