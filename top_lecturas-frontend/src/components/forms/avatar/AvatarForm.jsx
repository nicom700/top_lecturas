import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import { configs } from './config';
import AuthService from 'src/services/auth';
import Loading from 'src/components/Loading';
import Select from 'src/components/forms/Select';
import Button from 'src/components/forms/Button';
import ErrorMsg from 'src/components/ErrorMsg';
import Avatar from 'avataaars';

export default function AvatarForm() {
    const { user, ready, updateAvatar } = useUserContext();
    const [redirect, setRedirect] = useState(null);
    const [updateUser, setUpdateUser] = useState(false);

    const [disabledBtn, setDisabledBtn] = useState(false);
    const [error, setError] = useState(null);

    const [avatarComponent, setAvatarComponent] = useState(null);
    const [values, setValues] = useState(null); // values selected in select
    const [selectInputs, setSelectInputs] = useState(null); // list of options in selects
    const [updateAvatarState, setUpdateAvatarState] = useState(null); // (random or change)
    const [randomOptions, setRandomOptions] = useState({}); // full random list of options
    const [newOptions, setNewOptions] = useState({}); // full selected list of options

    const formRef = useRef();

    useEffect(() => {
        
        if (!selectInputs || !values) {
            //console.log('useEffect_1_loadValues');
            setTimeout(() => {
                setSelectInputs(configs);
                setValues(user.avatar);
            }, 100);
        }
        
        if (!updateAvatarState) return;
        //console.log('useEffect_1');

        if (updateAvatarState === 'random') setValues(randomOptions); // update selects
        if (updateAvatarState === 'change') setValues(newOptions);

        setAvatarComponent(null);
        setUpdateAvatarState(null);
    }, [updateAvatarState]);

    useEffect(() => {
        if (!values) return setAvatarComponent(null);
        //console.log('useEffect_2');

        setTimeout(() => {
            setAvatarComponent(
                <Avatar
                    style={{ width: '250px', height: '250px' }}
                    avatarStyle="Circle"
                    {...values}
                />
            );
        }, 100);
    }, [values]);

    useEffect(() => {
        if (!updateUser) return;
        //console.log('useEffect_3_save');

        async function saveAvatar() {
            let data = {};
            const formData = new FormData(formRef.current);
            formData.forEach((value, key) => (data[key] = value));
    
            return await AuthService.updateAvatar(data)
                .then((res) => {
                    //console.log('res:', res);    
                    updateAvatar(res.avatar);
                    setUpdateUser(false);
                    return res;
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    
        saveAvatar();

    }, [updateUser]);

    function handleSaveSubmit(e) {
        e.preventDefault();
        setUpdateUser(true);
    }

    function handleRandom(e) {
        e.preventDefault();
        setUpdateAvatarState('random');

        let newRandomOptions = generateRandomAvatarOptions();
        setRandomOptions(newRandomOptions);
    }

    function handleChange(e) {
        e.preventDefault();
        setUpdateAvatarState('change');

        const { name, value } = e.target;
        const newValues = {
            ...values,
            [name]: value,
        };
        setNewOptions(newValues);
    }

    function generateRandomAvatarOptions() {
        const configsKeys = Object.keys(configs);
        const options = {};
        const keys = [...configsKeys];
        keys.forEach((key) => {
            const configArray = configs[key];
            options[key] =
                configArray[Math.floor(Math.random() * configArray.length)];
        });

        return options;
    }

    if (!ready) {
        return <Loading />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <form onSubmit={handleSaveSubmit} ref={formRef}>
            <div className="grid grid-cols-4 grid-rows-1 grid-flow-row-dense gap-6 max-lg:flex max-lg:flex-col">
                <div className="col-start-2 col-span-3 flex gap-2">
                    {error && <ErrorMsg type="background" msg={error} />}
                </div>
            </div>
            <div className="mb-4 flex gap-6 max-lg:flex-col">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col w-[290px] h-[290px] max-lg:h-full gap-4">
                        <div className="w-full p-4 flex items-center justify-center border border-gray-300 rounded-xl">
                            <div className="w-64 h-64">
                                {avatarComponent ? (
                                    avatarComponent
                                ) : (
                                    <Loading />
                                )}
                            </div>
                        </div>
                        <Button
                            type="submit"
                            name="random"
                            value="Aleatorio"
                            onClick={handleRandom}
                            disabled={disabledBtn}
                        />
                    </div>
                </div>
                <div className="w-full h-full">
                    {values && selectInputs ? (
                        <div className="grid grid-cols-3 grid-rows-1 grid-flow-row-dense gap-2 max-md:flex max-md:flex-col">
                            <div className="col-span-2">
                                <div className="mb-2 p-4 bg-slate-100 rounded-xl grid grid-cols-2 gap-2 max-md:flex max-md:flex-col">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="topType">Top</label>
                                        <Select
                                            name="topType"
                                            onChange={handleChange}
                                            options={selectInputs.topType}
                                            selected={values.topType}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="accessoriesType">
                                            ↳ 👓 Accessories
                                        </label>
                                        <Select
                                            name="accessoriesType"
                                            onChange={handleChange}
                                            options={
                                                selectInputs.accessoriesType
                                            }
                                            selected={values.accessoriesType}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2 p-4 bg-slate-100 rounded-xl grid grid-cols-2 gap-2 max-md:flex max-md:flex-col">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="hatColor">
                                            🎨 HatColor
                                        </label>
                                        <Select
                                            name="hatColor"
                                            onChange={handleChange}
                                            options={selectInputs.hatColor}
                                            selected={values.hatColor}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="hairColor">
                                            ↳ 💈 Hair Color
                                        </label>
                                        <Select
                                            name="hairColor"
                                            onChange={handleChange}
                                            options={selectInputs.hairColor}
                                            selected={values.hairColor}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2 p-4 bg-slate-100 rounded-xl grid grid-cols-2 gap-2 max-md:flex max-md:flex-col">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="facialHairType">
                                            Facial Hair
                                        </label>
                                        <Select
                                            name="facialHairType"
                                            onChange={handleChange}
                                            options={
                                                selectInputs.facialHairType
                                            }
                                            selected={values.facialHairType}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="facialHairColor">
                                            ↳ ✂️ Facial Hair Color
                                        </label>
                                        <Select
                                            name="facialHairColor"
                                            onChange={handleChange}
                                            options={
                                                selectInputs.facialHairColor
                                            }
                                            selected={values.facialHairColor}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2 p-4 bg-slate-100 rounded-xl grid grid-cols-3 gap-2 max-md:flex max-md:flex-col">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="clotheType">
                                            👔 Clothes
                                        </label>
                                        <Select
                                            name="clotheType"
                                            onChange={handleChange}
                                            options={selectInputs.clotheType}
                                            selected={values.clotheType}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="clotheColor">
                                            ↳ Color Fabric
                                        </label>
                                        <Select
                                            name="clotheColor"
                                            onChange={handleChange}
                                            options={selectInputs.clotheColor}
                                            selected={values.clotheColor}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="graphicType">
                                            ↳ Graphic
                                        </label>
                                        <Select
                                            name="graphicType"
                                            onChange={handleChange}
                                            options={selectInputs.graphicType}
                                            selected={values.graphicType}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col gap-1 mb-2 p-4 bg-slate-100 rounded-xl">
                                    <label htmlFor="eyeType">👁 Eyes</label>
                                    <Select
                                        name="eyeType"
                                        onChange={handleChange}
                                        options={selectInputs.eyeType}
                                        selected={values.eyeType}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 mb-2 p-4 bg-slate-100 rounded-xl">
                                    <label htmlFor="eyebrowType">
                                        ✏️ Eyebrow
                                    </label>
                                    <Select
                                        name="eyebrowType"
                                        onChange={handleChange}
                                        options={selectInputs.eyebrowType}
                                        selected={values.eyebrowType}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 mb-2 p-4 bg-slate-100 rounded-xl">
                                    <label htmlFor="mouthType">👄 Mouth</label>
                                    <Select
                                        name="mouthType"
                                        onChange={handleChange}
                                        options={selectInputs.mouthType}
                                        selected={values.mouthType}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 mb-2 p-4 bg-slate-100 rounded-xl">
                                    <label htmlFor="skinColor">🎨 Skin</label>
                                    <Select
                                        name="skinColor"
                                        onChange={handleChange}
                                        options={selectInputs.skinColor}
                                        selected={values.skinColor}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-[290px] max-lg:h-full bg-slate-100 rounded-xl max-md:p-6 p-8">
                            <Loading />
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-4 grid-rows-1 grid-flow-row-dense gap-6 max-lg:flex max-lg:flex-col">
                <div className="col-start-4 flex gap-2">
                    <Button type="submit" name="save" value="Guardar" />
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
