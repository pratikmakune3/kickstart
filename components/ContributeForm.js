import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {

	state = {
		value : '',
		loading : false,
		errorMessage : ''
	}

	onSubmit = async (event) => {
		event.preventDefault();
		this.setState({ loading : true });
		const campaign = await Campaign(this.props.address);

		try{
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.contribute().send({
				from : accounts[0],
				value: web3.utils.toWei(this.state.value, 'ether')
			});
			// Auto-page Refresh !
			Router.replaceRoute(`/campaigns/${this.props.address}`);
		} catch(err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading : false });
	}

	render() {
		let Error;
		if(this.state.errorMessage){
			Error = <Message negative header='Oops!' content={this.state.errorMessage} />;
		}
		return (
			<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label>Amount to Contribute</label>
					<Input 
						label='ether'
						labelPosition='right'
						value={this.state.value}
						onChange={ event => this.setState({ value : event.target.value })}
					/>
					<Button 
						primary 
						style={{ marginTop : '10px' }}
						loading={this.state.loading} 
					>
						Contribute
					</Button>
					{Error}
				</Form.Field>
			</Form>
		)
	}
}

export default ContributeForm;