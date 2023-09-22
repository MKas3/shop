import SafeInput from '../components/SafeInput.tsx';
import {FieldValues, useForm} from 'react-hook-form';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/consts.ts';
import Button from '../components/Button.tsx';
import {login, registration} from '../http/userAPI.ts';
import {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../main.tsx';

const AuthPage = observer(() => {
	const {user} = useContext(Context);
	const [emailUsername, setEmailUsername] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {register, handleSubmit} = useForm();
	const location = useLocation();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const navigate = useNavigate();

	const handleAuthorization = async(_: FieldValues) => {
		try {
			let data;
			if (isLogin) {
				data = await login(emailUsername, password);
			} else {
				data = await registration(username, email, password);
			}
			user.setUser(data);
			user.setIsAuth(true);
			navigate(SHOP_ROUTE);
		}
		catch (e: any) {
			alert(e.response.data.message)
		}
	};

	return (
		<div className="flex justify-center items-center min-h-[75vh]">
			<div className="block min-w-[30%]">
				<p className="font-bold text-center mb-5 text-2xl">{isLogin ? 'Welcome back!' : 'Become a part of the team!'}</p>
				<form
					onSubmit={handleSubmit(data => handleAuthorization(data))}
					className="block w-full h-full bg-indigo-800/50 border-[1px] border-indigo-900 px-10 pt-8 pb-10 rounded-lg"
				>
					<div className="mb-2">
						{isLogin
							? <SafeInput
								title="Username or Email address"
								register={register}
								value={emailUsername}
								onChange={(e) => setEmailUsername(e.currentTarget.value)}
							/>
							: <>
								<SafeInput
									title="Username"
									register={register}
									maxLength={40}
									minLength={6}

									value={username}
									onChange={(e) => setUsername(e.currentTarget.value)}
								/>
								<SafeInput
									title="Email address"
									register={register}
									pattern={/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/g}
									className="my-2"
									value={email}
									onChange={(e) => setEmail(e.currentTarget.value)}
								/>
							</>
						}

					</div>
					<SafeInput
						title="Password"
						type="password"
						register={register}
						minLength={6}
						maxLength={40}
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<Button type="submit" className="w-full mt-5">{isLogin ? 'Sign in' : 'Sign up'}</Button>
				</form>
				<div className="text-center mt-4  border-[1px] border-indigo-500/50 rounded-md py-4">
					<span>
						{isLogin
							? 'Don\'t have an account?'
							: 'Do you already have an account?'
						}
					</span>
					<Link className="text-indigo-300 hover:text-indigo-100 ml-2 transition duration-75"
						  to={isLogin
							  ? REGISTRATION_ROUTE
							  : LOGIN_ROUTE
						  }>
						{isLogin ? 'Register' : 'Sign in'}
					</Link>
				</div>

			</div>

		</div>
	);
});

export default AuthPage;