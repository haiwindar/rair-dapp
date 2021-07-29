import {useState, useEffect} from 'react';

import logo from './RAIRLandscape.png';
import './App.css';

// Sweetalert2 for the popup messages
import Swal from 'sweetalert2';

// Import the data from the contract artifacts

import CreatorMode from './components/creatorMode.jsx';
import ConsumerMode from './components/consumerMode.jsx';

const contractAddresses = {
	'0x61': { // Binance Testnet
		factory: '0x6d4289314C1c5c0d8F94a1cd44E15e20fcCa5B40',
		erc777: '0x51eA5316F2A9062e1cAB3c498cCA2924A7AB03b1',
		minterMarketplace: '0xDf49AdC002CcEF23aC9823e0B1eeBc4e8dDE54CC'
	}
}

const binanceTestnetData = {
	chainId: '0x61',
	chainName: 'Smart Chain - Testnet',
	nativeCurrency:
	{
		name: 'BNB',
		symbol: 'BNB',
		decimals: 18
	},
	rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
	blockExplorerUrls: ['https://testnet.bscscan.com']
}

const klaytnBaobabData = {
	chainId: '0x3E9',
	chainName: 'Klaytn Baobab',
	nativeCurrency:
	{
		name: 'KLAY',
		symbol: 'KLAY',
		decimals: 18
	},
	rpcUrls: ['https://api.baobab.klaytn.net:8651/'],
	blockExplorerUrls: ['https://baobab.scope.klaytn.com/']
}

const polygonMumbaiData = {
	chainId: '0x13881',
	chainName: 'Polygon Mumbai',
	nativeCurrency:
	{
		name: 'Matic token',
		symbol: 'tMATIC',
		decimals: 18
	},
	rpcUrls: ['https://rpc-endpoints.superfluid.dev/mumbai'],
	blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/']
}

function App() {

	const [account, setAccount] = useState();
	const [mode, setMode] = useState();
	const [chainId, setChainId] = useState();
	const [addresses, setAddresses] = useState();

	useEffect(() => {
		window.ethereum.request({ method: 'eth_requestAccounts' })
			.then(accounts => {
				setAccount(accounts[0]);
			});
	}, [account])

	useEffect(() => {
		window.ethereum.on('chainChanged', async (chainId) => {
			setChainId(chainId);
			setAddresses(contractAddresses[chainId]);
		});
		setChainId(window.ethereum.chainId);
		setAddresses(contractAddresses[window.ethereum.chainId]);
	}, [])

	return (
		<div style={{minHeight: '100vh'}} className="App bg-dark text-white">
			{!mode && <div>
				{window.ethereum &&
					<button
						className='btn btn-warning'
						disabled={chainId === '0x61'}
						onClick={async e => {
							await window.ethereum.request({method: 'wallet_addEthereumChain', params: [binanceTestnetData]});
							setAccount();
							setChainId();
						}}>
						Binance Testnet
					</button>}
				{window.ethereum &&
					<button
						className='btn btn-light'
						disabled={chainId === '0x3e9'}
						onClick={async e => {
							await window.ethereum.request({method: 'wallet_addEthereumChain', params: [klaytnBaobabData]});
							setAccount();
							setChainId();
						}}>
						Baobab (Klaytn)
					</button>}
				{window.ethereum &&
					<button
						className='btn btn-primary'
						disabled={chainId === '0x3'}
						onClick={async e => {
							await window.ethereum.request({method: 'wallet_switchEthereumChain', params: [{chainId: '0x3'}]});
							setAccount();
							setChainId();
						}}>
						Ropsten (Ethereum)
					</button>}
				{window.ethereum &&
					<button
						className='btn btn-secondary'
						disabled={chainId === '0x5'}
						onClick={async e => {
							await window.ethereum.request({method: 'wallet_switchEthereumChain', params: [{chainId: '0x5'}]});
							setAccount();
							setChainId();
						}}>
						Goerli (Ethereum)
					</button>}
				{window.ethereum &&
					<button
						className='btn btn-danger'
						disabled={chainId === '0x13881'}
						onClick={async e => {
							await window.ethereum.request({method: 'wallet_addEthereumChain', params: [polygonMumbaiData]});
							setAccount();
							setChainId();
						}}>
						Mumbai (Polygon)
					</button>}
			</div>}
			<img src={logo} style={{maxHeight: '5vh'}} className="App-logo my-5" alt="logo" />
			<br/>
			{account && !mode && <>
				Welcome {account}!
				<br />
				{chainId && addresses?.factory && <button onClick={e => {
					setMode(1);
				}} className='btn btn-success mx-5'>
					I'm a creator!
				</button>}
				{chainId && addresses?.minterMarketplace && <button onClick={e => {
					setMode(2);
				}} className='btn btn-warning mx-5'>
					I'm an user!
				</button>}
			</>}
			{account && mode && <button onClick={e => setMode()} style={{position: 'absolute', left: 0, top: 0}} className='btn btn-danger'>
				<i className='fas fa-arrow-left' />
			</button>}
			{account && mode === 1 && <CreatorMode account={account} addresses={addresses}/>}
			{account && mode === 2 && <ConsumerMode account={account} addresses={addresses}/>}
		</div>
	);
}

export default App;
