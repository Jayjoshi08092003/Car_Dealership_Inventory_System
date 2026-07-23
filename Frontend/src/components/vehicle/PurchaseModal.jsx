import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import VehicleModal from "./VehicleModal";
import { purchaseVehicle } from "../../services/vehicleService";

function PurchaseModal({
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

    const handlePurchase = async () => {
        if (quantity < 1) {
            toast.error("Quantity must be at least 1");
            return;
        }

        if (quantity > vehicle.quantity) {
            toast.error("Not enough stock available");
            return;
        }

        try {
            setLoading(true);

            await purchaseVehicle(
                vehicle.id,
                Number(quantity)
            );

            toast.success("Vehicle purchased successfully");

            // Let the parent component handle:
            // - refreshing vehicles
            // - closing the modal
            // - clearing selectedVehicle
            await onSuccess();

        } catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Purchase failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <VehicleModal
            open={open}
            title="Purchase Vehicle"
            onClose={onClose}
        >
            <div className="space-y-6">

                <div>
                    <h3 className="text-xl font-semibold text-white">
                        {vehicle.make} {vehicle.model}
                    </h3>

                    <p className="mt-2 text-slate-400">
                        Available Stock:
                        <span className="ml-2 font-bold text-green-400">
                            {vehicle.quantity}
                        </span>
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Quantity
                    </label>

                    <input
                        type="number"
                        min={1}
                        max={vehicle.quantity}
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Number(e.target.value))
                        }
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-green-500"
                    />
                </div>

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-600 disabled:opacity-60"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={handlePurchase}
                        className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-60"
                    >
                        {loading ? "Processing..." : "Purchase"}
                    </button>

                </div>

            </div>
        </VehicleModal>
    );
}

export default PurchaseModal;