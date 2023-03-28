export default function ErrorMsg({ type = null, msg }) {
    return (
        <>
            {type == 'background' ? (
                <div className="mb-2 p-2 w-full bg-red-500 text-white text-sm font-semibold rounded-md">
                    {msg}
                </div>
            ) : (
                <span className="mb-2 text-red-600 text-sm">{msg}</span>
            )}
        </>
    );
}
