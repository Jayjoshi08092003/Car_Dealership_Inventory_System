import { useNavigate } from "react-router-dom";

function FormActions({ loading }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-end gap-4">

            <button
                type="button"
                onClick={() => navigate("/vehicles")}
                className="
                    rounded-xl
                    border
                    border-slate-700
                    px-6
                    py-3
                    text-white
                    hover:bg-slate-800
                "
            >
                Cancel
            </button>

            <button
                type="submit"
                disabled={loading}
                className="
                    rounded-xl
                    bg-blue-600
                    px-6
                    py-3
                    text-white
                    hover:bg-blue-700
                "
            >
                {loading ? "Saving..." : "Add Vehicle"}
            </button>

        </div>
    );
}

export default FormActions;