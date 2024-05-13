/* eslint-disable react/prop-types */
import success from '../../assets/success.svg'
import './styles.css';

function Success({ setViewSuccess, setViewModal }) {

	const handleTerminarClick = () => {
		setViewSuccess(false);
		setViewModal(false);
	};

	return (
		<div className="success">
			<div className="success-modal">
				<img src={success} alt="success"/>
				<h3>Tus respuestas se han guardado de manera correcta</h3>
				<button onClick={handleTerminarClick}>Terminar</button>
			</div>
		</div>
	);
}

export default Success;
