//import { useState } from 'react'
import { Link } from 'wouter';
import RegisterForm from './from';
import character from '../../assets/character.png'
import './styles.css'

function Register() {
	//const [count, setCount] = useState(0)

	return (
		<div className='login'>
			<div
				style={{
					//width: '60%'
					width: '629px',
					height: '664px',
					position: 'relative',
				}}
			>
				<h1>Registrate</h1>
				<h2>Te invitamos a crear<br />tu cuenta</h2>
				<p>
					Si ya tienes una cuenta
					<br />
					puedes <Link href="/login">Iniciar sesión aquí !</Link>
				</p>
				<img
					src={character}
					className="character"
					alt="Saly-14"
					style={{
						right: 0,
						bottom: 0,
						position: 'absolute',
					}} />
			</div>
			<RegisterForm />
		</div>
	)
}

export default Register
