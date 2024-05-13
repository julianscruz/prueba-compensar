/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { userContext } from '../../context';
import { useForm } from "react-hook-form";
import spinner from '../../assets/spinner.svg';
import Question from "./question";
import './survey-form.css';

function SurveyForm({ setViewSuccess, setSurveyState }) {
	const { user, apiURL, setSurvey } = useContext(userContext);	
	const [errorMessage, setErrorMessage] = useState('');
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		const dataString = JSON.stringify(data);

		try {
			setLoading(true);
			const response = await fetch(`${apiURL}/survey`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"email": user.mail,
					"user": user.user,
					"survey": dataString,
				}),
			});

			const responseData = await response.json();
			//console.log('responseData', responseData);
			setErrorMessage(responseData.message);

			if (responseData.message === 'Encuesta completada exitosamente') {
				setViewSuccess(true);
				setSurveyState(true);
				setSurvey(data)
			}

			setLoading(false);

		} catch (error) {
			console.error(error);
			setLoading(false);
			setErrorMessage('Error al procesar la solicitud');
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="survey-form"
				style={{
					marginTop: '80px',
					width: '100%',
					padding: '10px',
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'nowrap',
					alignItems: 'baseline',
					gap: 38,
				}}
			>
				<div style={{ width: '440px' }}>
					<label htmlFor="fecha">Fecha</label>
					<input
						type="date"
						id="fecha"
						name="fecha"
						{...register("fecha", { required: true })}
					/>
					{errors.fecha && <span className="error-message">La fecha es requerida</span>}
				</div>

				<Question id={1} register={register} errors={errors} />
				<Question id={2} register={register} errors={errors} />
				<Question id={3} register={register} errors={errors} />
				<Question id={4} register={register} errors={errors} />

				{errorMessage && <span className="error-message">{errorMessage}</span>}

				{loading && <img src={spinner} alt="load" style={{ width: '30px', height: '30px', marginLeft: 'auto', marginRight: 'auto' }} />}
				<input type="submit" value="Enviar" />
			</form>
		</>
	);
}

export default SurveyForm;
