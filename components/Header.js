import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
	return (
		<Menu style={{ marginTop : '20px' }}>
			{/*
				Need to use Link so can't use Menu.Item, it causes style mismatch.
				Menu.Item & Link are not css style compatible.

				<Menu.Item>
					KickstartCoin
				</Menu.Item>
			*/}

			<Link route='/'>
				<a className="item">KickstartCoin</a>
			</Link>

			<Menu.Menu position="right">

				<Link route='/'>
					<a className="item">Campaigns</a>
				</Link>

				<Link route='/campaigns/new'>
					<a className="item">+</a>
				</Link>

			</Menu.Menu>
		</Menu>
	)
}
