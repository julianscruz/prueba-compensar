/* eslint-disable react/prop-types */
//import React from 'react';
import './survey-form.css';

function Question({ id, register, errors }) {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			flexWrap: 'nowrap',
			alignItems: 'baseline',
			gap: 16,
		}}>
			<label htmlFor={`pregunta-${id}`}>{`Pregunta ${id}`}</label>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				gap: 40
			}}>
				<span className='question-option'>
					<input
						type="radio"
						id={`pregunta-${id}-a`}
						name={`pregunta-${id}`}
						value="A"
						{...register(`Pregunta ${id}`, { required: true })}
					/>
					<label htmlFor={`pregunta-${id}-a`}>A</label>
				</span>

				<span className='question-option'>
					<input
						type="radio"
						id={`pregunta-${id}-b`}
						name={`pregunta-${id}`}
						value="B"
						{...register(`Pregunta ${id}`, { required: true })}
					/>
					<label htmlFor={`pregunta-${id}-b`}>B</label>
				</span>

				<span className='question-option'>
					<input
						type="radio"
						id={`pregunta-${id}-c`}
						name={`pregunta-${id}`}
						value="C"
						{...register(`Pregunta ${id}`, { required: true })}
					/>
					<label htmlFor={`pregunta-${id}-c`}>C</label>
				</span>

				<span className='question-option'>
					<input
						type="radio"
						id={`pregunta-${id}-d`}
						name={`pregunta-${id}`}
						value="D"
						{...register(`Pregunta ${id}`, { required: true })}
					/>
					<label htmlFor={`pregunta-${id}-d`}>D</label>
				</span>
			</div>
			{errors[`Pregunta ${id}`] && <span className="error-message">{`La pregunta ${id} es requerida`}</span>}
		</div>
	);
}

export default Question;
