function FormSelect({
    label,
    name,
    register,
    errors,
    options,
    rules = {},
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
                {label}
            </label>

            <select
                {...register(name, rules)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>

            {errors?.[name] && (
                <p className="mt-1 text-sm text-red-400">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
}

export default FormSelect;