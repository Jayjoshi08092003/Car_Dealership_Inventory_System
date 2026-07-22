import api from "../api/api";

export async function getDashboardStats() {
    const response = await api.get("/vehicles");

    const vehicles = response.data;

    const totalVehicles = vehicles.length;

    const totalStock = vehicles.reduce(
        (sum, vehicle) => sum + vehicle.quantity,
        0
    );

    const totalValue = vehicles.reduce(
        (sum, vehicle) => sum + vehicle.price * vehicle.quantity,
        0
    );

    const lowStock = vehicles.filter(
        vehicle => vehicle.quantity <= 5
    ).length;

    return {
        totalVehicles,
        totalStock,
        totalValue,
        lowStock,
    };
}