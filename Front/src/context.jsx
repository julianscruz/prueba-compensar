/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
const apiURL = 'https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com';
//const apiURL = 'http://localhost:3000';

export const userContext = createContext(null);

const ContextProvider = ({ children }) => {
	const [user, setUser] = useState(false);
	const [survey, setSurvey] = useState(false);

	useEffect(() => {
		sessionStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		const storedUser = sessionStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const logout = () => {
		sessionStorage.removeItem('user');
		setUser(false);
	};

	return (
		<userContext.Provider value={{ user, setUser, apiURL, logout, survey, setSurvey }}>
			{children}
		</userContext.Provider>
	);

};

export default ContextProvider;
