export default function Input({type, name, value, placeholder = '', onChange = null, onBlur = null, error = ''}){

    const classNames = 'w-full h-12 my-1 py-2 px-4 rounded-xl outline outline-1 outline-gray-300 focus-within:outline-primary focus-within:outline-2' + (error ? ' ' + error : '');

    return (
        <input className={classNames}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur} />
    );
}