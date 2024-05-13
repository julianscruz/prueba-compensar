import { useContext, useState, useEffect } from 'react';
import { userContext } from '../../context';
import cross from '../../assets/Cross.svg';
import SurveyForm from './from';
import Success from './success';
import './styles.css';

function Survey() {
	const { user, survey } = useContext(userContext);
	const hasSurvey = (user.survey?.length > 1);
	const [viewModal, setViewModal] = useState(!hasSurvey);
	const [surveyState, setSurveyState] = useState(true);
	const [viewSuccess, setViewSuccess] = useState(false);

	useEffect(() => {
		if ((user.survey && user.survey?.length > 1) || survey) {
			setSurveyState(true)
		} else {
			setSurveyState(false)
		}
	}, [user, survey]);

	return (
		<>
			<div className='survey'>
				{!viewModal && (
					<>
						<h3>Encuesta</h3>
						{surveyState ? (<p>La encuesta ya ha sido realizada</p>) : null}
						<button onClick={() => setViewModal(true)} disabled={surveyState}>
							<span>Realizar Encuesta</span>
						</button>
					</>
				)}
			</div>
			{viewModal && (
				<div className='survey-modal'>
					<h3>Encuesta</h3>
					<button onClick={() => setViewModal(false)}>
						<img src={cross} alt="Close" />
					</button>
					<SurveyForm setViewModal={setViewModal} setSurveyState={setSurveyState} setViewSuccess={setViewSuccess}/>
				</div>
			)}
			{viewSuccess && <Success setViewModal={setViewModal} setViewSuccess={setViewSuccess} />}
		</>
	);
}

export default Survey;