import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

import Logo from "./Logo";
import NavItem from "./NavItem";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();

    const { logout, user } = useAuth();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            className="
                sticky
                top-0
                z-50
                backdrop-blur-xl
                bg-slate-900/70
                border-b
                border-slate-800
            "
        >
            <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

                <Logo />

                <div className="hidden md:flex gap-2">

                    <NavItem to="/">
                        Dashboard
                    </NavItem>

                    <NavItem to="/vehicles">
                        Vehicles
                    </NavItem>

                </div>

                <div className="flex items-center gap-5">

                    <div className="text-right">

                        <p className="font-medium">
                            {user?.email}
                        </p>

                        <p className="text-xs text-slate-400 capitalize">
                            {user?.role}
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="
                            rounded-xl
                            p-3
                            bg-red-500/10
                            hover:bg-red-500
                            transition
                        "
                    >
                        <FiLogOut />
                    </button>

                </div>

            </div>
        </motion.nav>
    );
}

export default Navbar;