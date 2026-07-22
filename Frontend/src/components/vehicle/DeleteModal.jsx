import { motion, AnimatePresence } from "framer-motion";

function DeleteModal({ open, vehicle, onCancel, onConfirm }) {
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
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold text-white">
                            Delete Vehicle
                        </h2>

                        <p className="mt-4 text-slate-300">
                            Are you sure you want to delete
                        </p>

                        <p className="mt-2 text-lg font-semibold text-red-400">
                            {vehicle?.make} {vehicle?.model}
                        </p>

                        <p className="mt-4 text-slate-400">
                            This action cannot be undone.
                        </p>

                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={onCancel}
                                className="rounded-xl border border-slate-700 px-5 py-2 text-white hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => onConfirm(vehicle)}
                                className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default DeleteModal;