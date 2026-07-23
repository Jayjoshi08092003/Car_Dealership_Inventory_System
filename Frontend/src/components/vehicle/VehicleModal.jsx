import { AnimatePresence, motion } from "framer-motion";

function VehicleModal({
    open,
    title,
    children,
    onClose,
}) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
                    >
                        <div className="mb-6 flex items-center justify-between">

                            <h2 className="text-2xl font-bold text-white">
                                {title}
                            </h2>

                            <button
                                onClick={onClose}
                                className="text-2xl text-slate-400 hover:text-white"
                            >
                                ×
                            </button>

                        </div>

                        {children}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default VehicleModal;