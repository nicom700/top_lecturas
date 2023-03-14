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

export default function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();

    const [disabledBtn, setDisabledBtn] = useState(false);
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const { user, ready } = userContext();

    async function handleRegisterSubmit(e) {
        e.preventDefault();
        setDisabledBtn(true);

        if (password !== passwordConfirmation) {
            setError('Las contraseñas no coinciden');
            setDisabledBtn(false);
            return;
        }

        await AuthService.registerUser({ name, email, password })
            .then((res) => {
                setRedirect(true);
            })
            .catch((error) => {
                setError(error.message);
                setDisabledBtn(false);
            });
    }

    if (!ready) {
        return <Loading />;
    }

    if (user || redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="my-8 grow flex flex-col items-center justify-around">
            <div className="w-full max-w-4xl max-lg:flex-col max-lg:gap-8 max-md:px-2 max-lg:px-8 mb-12 flex justify-between items-center">
                <div>
                    <Logo className={'w-80 h-80 max-lg:w-48 max-lg:h-48 m-auto'} />
                </div>
                <div className="max-w-md w-full bg-white p-6 shadow-md rounded-xl">
                    <TitleH1 text="Registrarte" />
                    <form className="mx-auto" onSubmit={handleRegisterSubmit}>
                        {error && <ErrorMsg type="background" msg={error} />}

                        <Input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Repetir contraseña"
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                        />

                        <div className="py-4">
                            <Button
                                type="submit"
                                name="register"
                                value="Crear cuenta"
                                disabled={disabledBtn}
                            />

                            <div className="text-center py-4 text-gray-500">
                                <span>Ya tienes una cuenta? </span>
                                <Link
                                    className="underline font-semibold text-gray-700"
                                    to={'/login'}
                                >
                                    Iniciar sesión
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
