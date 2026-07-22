function FormSelect({
    label,
    register,
    name,
    errors,
    options,
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
                {label}
            </label>

            <select
                {...register(name)}
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    px-4
                    py-3
                    text-white
                "
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

            {errors[name] && (
                <p className="text-sm text-red-400">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
}

export default FormSelect;