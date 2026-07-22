import { motion } from "framer-motion";

function StatsCard({ title, value, icon, color }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -6,
                scale: 1.02,
            }}
            transition={{ duration: 0.3 }}
            className="
                rounded-2xl
                bg-slate-900
                border
                border-slate-800
                p-6
                shadow-lg
                hover:border-blue-500
                hover:shadow-blue-500/20
                transition-all
            "
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-slate-400 text-sm">
                        {title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white">
                        {value}
                    </h2>
                </div>

                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: color }}
                >
                    {icon}
                </div>
            </div>
        </motion.div>
    );
}

export default StatsCard;