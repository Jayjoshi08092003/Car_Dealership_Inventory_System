import { FaCarSide } from "react-icons/fa";

function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
                <FaCarSide className="text-white text-xl" />
            </div>

            <div>
                <h1 className="text-xl font-bold tracking-tight">
                    AutoInventory
                </h1>

                <p className="text-xs text-slate-400">
                    Car Dealership Management
                </p>
            </div>
        </div>
    );
}

export default Logo;