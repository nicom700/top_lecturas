export default function Input({type, name, placeholder, onChange, error = ''}){

    const classNames = 'w-full h-12 my-1 py-2 px-4 rounded-xl border border-gray-300' + (error ? ' ' + error : '');

    return (
        <input className={classNames}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange} />
    );
}