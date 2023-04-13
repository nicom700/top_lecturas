export default function Select({ name, onChange = null, options, selected }) {
    
    const classNames = 'w-full h-12 my-1 py-2 px-4 border-r-transparent border-r-8 rounded-xl outline outline-1 outline-gray-300 focus-within:outline-primary focus-within:outline-2 dark:bg-bgDarkPrimary dark:outline-zinc-800 dark:focus-within:bg-black dark:focus-within:outline-primaryDark';

    return (
        <select
            className={classNames}
            name={name}
            onChange={onChange}
            value={selected}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
