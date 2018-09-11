import React, {Component} from 'react';
import Layout from '../../components/Layout.js';
import { Form, Button, Input } from 'semantic-ui-react';

class CampaignNew extends Component {

	state = {
		minimumContribution : ''
	};

	onSubmit = (event) => {
		event.preventDefault();
	};

	render(){
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

							<Button style={{ marginTop : '10px' }} primary>Create!</Button>
						</Form.Field>
					</Form>
				</Layout>
			</div>
		);
	}
};

export default CampaignNew;