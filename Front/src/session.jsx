import { useContext } from 'react';
import { Link } from 'wouter';
import { userContext } from './context';
import { Logout, User, Survey } from './assets/ico';

import './App.css';

function Session() {
	const { user, logout } = useContext(userContext);

	if (user) {
		return (
			<div className='session'>
				<div>
					<Link href="/survey">
						<Survey />
					</Link>
				</div>
				<div>
					<Link href="/user">
					<User />
					</Link>
				</div>
				<div onClick={() => logout()}>
					<Logout />
				</div>
			</div>
		);
	} else {
		return null
	}
}

export default Session;