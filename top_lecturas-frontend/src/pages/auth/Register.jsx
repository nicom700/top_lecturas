import { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import {
    validateName,
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
} from './Validate';
import AuthService from 'src/services/auth';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';
import Input from 'src/components/forms/Input';
import Button from 'src/components/forms/Button';
import Logo from 'src/components/Logo';
import ErrorMsg from 'src/components/ErrorMsg';

export default function Register() {
    const { user, setUser, ready } = useUserContext();
    const [redirect, setRedirect] = useState(false);

    const formRef = useRef();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const [error, setError] = useState(null);
    const [nameE, setNameE] = useState(null);
    const [emailE, setEmailE] = useState(null);
    const [passwordE, setPasswordE] = useState(null);
    const [passwordConfirmationE, setPasswordConfirmationE] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(false);

    // const [name, setName] = useState();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    // const [passwordConfirmation, setPasswordConfirmation] = useState();

    async function handleRegisterSubmit(e) {
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

        await AuthService.registerUser(data)
            .then(async () => {
                return await AuthService.loginUser(data)
                    .then((data) => {
                        setUser(data);
                        setRedirect(true);
                    })
                    .catch((error) => {
                        setError(error.message);
                        setDisabledBtn(false);
                    });
            })
            .catch((error) => {
                setError(error.message);
                setDisabledBtn(false);
            });
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setError(null);
        if (name === 'name') setNameE(null);
        if (name === 'email') setEmailE(null);
        if (name === 'password') setPasswordE(null);
        if (name === 'passwordConfirmation') setPasswordConfirmationE(null);

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
        let errorMsgValidateName;
        let errorMsgValidateEmail;
        let errorMsgValidatePassword;
        let errorMsgValidatePasswordConfirmation;

        if (inputName == 'name' || formData) {
            errorMsgValidateName = formData
                ? validateName(formData.name)
                : validateName(values.name);
            if (errorMsgValidateName) setNameE(errorMsgValidateName);
        }
        if (inputName == 'email' || formData) {
            errorMsgValidateEmail = formData
                ? validateEmail(formData.email)
                : validateEmail(values.email);
            if (errorMsgValidateEmail) setEmailE(errorMsgValidateEmail);
        }
        if (inputName == 'password' || formData) {
            errorMsgValidatePassword = formData
                ? validatePassword(formData.password)
                : validatePassword(values.password);
            if (errorMsgValidatePassword)
                setPasswordE(errorMsgValidatePassword);
        }
        if (inputName == 'passwordConfirmation' || formData) {
            errorMsgValidatePasswordConfirmation = formData
                ? validatePasswordConfirmation(
                      formData.password,
                      formData.passwordConfirmation
                  )
                : validatePasswordConfirmation(
                      values.password,
                      values.passwordConfirmation
                  );
            if (errorMsgValidatePasswordConfirmation)
                setPasswordConfirmationE(errorMsgValidatePasswordConfirmation);
        }

        if (
            errorMsgValidateName ||
            errorMsgValidateEmail ||
            errorMsgValidatePassword ||
            errorMsgValidatePasswordConfirmation
        ) {
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
                    <TitleH1 text="Registrarte" />
                    <form
                        className="mx-auto"
                        onSubmit={handleRegisterSubmit}
                        ref={formRef}
                    >
                        {error && <ErrorMsg type="background" msg={error} />}

                        <Input
                            type="text"
                            name="name"
                            value={values.name}
                            placeholder="John Doe"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={nameE ? 'outline-red-500' : ''}
                        />
                        {nameE && <ErrorMsg msg={nameE} />}

                        <Input
                            type="email"
                            name="email"
                            value={values.email}
                            placeholder="tu@email.com"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={emailE ? 'outline-red-500' : ''}
                        />
                        {emailE && <ErrorMsg msg={emailE} />}

                        <Input
                            type="password"
                            name="password"
                            value={values.password}
                            placeholder="Contraseña"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={passwordE ? 'outline-red-500' : ''}
                        />
                        {passwordE && <ErrorMsg msg={passwordE} />}

                        <Input
                            type="password"
                            name="passwordConfirmation"
                            value={values.passwordConfirmation}
                            placeholder="Repetir contraseña"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                                passwordConfirmationE ? 'outline-red-500' : ''
                            }
                        />
                        {passwordConfirmationE && (
                            <ErrorMsg msg={passwordConfirmationE} />
                        )}

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
