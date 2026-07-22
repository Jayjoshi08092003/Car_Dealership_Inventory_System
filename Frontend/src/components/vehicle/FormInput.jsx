function FormInput({
    label,
    type = "text",
    register,
    name,
    errors,
    ...props
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
                {label}
            </label>

            <input
                type={type}
                {...register(name)}
                {...props}
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-blue-500
                "
            />

            {errors[name] && (
                <p className="text-sm text-red-400">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
}

export default FormInput;