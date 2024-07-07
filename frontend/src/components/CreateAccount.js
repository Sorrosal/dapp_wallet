import React from 'react'
import { Button, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ethers } from "ethers";

export const CreateAccount = ({ setWallet, setSeedPhrase }) => {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  function generateWallet() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
  }

  function setWalletAndMnemonic() {
    setNewSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
  }
  return (
    <>
    <div className='content'>
      <div className='mnemonic'>
        <ExclamationCircleOutlined style={{fontSize: "20px"}} />
        <div>
        Once you generate the seed phrase, store it securely so you can retrieve your wallet in the
        your wallet in the future.
        </div>
      </div>
      <Button
        className='frontPageButton'
        type='primary'
        onClick={() => generateWallet()}
      >
        Generate seed phrase
      </Button>
      <Card className='seedPhraseContainer'>
        {newSeedPhrase && (
          <pre style={{whiteSpace:"pre-wrap"}}>{newSeedPhrase}</pre>
        )}
      </Card>
      <Button
        className='frontPageButton'
        type='default'
        onClick={() => setWalletAndMnemonic()}
      >
        Create your new wallet
      </Button>
      <p className='frontPageBottom' onClick={() => navigate("/")}>
        Back
      </p>
    </div>
    </>
  )
}
