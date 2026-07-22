import DashboardLayout from "../components/layout/DashboardLayout";
import VehicleForm from "../components/vehicle/VehicleForm";

function AddVehicle() {
    return (
        <DashboardLayout>
            <div className="mx-auto max-w-4xl">

                <h1 className="mb-8 text-4xl font-bold text-white">
                    Add New Vehicle
                </h1>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                    <VehicleForm />
                </div>

            </div>
        </DashboardLayout>
    );
}

export default AddVehicle;