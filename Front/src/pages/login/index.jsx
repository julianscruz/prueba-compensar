//import { useState } from 'react'
import { Link } from 'wouter';
import LoginForm from './from';
import character from '../../assets/character.png'
import './styles.css'

function Login() {
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
				<h1>Bienvenido</h1>
				<h2>Ingresa y disfruta</h2>
				<p>
					Si aún no tienes una cuenta
					<br />
					puedes <Link href="/register">Registrate aquí!</Link>
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
			<LoginForm />
		</div>
	)
}

export default Login
