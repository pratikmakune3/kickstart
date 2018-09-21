import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {

	static async getInitialProps(props) {

		const campaign = await Campaign(props.query.address);
		const summary = await campaign.methods.getSummary().call();
		
		return {
			address : props.query.address,
			minimumContribution : summary[0],
			balance : summary[1],
			requestsCount : summary[2],
			approversCount : summary[3],
			manager : summary[4],
		};
	}

	renderCards() {
		const {
			minimumContribution,
			balance,
			requestsCount,
			approversCount,
			manager,
		} = this.props;

		const items = [
			{
				header: manager,
				description: 'Manager created this campaign and can create spending requests which withdraw money!',
				meta: 'Address of Manager',
				style : { overflowWrap : 'break-word' }
			},
			{
				header: minimumContribution,
				description: 'Minimum contribution needs to be made in order to become campaing Approvers!',
				meta: 'Minimum Contribution(wei)',
				style : { overflowWrap : 'break-word' }
			},
			{
				header: requestsCount,
				description: 'A request tries to withdraw money from the contract. Requests must be approved by Approvers!',
				meta: 'No of Requests',
				style : { overflowWrap : 'break-word' }
			},
			{
				header: approversCount,
				description: 'No of Contributors for the campaign!',
				meta: 'Contributors',
				style : { overflowWrap : 'break-word' }
			},
			{
				header: web3.utils.fromWei(balance),
				description: 'Balance is how much money the campaign has left to spend!',
				meta: 'Campaign Balance(ether)',
				style : { overflowWrap : 'break-word' }
			}
		];

		return <Card.Group items={items} />
	}

	render() {
		return (
			<div>
			<Layout>
				<h3>Campaign Show</h3>
				<Grid>

					<Grid.Column width={10}>
						{this.renderCards()}
					</Grid.Column>

					<Grid.Column width={6}>
						<ContributeForm address={this.props.address}/>
					</Grid.Column>

				</Grid>
			</Layout>
			</div>
		);
	}
}

export default CampaignShow;