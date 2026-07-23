import api from "../api/api";

// Get all vehicles
export const getVehicles = async () => {
    const response = await api.get("/vehicles");
    return response.data;
};

// Search vehicles
export const searchVehicles = async (query) => {
    const response = await api.get("/vehicles/search", {
        params: { query },
    });

    return response.data;
};

// Create vehicle
export const createVehicle = async (vehicle) => {
    const response = await api.post("/vehicles", vehicle);
    return response.data;
};

// Update vehicle
export const updateVehicle = async (id, vehicle) => {
    const response = await api.put(`/vehicles/${id}`, vehicle);
    return response.data;
};

// Delete vehicle
export const deleteVehicle = async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
};

// Purchase vehicle
export const purchaseVehicle = async (id, quantity = 1) => {
    const response = await api.post(
        `/vehicles/${id}/purchase`,
        { quantity }
    );

    return response.data;
};

// Restock vehicle
export const restockVehicle = async (id, quantity) => {
    const response = await api.post(
        `/vehicles/${id}/restock`,
        { quantity }
    );

    return response.data;
};