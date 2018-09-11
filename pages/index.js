import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory.js';
import Layout from '../components/Layout.js';

class CampaignIndex extends Component {
	// Next js' static method
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();

		// NOTE : returns campaigns as a props to CampaignIndex component
		return { campaigns };
	}

	renderCampaigns() {
		const items = this.props.campaigns.map((address) => {
			return (
				{
				    header: address,
				    description: <a>View Campaign</a>,
				    fluid:true
				}
			);
		});

		return <Card.Group items={items} />
	}

	/*async componentDidMount() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();
		console.log('campaigns', campaigns);
	}*/

 	render() {
		return (
			<Layout>
				<div>
					<h3>Open Campaigns</h3>

					<Button 
						floated="right"
						content='Create Campaign'
						icon='add circle'
						primary
					/>

					{this.renderCampaigns()}

				</div>
			</Layout>
		);
	}

}

export default CampaignIndex;