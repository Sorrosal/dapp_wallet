import React, { useEffect, useState } from 'react'
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../link.png";
import axios from "axios";

import { ethers } from "ethers";
import { CHAINS_CONFIG } from '../chains';

export const WalletView = ({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain
}) => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [amountToSend, setAmountToSend] = useState(null);
  const [sendToAddress, setSendToAddress] = useState(null);
  const [processing, setProcesing] = useState(false);
  const [hash, setHash] = useState(null);

  const items = [
    {
      key: "3",
      label: "Tokens",
      children: (
        <>
          {tokens ? (
            <List
              bordered
              itemLayout="horizontal"
              dataSource={tokens}
              renderItem={(item, index) => (
                <List.Item style={{ textAlign: "left" }}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo || logo} />}
                    title={item.symbol}
                    description={item.name}
                  />
                  <div>
                    {(
                      Number(item.balance) /
                      10 ** Number(item.decimals)
                    ).toFixed(2)}
                    {" Tokens"}
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <>
              <span>Parece que aún no tienes ningún token</span>
              <p className="frontPageBottom">
                Aprende web3 en: {""}
              </p>
            </>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "NFTs",
      children: (
        <>
          {nfts ? (
            <>
              {nfts.map((e, i) => {
                return (
                  <>
                    {e && (
                      <img
                        key={i}
                        className='nftImage'
                        alt="nftImage"
                        src={e}
                      />
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <>
              <span>Parece que aun no tienes ningun token NFT</span>
              <p className='frontPageBottom'>
                Aprende web3 en
              </p>
            </>
          )}
        </>
      ),
    },
    {
      key: "1",
      label: "Transfer",
      children: (
        <>
          <h3>Native Balance</h3>
          <h1>
            {balance.toFixed(2)} {CHAINS_CONFIG[selectedChain].ticker}
          </h1>
          <div className='sendRow'>
            <p style={{ width: "90px", textAlign: "left" }}> Send to:</p>
            <Input
              value={sendToAddress}
              onChange={(e) => setSendToAddress(e.target.value)}
              placeholder='0x...'
            />
          </div>
          <div className='sendRow'>
            <p style={{ width: "90px", textAlign: "left" }}>Quantity:</p>
            <Input
              value={amountToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
              placeholder='Native tokens that yoy want to send...' />
          </div>
          <Button
            style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
            type='primary'
            onClick={() => sendTransaction(sendToAddress, amountToSend)}
          >
            Send tokens
          </Button>
          {processing && (
            <>
              <Spin />
              {hash && (
                <Tooltip title={hash}>
                  <p>Hover for Tx Hash</p>
                </Tooltip>
              )}
            </>
          )}
        </>
      )
    }
  ];

  async function sendTransaction(to, amount) {
    const chain = CHAINS_CONFIG(selectedChain);
    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);
    const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;
    const wallet = new ethers.Wallet(privateKey, provider);
    const tx = {
      to: to,
      value: ethers.parseEther(amount.toString()),
    };
    setProcesing(true);
    try {
      const transaction = await wallet.sendTransaction(tx);
      setHash(transaction.hash);
      const receipt = await transaction.wait();

      setHash(null);
      setProcesing(false);
      setAmountToSend(null);
      setSendToAddress(null);

      if (receipt.status === 1) {
        getAccountTokens();
      } else {
        console.log("failed");
      }
    } catch (err) {
      setHash(null);
      setProcesing(false);
      setAmountToSend(null);
      setSendToAddress(null);
    }
  }

  async function getAccountTokens() {
    setFetching(true);
    const res = await axios.get(`http://localhost:3001/getTokens`, {
      params: {
        userAddress: wallet,
        chain: selectedChain,
      },
    });
    const response = res.data;

    if (response.tokens.length > 0) {
      setTokens(response.tokens);
    }

    if (response.nfts.length > 0) {
      setNfts(response.nfts);
    }
    setBalance(response.balance);
    setFetching(false);
  }

  function logout() {
    setSeedPhrase(null);
    setWallet(null);
    setNfts(null);
    setTokens(null);
    setBalance(0);
    navigate("/");
  }

  useEffect(() => {
    if(!wallet) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  }, [selectedChain]);

  return (
    <div className='content'>
      <div className='logoutButton' >
        <LogoutOutlined />
      </div>
      <div className='walletName'>Wallet</div>
      <Tooltip title={wallet}>
        <div>
          {wallet.slice(0, 4)}...{wallet.slice(38)}
        </div>
      </Tooltip>
      <Divider />
      {fetching ? (
        <Spin />
      ) : (
        <Tabs defaultActiveKey='1' items={items} className='walletView' />
      )
      }
    </div>
  )
}
