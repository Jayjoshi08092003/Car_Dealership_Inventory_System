import {
    FiEdit,
    FiTrash2,
    FiShoppingCart,
    FiPackage,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

function ActionButtons({
    vehicle,
    onEdit,
    onDelete,
    onPurchase,
    onRestock,
}) {
    const { isAdmin } = useAuth();

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={() => onPurchase(vehicle)}
                disabled={vehicle.quantity === 0}
                className="rounded-lg bg-green-500/10 p-2 text-green-400 transition hover:bg-green-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                title="Purchase Vehicle"
            >
                <FiShoppingCart />
            </button>

            {isAdmin && (
                <>
                    <button
                        type="button"
                        onClick={() => onEdit(vehicle)}
                        className="rounded-lg bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                        title="Edit Vehicle"
                    >
                        <FiEdit />
                    </button>

                    <button
                        type="button"
                        onClick={() => onRestock(vehicle)}
                        className="rounded-lg bg-yellow-500/10 p-2 text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
                        title="Restock Vehicle"
                    >
                        <FiPackage />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(vehicle)}
                        className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
                        title="Delete Vehicle"
                    >
                        <FiTrash2 />
                    </button>
                </>
            )}
        </div>
    );
}

export default ActionButtons;