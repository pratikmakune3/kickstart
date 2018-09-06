const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ from: accounts[0], gas: '1000000'});

	await factory.methods.createCampaign('100').send({
		from: accounts[0], 
		gas: '1000000'
	});

	let addresses = await factory.methods.getDeployedCampaigns().call();
	campaignAddress = addresses[0];

	campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
});

describe('Campaigns', () => {
	it('deploys a factory and a campaign', () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address);
	});

	it('marks caller as the manager of campaign', async () => {
		const manager = await campaign.methods.manager().call();
		assert.equal(accounts[0], manager);
	});

	it('allows people to contribute and become contributor', async() => {
		await campaign.methods.contribute().send({
			value : '101',
			from  : accounts[1]
		});

		const isContributor = campaign.methods.approvers(accounts[1]).call();
		assert(isContributor);
	});

	it('allows manager to make payment request', async () => {
		await campaign.methods
			.createRequest('Buy Batteries', 5000, accounts[1])
			.send({
				from: accounts[0],
				gas : '1000000'
			});

		const request = await campaign.methods.requests(0).call();

		assert.equal('Buy Batteries', request.description);

	});

	it('processes requests', async () => {
		/*
			1. contrinute 10 ethers by account[1]  
			2. manager creates spending request, value = 5 ethers, account[2] is reciepient
			3. account[1] approve request.
			4. manager finalize request, check if account[2] balance goes up by 5 ethers
		*/

		await campaign.methods.contribute().send({
			from  : accounts[1],
			value : web3.utils.toWei('10', 'ether')
		});

		await campaign.methods.createRequest('A', web3.utils.toWei('5','ether'), accounts[2])
			.send({
				from : accounts[0],
				gas : '1000000'
			});

		await campaign.methods.approveRequest(0).send({
			from : accounts[1],
			gas : '1000000'
		});

		await campaign.methods.finalizeRequest(0).send({
			from : accounts[0],
			gas : '1000000'
		});

		let balance = await web3.eth.getBalance(accounts[2]);
		balance = web3.utils.fromWei(balance, 'ether');
		console.log('balance of reciepient', balance);
		assert(balance > 104);
	});
});














