import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import VehicleToolbar from "../components/vehicle/VehicleToolbar";
import VehicleTable from "../components/vehicle/VehicleTable";
import DeleteModal from "../components/vehicle/DeleteModal";

// Combine your imports into a single line
import { getVehicles, deleteVehicle } from "../services/vehicleService";

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    
    // Modal state
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        async function loadVehicles() {
            try {
                const data = await getVehicles();
                setVehicles(data);
            } catch (error) {
                console.error(error);
            }
        }

        loadVehicles();
    }, []);

    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesSearch =
            `${vehicle.make} ${vehicle.model}`
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "" || vehicle.category === category;

        return matchesSearch && matchesCategory;
    });

    const handleEdit = (vehicle) => {
        console.log("Edit", vehicle);
    };

    // This now actually triggers the modal instead of just logging to the console
    const handleDelete = (vehicle) => {
        setSelectedVehicle(vehicle);
        setDeleteOpen(true);
    };

    const handlePurchase = (vehicle) => {
        console.log("Purchase", vehicle);
    };

    const handleRestock = (vehicle) => {
        console.log("Restock", vehicle);
    };

    // This MUST be inside the component so it has access to setVehicles and setDeleteOpen
    const confirmDelete = async (vehicle) => {
        try {
            // Assuming your modal passes back the vehicle object or ID
            const idToDelete = vehicle?.id || vehicle;
            await deleteVehicle(idToDelete);

            toast.success("Vehicle deleted successfully");

            setVehicles((prev) =>
                prev.filter((v) => v.id !== idToDelete)
            );

            setDeleteOpen(false);
        } catch (error) {
            toast.error("Failed to delete vehicle");
        }
    };

    return (
        <DashboardLayout>
            <h1 className="mb-8 text-4xl font-bold text-white">
                Vehicle Inventory
            </h1>

            <VehicleToolbar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
            />

            <VehicleTable
                vehicles={filteredVehicles}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPurchase={handlePurchase}
                onRestock={handleRestock}
            />

            {/* Modals MUST go inside the return block */}
            <DeleteModal
                open={deleteOpen}
                vehicle={selectedVehicle}
                onCancel={() => setDeleteOpen(false)}
                onConfirm={confirmDelete}
            />
        </DashboardLayout>
    );
}

export default Vehicles;