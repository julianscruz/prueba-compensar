import { useContext, useState } from 'react';
import { userContext } from '../../context';
import { useForm } from 'react-hook-form';
import spinner from '../../assets/spinner.svg';
import facebook from '../../assets/Facebook.svg';
import apple from '../../assets/apple.svg';
import google from '../../assets/google.svg';
import '../form.css';

function LoginForm() {
	const { setUser, apiURL } = useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			setLoading(true);

			const response = await fetch(`${apiURL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseData = await response.json();
			setErrorMessage(responseData.message);

			if (response.status === 200) {
				setUser(responseData.data);
			}

			setLoading(false);
		} catch (error) {
			console.error(error);
			setErrorMessage('Error al procesar la solicitud');
			setLoading(false);
		}
	};


	return (
		<div style={{ width: '369px' }}>
			<h3>Iniciar sesión</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'nowrap',
					alignItems: 'flex-start',
					gap: 38,
				}}
			>
				<span className="mailOrUser-field">
					<input
						{...register('emailOrUser', { required: 'Email o nombre de usuario es requerido' })}
						placeholder="Email o nombre de usuario"
					/>
					{errors.emailOrUser && <span className="error-message">{errors.emailOrUser.message}</span>}
				</span>
				<span className="password-field">
					<input
						{...register("password", { required: 'Contraseña es requerida' })}
						placeholder="Contraseña"
						type="password"
					/>
					{errors.password && <span className="error-message">{errors.password.message}</span>}
					<a href="#" className="forgot-password">
						¿Olvidaste tu contraseña?
					</a>
				</span>
				{errorMessage && <span className="error-message">{errorMessage}</span>}
				{loading && <img src={spinner} alt="load" style={{ width: '30px', height: '30px', marginLeft: 'auto', marginRight: 'auto' }} />}
				<input type="submit" value="Iniciar sesión" disabled={loading} />

			</form>
			<section className="other-options">
				<p>o continúa con</p>
				<span>
					<img src={facebook} alt="facebook" />
					<img src={apple} alt="apple" />
					<img src={google} alt="google" />
				</span>
			</section>
		</div>
	);
}

export default LoginForm;
