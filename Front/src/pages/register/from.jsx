import { useContext, useState } from 'react';
import { userContext } from '../../context';
import { useForm } from "react-hook-form";
import spinner from '../../assets/spinner.svg';
import facebook from '../../assets/Facebook.svg'
import apple from '../../assets/apple.svg'
import google from '../../assets/google.svg'
import '../form.css'

function RegisterForm() {
	const { register, handleSubmit, formState: { errors }, getValues } = useForm();
	const { setUser, apiURL } = useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = async (data) => {
		try {
			setLoading(true);
			const response = await fetch(`${apiURL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"email": data.mail,
					"user": data.user,
					"phone": data.phone,
					"password": data.password,
				}),
			});

			const responseData = await response.json();
			//console.log('responseData', responseData);
			setErrorMessage(responseData.message);

			if (response.status === 201) {
				setUser(responseData.data)
			}

			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
			setErrorMessage('Error al procesar la solicitud');
		}
	};

	return (
		<div style={{ width: '369px' }}>
			<h3>Registro</h3>
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
				<span>
					<input
						{...register("mail", {
							required: true,
							pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ // Validación de email
						})}
						placeholder="Email"
						inputMode="email"
					/>
					{errors.mail && errors.mail.type === "required" && <span className="error-message">Email es requerido</span>}
					{errors.mail && errors.mail.type === "pattern" && <span className="error-message">Email inválido</span>}
				</span>

				<span>
					<input
						{...register("user", { required: true })}
						placeholder="Nombre de usuario"
					/>
					{errors.user && <span className="error-message">Nombre de usuario es requerido</span>}
				</span>

				<span>
					<input
						{...register("phone", {
							required: true,
							pattern: /^[0-9]*$/ // Validación de número
						})}
						placeholder="Número de celular"
						inputMode="tel"
					/>
					{errors.phone && errors.phone.type === "required" && <span className="error-message">Número de celular es requerido</span>}
					{errors.phone && errors.phone.type === "pattern" && <span className="error-message">Número de celular debe ser un número</span>}
				</span>

				<span>
					<input
						{...register("password", { required: true })}
						placeholder="Contraseña"
						type="password"
					/>
					{errors.password && <span className="error-message">Contraseña es requerida</span>}
				</span>
				<span>
					<input
						{...register("passwordConfirm", {
							required: true,
							validate: (value) => value === getValues("password") || "Las contraseñas no coinciden" // Validación de coincidencia de contraseñas
						})}
						placeholder="Confirmar contraseña"
						type="password"
					/>
					{errors.passwordConfirm && <span className="error-message">{errors.passwordConfirm.message}</span>}
				</span>

				{errorMessage && <span className="error-message">{errorMessage}</span>}

				{loading && <img src={spinner} alt="load" style={{ width: '30px', height: '30px', marginLeft: 'auto', marginRight: 'auto' }} />}
				<input type="submit" value="Registrarte" disabled={loading} />
			</form>
			<section className="other-options">
				<p>
					o continúa con
				</p>
				<span>
					<img src={facebook} alt="facebook" />
					<img src={apple} alt="apple" />
					<img src={google} alt="google" />
				</span>
			</section>
		</div>

	)
}

export default RegisterForm;
