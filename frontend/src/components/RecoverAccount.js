import React from 'react';
import { BulbOutlined } from '@ant-design/icons';
import { Button, Input } from "antd";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { ethers } from "ethers";
import TextArea from 'antd/es/input/TextArea';

export const RecoverAccount = ({ setWallet, setSeedPhrase }) => {
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);
  function seedAdjust(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }
  function recoverWallet() {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
    } catch (err) {
      setNonValid(true);
      return;
    }
    setSeedPhrase(typedSeed);
    setWallet(recoveredWallet.address);
    navigate("/yourwallet");
    return;
  }
  return (
    <div className='content'>
      <div className='mnemonic'>
        <BulbOutlined style={{ fontSize: "20px" }} />
        <div>
          Escribe tu frase semilla en el campo de abajo para recuperar tu billetera (debería incluir 12 palabras separadas por espacios).
        </div>
      </div>
      <TextArea
        value={typedSeed}
        onChange={seedAdjust}
        rows={4}
        className='seedPhraseContainer'
        placeholder='Type your seed phrase here...'
      />
      <Button
        disabled={
          typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
        }
        className='frontPageButton'
        type="primary"
        onClick={() => recoverWallet()}>Recover wallet</Button>
      {nonValid && <p style={{ color: "red" }}>Invalid Seed Phrase</p>}
      <p className='frontPageBottom' onClick={() => navigate("/")}><span>Back</span></p>
    </div >
  )
}
