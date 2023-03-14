import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { userContext } from 'src/userContext';
import AuthService from 'src/services/auth';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';
import Input from 'src/components/forms/Input';
import Button from 'src/components/forms/Button';
import Logo from 'src/components/Logo';
import ErrorMsg from 'src/components/ErrorMsg';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [disabledBtn, setDisabledBtn] = useState(false);

    const [emailE, setEmailE] = useState(null);
    const [passwordE, setPasswordE] = useState(null);

    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const { user, setUser, ready } = userContext();

    async function handleLoginSubmit(e) {
        e.preventDefault();
        setDisabledBtn(true);

        if (!validate()) {
            console.log('No se pudo validar los datos');
            setDisabledBtn(false);
            return;
        }

        try {
            await AuthService.loginUser({ email, password })
                .then((data) => {
                    setUser(data);
                    setRedirect(true);
                })
                .catch((error) => {
                    setError(error.message);
                    setDisabledBtn(false);
                });
        } catch (error) {
            setError('Error al iniciar sesión, intente mas tarde');
            setDisabledBtn(false);
        }
    }

    if (!ready) {
        return <Loading />;
    }

    if (user || redirect) {
        return <Navigate to={'/'} />;
    }

    function validate() {
        if (!email) {
            setEmailE(['* Email es obligatorio']);
        }
        if (!password) {
            setPasswordE(['* Contraseña es obligatorio']);
        }

        if (!email || !password) {
            return false;
        }
        return true;
    }

    function onEmailChange(e) {
        setEmailE(null);
        setError(null);
        setEmail(e.target.value);
    }

    function onPasswordChange(e) {
        setPasswordE(null);
        setError(null);
        setPassword(e.target.value);
    }

    return (
        <div className="my-8 grow flex flex-col items-center justify-around">
            <div className="w-full max-w-4xl max-lg:flex-col max-lg:gap-8 max-md:px-2 max-lg:px-8 mb-12 flex justify-between items-center">
                <div>
                    <Logo
                        className={'w-80 h-80 max-lg:w-48 max-lg:h-48 m-auto'}
                    />
                </div>
                <div className="max-w-md w-full bg-white p-6 shadow-md rounded-xl">
                    <TitleH1 text="Iniciar sesión" />
                    <form className="mx-auto" onSubmit={handleLoginSubmit}>
                        {error && <ErrorMsg type="background" msg={error} />}

                        <Input
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            onChange={onEmailChange}
                            error={emailE ? 'border-red-500' : ''}
                        />
                        {emailE && <ErrorMsg msg={emailE} />}

                        <Input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onChange={onPasswordChange}
                            error={passwordE ? 'border-red-500' : ''}
                        />
                        {passwordE && <ErrorMsg msg={passwordE} />}

                        <div className="py-4">
                            <Button
                                type="submit"
                                name="login"
                                value="Ingresar"
                                disabled={disabledBtn}
                            />
                            <div className="text-center py-4 text-gray-500">
                                <span>Aún no tienes cuenta? </span>
                                <Link
                                    className="underline font-semibold text-gray-700"
                                    to={'/register'}
                                >
                                    Regístrate
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
