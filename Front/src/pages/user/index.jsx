import { useContext } from 'react';
import { userContext } from '../../context';

import './styles.css';

function User() {
	const { user, survey } = useContext(userContext);

	let surveyData = survey ? survey : user.survey !== undefined ? JSON.parse(user.survey) : null;
	
	return (
		<>
			<div className='user'>
				<h3>Usuario</h3>
				<>
					<div className="user-info">
						<div className="user-info-item">
							<span className="user-info-title">Nombre de usuario:</span>
							<span className="user-info-data">{user.user}</span>
						</div>
						<div className="user-info-item">
							<span className="user-info-title">Email:</span>
							<span className="user-info-data">{user.mail}</span>
						</div>
						<div className="user-info-item">
							<span className="user-info-title">Número de celular:</span>
							<span className="user-info-data">{user.phone}</span>
						</div>
					</div>
				</>
				{surveyData && (
					<>
						<h3>Encuesta</h3>
						<>
							<div className="user-info">
								<div className="user-info-item">
									<span className="user-info-title">Fecha:</span>
									<span className="user-info-data">{surveyData.fecha}</span>
								</div>
								<div className="user-info-item">
									<span className="user-info-title">Pregunta 1:</span>
									<span className="user-info-data">{surveyData['Pregunta 1']}</span>
								</div>
								<div className="user-info-item">
									<span className="user-info-title">Pregunta 2:</span>
									<span className="user-info-data">{surveyData['Pregunta 2']}</span>
								</div>
								<div className="user-info-item">
									<span className="user-info-title">Pregunta 3:</span>
									<span className="user-info-data">{surveyData['Pregunta 3']}</span>
								</div>
								<div className="user-info-item">
									<span className="user-info-title">Pregunta 4:</span>
									<span className="user-info-data">{surveyData['Pregunta 4']}</span>
								</div>
							</div>
						</>

					</>
				)}
			</div>
		</>
	);
}

export default User;