export default function Input({type, name, value, placeholder = '', onChange = null, onBlur = null, autoComplete = '', error = ''}){

    const classNames = 'w-full h-12 my-1 py-2 px-4 rounded-xl outline-1 outline-gray-300 bg-white autofill:bg-bgDarkPrimary focus-within:outline-primary focus-within:outline-2 dark:text-white dark:bg-bgDarkPrimary dark:outline-zinc-800 dark:focus-within:bg-black dark:focus-within:outline-primaryDark' + (error ? ' ' + error : '');

    return (
        <input className={classNames}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete ?? 'off'} />
    );
}