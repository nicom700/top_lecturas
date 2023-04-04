import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import AuthService from 'src/services/auth';
import Loading from 'src/components/Loading';
import Button from 'src/components/forms/Button';
import Avatar from 'avataaars';
import Input from 'src/components/forms/Input';
import {
    validateName,
    validateEmail,
    validateForUpdatePassword,
} from 'src/pages/auth/Validate';
import ErrorMsg from 'src/components/ErrorMsg';
import { toast, Toaster } from 'react-hot-toast';

export default function ProfileForm() {
    const { user, setUser, ready } = useUserContext();
    const [redirect, setRedirect] = useState(null);

    const [values, setValues] = useState(null);

    const [error, setError] = useState(null);
    const [nameE, setNameE] = useState(null);
    const [emailE, setEmailE] = useState(null);
    const [passwordE, setPasswordE] = useState(null);
    const [passwordConfirmationE, setPasswordConfirmationE] = useState(null);
    const [disabledBtn, setDisabledBtn] = useState(false);

    const [avatarComponent, setAvatarComponent] = useState(null);

    const formRef = useRef();

    useEffect(() => {
        if (!ready) return;
        if (!user.name || !user.email || !user.avatar) return;

        setTimeout(() => {
            setValues({
                name: user.name,
                email: user.email,
                password: '',
                passwordConfirmation: '',
                avatar: user.avatar,
            });
        }, 100);
    }, [ready]);

    useEffect(() => {
        if (!ready || !user.avatar) return setAvatarComponent(null);

        setTimeout(() => {
            setAvatarComponent(
                <Avatar
                    style={{ width: '100%', height: '100%' }}
                    avatarStyle="Circle"
                    {...user.avatar}
                />
            );
            setDisabledBtn(false);
        }, 100);
    }, []);

    async function handleSaveSubmit(e) {
        e.preventDefault();
        setDisabledBtn(true);

        let data = {};
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => (data[key] = value));

        if (!validate(data)) {
            setError('Error de validación');
            setDisabledBtn(false);
            toast.error('Algo salió mal.', {className: 'dark:text-gray-300 dark:bg-zinc-700'});
            return;
        }

        //console.log('fechingDataProfile:', data);
        await AuthService.updateUser(data)
            .then((res) => {
                if(Object.entries(res).length === 0) throw new Error('No se pudo guardar.');
                setUser(res);
                setDisabledBtn(false);
                toast.success('Guardado.', {className: 'dark:text-gray-300 dark:bg-zinc-700'});
            })
            .catch((error) => {
                setError(error.message);
                setDisabledBtn(false);
                toast.error('Algo salió mal.', {className: 'dark:text-gray-300 dark:bg-zinc-700'});
            });
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setError(null);
        if (name === 'name') setNameE(null);
        if (name === 'email') setEmailE(null);
        if (name === 'password' || name === 'passwordConfirmation') {
            setPasswordE(null);
            setPasswordConfirmationE(null);
        }

        const newValues = {
            ...values,
            [name]: value,
        };

        setValues(newValues);
    }

    function handleBlur() {
        validate();
    }

    function validate(formData = null) {
        let errorMsgValidateName;
        let errorMsgValidateEmail;
        let errorMsgValidatePassword;

        errorMsgValidateName = formData
            ? validateName(formData.name)
            : validateName(values.name);
        if (errorMsgValidateName) setNameE(errorMsgValidateName);

        errorMsgValidateEmail = formData
            ? validateEmail(formData.email)
            : validateEmail(values.email);
        if (errorMsgValidateEmail) setEmailE(errorMsgValidateEmail);

        errorMsgValidatePassword = formData
            ? validateForUpdatePassword(
                  formData.password,
                  formData.passwordConfirmation
              )
            : validateForUpdatePassword(
                  values.password,
                  values.passwordConfirmation
              );
        if (errorMsgValidatePassword) {
            setPasswordE(errorMsgValidatePassword);
            setPasswordConfirmationE(errorMsgValidatePassword);
        }

        if (
            errorMsgValidateName ||
            errorMsgValidateEmail ||
            errorMsgValidatePassword
        ) {
            return false;
        }

        return true;
    }

    if (!ready) {
        return <Loading />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <form onSubmit={handleSaveSubmit} ref={formRef}>
            <Toaster position="top-right" />
            <div className="grid grid-cols-4 grid-rows-1 grid-flow-row-dense gap-6 max-lg:flex max-lg:flex-col">
                <div className="col-start-2 col-span-3 flex gap-2">
                    {error && <ErrorMsg type="background" msg={error} />}
                </div>
            </div>
            <div className="mb-4 flex justify-center gap-6 max-lg:flex-col">
                <div className="w-[290px] max-sm:w-52 flex flex-col items-center gap-2 mx-auto">
                    <div className="p-4 flex items-center justify-center border border-gray-300 dark:border-zinc-600 rounded-xl">
                        <div className="w-64 h-64 max-sm:w-48 max-sm:h-48">
                            {avatarComponent ? avatarComponent : <Loading />}
                        </div>
                    </div>
                </div>
                <div className="w-full min-h-fit bg-slate-100 dark:bg-bgDarkSecondary rounded-xl max-md:p-6 p-8 text-gray-700 dark:text-gray-300">
                    {values ? (
                        <div className="h-full grid grid-cols-2 gap-4 max-md:flex max-md:flex-col max-md:gap-2">
                            <div className="flex flex-col">
                                <div className="">Nombre de usuario:</div>
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
                            </div>
                            <div className="flex flex-col">
                                <div className="">Email:</div>
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
                            </div>
                            <div className="flex flex-col">
                                <div className="">Contraseña:</div>
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
                            </div>
                            <div className="flex flex-col">
                                <div className="">Repetir contraseña:</div>
                                <Input
                                    type="password"
                                    name="passwordConfirmation"
                                    value={values.passwordConfirmation}
                                    placeholder="Repetir contraseña"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        passwordConfirmationE
                                            ? 'outline-red-500'
                                            : ''
                                    }
                                />
                                {passwordConfirmationE && (
                                    <ErrorMsg msg={passwordConfirmationE} />
                                )}
                            </div>
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-4 grid-rows-1 grid-flow-row-dense gap-6 max-lg:flex max-lg:flex-col">
                <div className="col-start-4 flex gap-2">
                    <Button
                        type="submit"
                        name="save"
                        value="Guardar"
                        disabled={disabledBtn}
                    />
                    <Button
                        type="button"
                        name="cancel"
                        value="Cancelar"
                        onClick={() => setRedirect('/')}
                    />
                </div>
            </div>
        </form>
    );
}
