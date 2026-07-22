import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiPlus, FiTruck } from "react-icons/fi";

function DashboardHero() {
    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
                rounded-3xl
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-slate-900
                p-10
                shadow-2xl
            "
        >
            <h1 className="text-4xl font-bold">
                {greeting} 👋
            </h1>

            <p className="mt-3 text-lg text-slate-200">
                Manage your dealership inventory professionally.
            </p>

            <div className="mt-8 flex gap-4">
                <Link
                    to="/vehicles"
                    className="
                        flex items-center gap-2
                        rounded-xl
                        bg-white
                        px-5
                        py-3
                        font-semibold
                        text-slate-900
                        hover:scale-105
                        transition
                    "
                >
                    <FiTruck />
                    View Vehicles
                </Link>

                <Link
                    to="/add-vehicle"
                    className="
                        flex items-center gap-2
                        rounded-xl
                        border
                        border-white/30
                        bg-white/10
                        px-5
                        py-3
                        text-white
                        hover:bg-white/20
                        transition
                    "
                >
                    <FiPlus />
                    Add Vehicle
                </Link>
            </div>
        </motion.div>
    );
}

export default DashboardHero;