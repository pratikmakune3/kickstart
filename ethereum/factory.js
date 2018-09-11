import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factoryInstance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface), 
	'0x39F8846359EcA80A5e270D0802afec9c5ed30b6d'
);

export default factoryInstance;