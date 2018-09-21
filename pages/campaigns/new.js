import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {

	state = {
		minimumContribution : '',
		errorMessage : '',
		loading : false
	};

	onSubmit = async (event) => {
		event.preventDefault();
		this.setState({loading : true, errorMessage : ''});
		try{
			const accounts = await web3.eth.getAccounts();
			await factory.methods.createCampaign(this.state.minimumContribution)
				.send({
					from : accounts[0]
					// No need to specify gas as Metamask evaluates it!
				});
			Router.pushRoute('/');
		}catch(err) {
			this.setState({ errorMessage : err.message });
		}
		this.setState({loading : false});
	};

	render(){
		let Error;

		if(this.state.errorMessage) {
			Error = <Message negative header='Oops!' content={this.state.errorMessage} />
		}

		return (
			<div>
				<Layout> 
					<h3>Create Campaign</h3>
					<Form onSubmit={this.onSubmit}>
						<Form.Field>
							<label>Minimum Contribution</label>
							<Input 
								label='wei' 
								labelPosition='right' 
								value={this.state.minimumContribution}
								onChange={(event) => 
									this.setState({minimumContribution: event.target.value })}
							/>

							{Error}

							<Button loading={this.state.loading} style={{ marginTop : '10px' }} primary>Create!</Button>
						</Form.Field>
					</Form>
				</Layout>
			</div>
		);
	}
};

export default CampaignNew;