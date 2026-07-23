function FormInput({
    label,
    name,
    type = "text",
    register,
    errors,
    rules = {},
    placeholder = "",
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors?.[name] && (
                <p className="mt-1 text-sm text-red-400">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
}

export default FormInput;