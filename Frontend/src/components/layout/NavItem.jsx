import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function NavItem({ to, children }) {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <motion.div
                    whileHover={{ y: -2 }}
                    className={`relative px-4 py-2 rounded-xl transition
                        ${
                            isActive
                                ? "text-white"
                                : "text-slate-400 hover:text-white"
                        }`}
                >
                    {children}

                    {isActive && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-blue-500"
                        />
                    )}
                </motion.div>
            )}
        </NavLink>
    );
}

export default NavItem;