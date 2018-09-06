const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

// Note - Provider is coupled with the network, also it stores private+public key
const provider = new HDWalletProvider(
	'foam correct ketchup clap recipe embrace buzz enrich sorry inspire broom decorate',
	'https://rinkeby.infura.io/8XD618jxOTDI4y1ndJXM'
);

const web3 = new Web3(provider);	

// Deploy script steps -> 1) Get the list of accounts  2) Create new Contract instance  3) Call .deploy()  4) Call .send()

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy contract from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) 
		.deploy({ data: compiledFactory.bytecode })
		.send({ from: accounts[0], gas: '1000000' });

	console.log('Contract is deployed to', result.options.address); // 0x04Eed970b92c8DfCAf0336559361f0fc7C2aa02A
};

deploy();