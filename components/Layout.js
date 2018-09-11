/*
	This consists of Header and Footer - reusable components for other components of the app
*/

import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';

export default (props) => {
	return(
		<Container>
			{/* Head tag will move link tag automatically to the Head tag of the HTML */}
			<Head>
				<link 
					rel="stylesheet" 
					href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css">
				</link>
			</Head>

			<Header />
			{props.children}
		</Container>
	);
}