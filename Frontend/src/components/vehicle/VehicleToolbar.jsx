import { FiPlus, FiSearch } from "react-icons/fi";

function VehicleToolbar({
    search,
    setSearch,
    category,
    setCategory,
    onAddVehicle,
}) {
    return (
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                    <FiSearch
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search vehicles..."
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500"
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Sports">Sports</option>
                    <option value="Truck">Truck</option>
                </select>
            </div>

            <button
                onClick={onAddVehicle}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
                <FiPlus />
                Add Vehicle
            </button>
        </div>
    );
}

export default VehicleToolbar;