import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import VehicleModal from "./VehicleModal";
import { restockVehicle } from "../../services/vehicleService";

function RestockModal({
    open,
    vehicle,
    onClose,
    onSuccess,
}) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setQuantity(1);
        }
    }, [open]);

    if (!vehicle) return null;

    const handleRestock = async () => {
        if (quantity < 1) {
            toast.error("Quantity must be at least 1");
            return;
        }

        try {
            setLoading(true);

            await restockVehicle(
    vehicle.id,
    Number(quantity)
);

            toast.success("Vehicle restocked successfully");

            await onSuccess();

            onClose();

        } catch (error) {
            toast.error(
                error.response?.data?.detail ||
                "Restock failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <VehicleModal
            open={open}
            title="Restock Vehicle"
            onClose={onClose}
        >
            <div className="space-y-6">

                <div>
                    <h3 className="text-xl font-semibold text-white">
                        {vehicle.make} {vehicle.model}
                    </h3>

                    <p className="mt-2 text-slate-400">
                        Current Stock:
                        <span className="ml-2 font-bold text-blue-400">
                            {vehicle.quantity}
                        </span>
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Quantity to Add
                    </label>

                    <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Number(e.target.value))
                        }
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-600"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleRestock}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? "Saving..." : "Restock"}
                    </button>

                </div>

            </div>
        </VehicleModal>
    );
}

export default RestockModal;