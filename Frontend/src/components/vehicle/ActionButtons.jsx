import {
    FiEdit,
    FiTrash2,
    FiShoppingCart,
    FiPackage,
} from "react-icons/fi";

// WARNING: You must import your useAuth hook here! 
// Example: import { useAuth } from "../hooks/useAuth";

function ActionButtons({
    vehicle,
    onEdit,
    onDelete,
    onPurchase,
    onRestock,
}) {
    // 1. Hooks MUST go inside the component body, before the return
    const { isAdmin } = useAuth();

    return (
        <div className="flex items-center gap-2">
            
            {/* 2. Purchase is available to everyone, but disabled if out of stock */}
            <button
                onClick={() => onPurchase(vehicle)}
                disabled={vehicle.quantity === 0}
                className="rounded-lg bg-green-500/10 p-2 text-green-400 transition hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                title="Purchase Vehicle"
            >
                <FiShoppingCart />
            </button>

            {/* 3. Wrap the admin-only buttons in the isAdmin check */}
            {isAdmin && (
                <>
                    <button
                        onClick={() => onEdit(vehicle)}
                        className="rounded-lg bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                        title="Edit Vehicle"
                    >
                        <FiEdit />
                    </button>

                    <button
                        onClick={() => onRestock(vehicle)}
                        className="rounded-lg bg-yellow-500/10 p-2 text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
                        title="Restock Vehicle"
                    >
                        <FiPackage />
                    </button>

                    <button
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