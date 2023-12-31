import React from 'react';
import logo from './logo.svg';
import './App.css';
import {  useSuiClientQuery } from '@mysten/dapp-kit';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import CreateCategory from './CreateCategory';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <ConnectButton />
        </header>
        create category 
        <CreateCategory/>
        <ConnectedAccount />
    </div>
);

function ConnectedAccount() {
    const account = useCurrentAccount();

    if (!account) {
      console.log(account)
        return null;
    }

    return (
        <div>
            <div>Connected to {account.address}</div>;
            <OwnedObjects address={account.address} />
        </div>
    );
}

function OwnedObjects({ address }: { address: string }) {
    const { data } = useSuiClientQuery('getOwnedObjects', {
        owner: address,
    });
    if (!data) {
        return null;
    }

    return (
        <ul>
            {data.data.map((object) => (
                <li key={object.data?.objectId}>
                    <a href={`https://suiexplorer.com/object/${object.data?.objectId}`}>
                        {object.data?.objectId}
                    </a>
                </li>
            ))}
        </ul>
    );
}

}

export default App;
