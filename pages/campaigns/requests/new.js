import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Router, Link } from '../../../routes';

class RequestNew extends Component {

	static async getInitialProps(props) {
		const { address } = props.query;

		return { address };
	}

	state = {
		description : '',
		value		: '',
		recipient   : '',
		loading		: false,
		errorMessage: ''
	}

	onSubmit = async (event) => {
		event.preventDefault();

		this.setState({ loading : true, errorMessage : '' });

		const {
			description,
			value,
			recipient
		} = this.state;

		const campaign = await Campaign(this.props.address);
		
		try{
			const accounts = await web3.eth.getAccounts();

			await campaign.methods.createRequest(
				description,
				web3.utils.toWei(value, 'ether'),
				recipient
			).send({
				from : accounts[0]
			});

			Router.pushRoute(`/campaigns/${this.props.address}/requests`);

		} catch(err) {
			this.setState({ errorMessage : err.message });
		}

		this.setState({ loading : false });

	}

	render() { 

		let Error;

		if(this.state.errorMessage){
			Error = <Message negative header='Oops!' content={this.state.errorMessage} />;
		}

		return(
			<Layout>

				<Link route={`/campaigns/${this.props.address}/requests`}>
					<a>Back</a>
				</Link>

				<h3>Create a Request</h3>

				<Form onSubmit={this.onSubmit}>
					<Form.Field>

						<label>Description</label>
						<Input 
							value={this.state.description}
							onChange={(event) => 
								this.setState({description: event.target.value })} />


						<label>Amount in ether</label>
						<Input 
							label='ether' 
							labelPosition='right'
							value={this.state.value}
							onChange={(event) => 
								this.setState({value: event.target.value })} />


						<label>Recipient</label>
						<Input 
							value={this.state.recipient}
							onChange={(event) => 
								this.setState({recipient: event.target.value })} />

						<Button 
							primary 
							loading={ this.state.loading }
							style={{ marginTop : '10px' }}>

							Create!
						</Button>

						{ Error }

					</Form.Field>
				</Form>
			</Layout>
		);
	}
}

export default RequestNew;