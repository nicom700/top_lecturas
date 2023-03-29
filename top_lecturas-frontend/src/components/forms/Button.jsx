export default function Button({ type, name, value, disabled = null, onClick = null }) {
    

    
    return (
        <button className="w-full h-12 my-1 py-2 px-4 text-white rounded-xl transition-all bg-primary hover:bg-primaryHover active:bg-primaryActive active:text-white disabled:bg-stone-600 dark:disabled:bg-zinc-700 dark:bg-DarkBtn dark:hover:bg-DarkBtnHover dark:active:bg-DarkBtnActive"
            type={type}
            name={name}
            data-value={value}
            disabled={disabled}
            onClick={onClick}
        >
            <div className="inline-flex items-center gap-2 font-semibold">
                <span>{value.replaceAll('_', ' ')}</span>
                {!!disabled && (
                    <svg className="motion-reduce:hidden animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>)
                }
            </div>
        </button>
    );
}