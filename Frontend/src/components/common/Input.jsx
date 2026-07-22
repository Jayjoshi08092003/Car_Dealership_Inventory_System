function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-white font-medium">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-600 focus:border-blue-500 outline-none"
            />
        </div>
    );
}

export default Input;