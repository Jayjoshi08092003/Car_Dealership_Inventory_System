function FormActions({
    loading,
    submitLabel = "Save",
}) {
    return (
        <div className="flex justify-end">
            <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
            >
                {loading
                    ? "Saving..."
                    : submitLabel}
            </button>
        </div>
    );
}

export default FormActions;