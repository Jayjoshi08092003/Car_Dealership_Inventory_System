import Button from "./Buttons";

function VehicleCard({
    vehicle,
    isAdmin,
    onPurchase,
    onEdit,
    onDelete,
    onRestock,
}) {
    return (
        <div className="bg-slate-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">

            <h2 className="text-2xl font-bold text-white">
                {vehicle.make} {vehicle.model}
            </h2>

            <div className="mt-5 space-y-2 text-slate-300">

                <p>
                    <span className="font-semibold text-white">
                        Category:
                    </span>{" "}
                    {vehicle.category}
                </p>

                <p>
                    <span className="font-semibold text-white">
                        Price:
                    </span>{" "}
                    ₹{vehicle.price.toLocaleString()}
                </p>

                <p>
                    <span className="font-semibold text-white">
                        Available:
                    </span>{" "}
                    {vehicle.quantity}
                </p>

            </div>

            <div className="mt-6">

                <Button
                    onClick={() => onPurchase(vehicle.id)}
                >
                    Purchase
                </Button>

            </div>

            {isAdmin && (

                <div className="grid grid-cols-3 gap-2 mt-4">

                    <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => onEdit(vehicle.id)}
                    >
                        Edit
                    </Button>

                    <Button
                        className="bg-yellow-600 hover:bg-yellow-700"
                        onClick={() => onRestock(vehicle.id)}
                    >
                        Restock
                    </Button>

                    <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => onDelete(vehicle.id)}
                    >
                        Delete
                    </Button>

                </div>

            )}

        </div>
    );
}

export default VehicleCard;