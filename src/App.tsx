import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Platform from './pages/Platform';
import Forum from './pages/Forum';
import Resources from './pages/Resources';
import Rewards from './pages/Rewards';
import Healer from './pages/Healer';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import AIAssistant from './components/AIAssistant';

function App() {
  const endpoint = clusterApiUrl('devnet');
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="font-urbanist text-gray-800">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/platform" element={<Platform />}>
                  <Route index element={<AIAssistant />} />
                  <Route path="forum" element={<Forum />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="rewards" element={<Rewards />} />
                  <Route path="healer" element={<Healer />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="wallet" element={<Wallet />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;