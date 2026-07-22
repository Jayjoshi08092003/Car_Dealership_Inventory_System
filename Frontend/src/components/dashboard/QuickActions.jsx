import { Link } from "react-router-dom";
import { FiPlus, FiTruck, FiSearch } from "react-icons/fi";

function QuickActions() {
    const actions = [
        {
            title: "Add Vehicle",
            icon: <FiPlus />,
            path: "/add-vehicle",
        },
        {
            title: "Manage Inventory",
            icon: <FiTruck />,
            path: "/vehicles",
        },
        {
            title: "Search Vehicles",
            icon: <FiSearch />,
            path: "/vehicles",
        },
    ];

    return (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

            <div className="grid gap-4 md:grid-cols-3">
                {actions.map((action) => (
                    <Link
                        key={action.title}
                        to={action.path}
                        className="rounded-xl border border-slate-700 p-5 hover:border-blue-500 hover:bg-slate-800 transition"
                    >
                        <div className="text-3xl mb-3">{action.icon}</div>
                        <h3 className="font-semibold">{action.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default QuickActions;