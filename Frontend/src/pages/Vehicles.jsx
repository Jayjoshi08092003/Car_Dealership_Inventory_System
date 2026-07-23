import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import VehicleToolbar from "../components/vehicle/VehicleToolbar";
import VehicleTable from "../components/vehicle/VehicleTable";
import DeleteModal from "../components/vehicle/DeleteModal";
import VehicleModal from "../components/vehicle/VehicleModal";
import VehicleForm from "../components/vehicle/VehicleForm";
import PurchaseModal from "../components/vehicle/PurchaseModal";
import RestockModal from "../components/vehicle/RestockModal";

import {
    getVehicles,
    deleteVehicle,
} from "../services/vehicleService";

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [purchaseOpen, setPurchaseOpen] = useState(false);
    const [restockOpen, setRestockOpen] = useState(false);

    const [selectedVehicle, setSelectedVehicle] = useState(null);

   const loadVehicles = async () => {
    try {
        const data = await getVehicles();

        console.log("API DATA");
        console.table(data);
        console.log("IDs:", data.map(v => v.id));

        setVehicles(data);

    } catch (error) {
        console.error(error);
        toast.error("Failed to load vehicles");
    }
};

    useEffect(() => {
        loadVehicles();
    }, []);

    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesSearch = `${vehicle.make} ${vehicle.model}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "" || vehicle.category === category;

        return matchesSearch && matchesCategory;
    });

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setModalOpen(true);
    };

    const handleDelete = (vehicle) => {
        setSelectedVehicle(vehicle);
        setDeleteOpen(true);
    };

    const handlePurchase = (vehicle) => {
        console.log("Purchase:", vehicle);
        setSelectedVehicle(vehicle);
        setPurchaseOpen(true);
    };

    const handleRestock = (vehicle) => {
        console.log("Restock:", vehicle);
        setSelectedVehicle(vehicle);
        setRestockOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteVehicle(selectedVehicle.id);

            toast.success("Vehicle deleted");

            setDeleteOpen(false);
            setSelectedVehicle(null);

            await loadVehicles();
        } catch (error) {
            toast.error("Delete failed");
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
                onAddVehicle={() => {
                    setEditingVehicle(null);
                    setModalOpen(true);
                }}
            />

            <VehicleTable
                vehicles={filteredVehicles}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPurchase={handlePurchase}
                onRestock={handleRestock}
            />

            <DeleteModal
                open={deleteOpen}
                vehicle={selectedVehicle}
                onCancel={() => {
                    setDeleteOpen(false);
                    setSelectedVehicle(null);
                }}
                onConfirm={confirmDelete}
            />

            <VehicleModal
                open={modalOpen}
                title={editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
                onClose={() => {
                    setEditingVehicle(null);
                    setModalOpen(false);
                }}
            >
            <VehicleForm
    defaultValues={editingVehicle}
    onSuccess={async () => {
        await loadVehicles();
        setEditingVehicle(null);
        setModalOpen(false);
    }}
/>
            </VehicleModal>

            <PurchaseModal
                key={selectedVehicle?.id}
                open={purchaseOpen}
                vehicle={selectedVehicle}
                onClose={() => {
                    setPurchaseOpen(false);
                    setSelectedVehicle(null);
                }}
                onSuccess={async () => {
                    await loadVehicles();
                    setPurchaseOpen(false);
                    setSelectedVehicle(null);
                }}
            />

            <RestockModal
                key={selectedVehicle?.id}
                open={restockOpen}
                vehicle={selectedVehicle}
                onClose={() => {
                    setRestockOpen(false);
                    setSelectedVehicle(null);
                }}
                onSuccess={async () => {
                    await loadVehicles();
                    setRestockOpen(false);
                    setSelectedVehicle(null);
                }}
            />
        </DashboardLayout>
    );
}

export default Vehicles;