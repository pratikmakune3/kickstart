import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
	// we're in browser *AND* user installed metamask
	// Hijacking the metamask web3's provider
	web3 = new Web3(window.web3.currentProvider);
} else {
	// we're on server *OR* user is not running metamask
	const provider = new Web3.providers.HttpProvider(
		'https://rinkeby.infura.io/8XD618jxOTDI4y1ndJXM'
	);

	web3 = new Web3(provider);
}

export default web3;