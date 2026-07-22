import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { getVehicles } from "../../services/vehicleService";

function RecentVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadVehicles() {
            try {
                const data = await getVehicles();

                setVehicles(data.slice(0, 5));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadVehicles();
    }, []);

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                    Recent Vehicles
                </h2>

                <Link
                    to="/vehicles"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                >
                    View All
                    <FiArrowRight />
                </Link>
            </div>

            {loading ? (
                <p className="text-slate-400">Loading...</p>
            ) : vehicles.length === 0 ? (
                <p className="text-slate-400">No vehicles found.</p>
            ) : (
                <div className="space-y-3">
                    {vehicles.map((vehicle) => (
                        <div
                            key={vehicle.id}
                            className="flex items-center justify-between rounded-xl border border-slate-800 p-4 hover:border-blue-500 transition"
                        >
                            <div>
                                <h3 className="font-semibold text-white">
                                    {vehicle.make} {vehicle.model}
                                </h3>

                                <p className="text-sm text-slate-400">
                                    {vehicle.category}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold text-white">
                                    ₹{vehicle.price.toLocaleString()}
                                </p>

                                <p className="text-sm text-slate-400">
                                    Stock: {vehicle.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecentVehicles;