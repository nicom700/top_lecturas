import { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { userContext } from 'src/userContext';
import { validateEmail, validatePassword } from './Validate';
import AuthService from 'src/services/auth';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';
import Input from 'src/components/forms/Input';
import Button from 'src/components/forms/Button';
import Logo from 'src/components/Logo';
import ErrorMsg from 'src/components/ErrorMsg';

export default function Login() {
    const { user, setUser, ready } = userContext();
    const [redirect, setRedirect] = useState(false);

    const formRef = useRef();
    const [values, setValues] = useState({ email: '', password: '' });

    const [error, setError] = useState(null);
    const [emailE, setEmailE] = useState(null);
    const [passwordE, setPasswordE] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(false);

    async function handleLoginSubmit(e) {
        e.preventDefault();
        setDisabledBtn(true);

        let data = {};
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => (data[key] = value));

        if (!validate(null, data)) {
            setError('Error de validación');
            setDisabledBtn(false);
            return;
        }

        await AuthService.loginUser(data)
            .then((data) => {
                setUser(data);
                setRedirect(true);
            })
            .catch((error) => {
                setError(error.message);
                setDisabledBtn(false);
            });
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setError(null);
        if (name === 'email') setEmailE(null);
        if (name === 'password') setPasswordE(null);

        const newValues = {
            ...values,
            [name]: value,
        };

        setValues(newValues);
    }

    function handleBlur(e) {
        const { name } = e.target;
        validate(name, null);
    }

    function validate(inputName = null, formData = null) {
        let errorMsgvalidateEmail;
        let errorMsgvalidatePassword;

        if (inputName == 'email' || formData) {
            errorMsgvalidateEmail = formData
                ? validateEmail(formData.email)
                : validateEmail(values.email);
            if (errorMsgvalidateEmail) setEmailE(errorMsgvalidateEmail);
        }
        if (inputName == 'password' || formData) {
            errorMsgvalidatePassword = formData
                ? validatePassword(formData.password)
                : validatePassword(values.password);
            if (errorMsgvalidatePassword)
                setPasswordE(errorMsgvalidatePassword);
        }

        if (errorMsgvalidateEmail || errorMsgvalidatePassword) {
            return false;
        }

        return true;
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
                    <Logo
                        className={'w-80 h-80 max-lg:w-48 max-lg:h-48 m-auto'}
                    />
                </div>
                <div className="max-w-md w-full bg-white p-6 shadow-md rounded-xl">
                    <TitleH1 text="Iniciar sesión" />
                    <form
                        className="mx-auto"
                        onSubmit={handleLoginSubmit}
                        ref={formRef}
                    >
                        {error && <ErrorMsg type="background" msg={error} />}

                        <Input
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={emailE ? 'border-red-500' : ''}
                        />
                        {emailE && <ErrorMsg msg={emailE} />}

                        <Input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onChange={handleChange}
                            onBlur={handleBlur}
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
