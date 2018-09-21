import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout'; 

class RequestsIndex extends Component {

	static async getInitialProps(props) {
		const { address } = props.query;

		return { address };	
	}

	render() {
		return (
			<Layout>
				<h1>View Requests</h1>
				<Link route={`/campaigns/${this.props.address}/requests/new`}>
					<a>
						<Button>Add Request</Button>
					</a>
				</Link>
			</Layout>
		);
	}
}

export default RequestsIndex;