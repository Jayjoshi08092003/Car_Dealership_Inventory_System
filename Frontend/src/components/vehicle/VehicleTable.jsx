import StockBadge from "./StockBadge";
import ActionButtons from "./ActionButtons";

function VehicleTable({
    vehicles,
    onEdit,
    onDelete,
    onPurchase,
    onRestock,
}) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
            <table className="min-w-full text-white">
                <thead className="bg-slate-800">
                    <tr>
                        <th className="px-6 py-4 text-left">Make</th>
                        <th className="px-6 py-4 text-left">Model</th>
                        <th className="px-6 py-4 text-left">Category</th>
                        <th className="px-6 py-4 text-left">Price</th>
                        <th className="px-6 py-4 text-left">Quantity</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr
                            key={vehicle.id}
                            className="border-t border-slate-800 hover:bg-slate-800/50"
                        >
                            <td className="px-6 py-4">{vehicle.make}</td>
                            <td className="px-6 py-4">{vehicle.model}</td>
                            <td className="px-6 py-4">{vehicle.category}</td>

                            <td className="px-6 py-4">
                                ₹{Number(vehicle.price).toLocaleString()}
                            </td>

                            <td className="px-6 py-4">
                                {vehicle.quantity}
                            </td>

                            <td className="px-6 py-4">
                                <StockBadge quantity={vehicle.quantity} />
                            </td>

                            <td className="px-6 py-4">
                                <ActionButtons
                                    vehicle={vehicle}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onPurchase={onPurchase}
                                    onRestock={onRestock}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VehicleTable;