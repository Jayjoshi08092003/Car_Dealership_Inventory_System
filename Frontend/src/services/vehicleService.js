import api from "../api/api";

export const getVehicles = async () => {
    const res = await api.get("/vehicles");
    return res.data;
};

export const searchVehicles = async (query) => {
    const res = await api.get(`/vehicles/search?q=${query}`);
    return res.data;
};

export const createVehicle = async (vehicle) => {
    const res = await api.post("/vehicles", vehicle);
    return res.data;
};

export const updateVehicle = async (id, data) => {
    const res = await api.put(`/vehicles/${id}`, data);
    return res.data;
};

export const deleteVehicle = async (id) => {
    await api.delete(`/vehicles/${id}`);
};

export const purchaseVehicle = async (id, quantity = 1) => {
    const res = await api.post(`/vehicles/${id}/purchase`, {
        quantity,
    });
    return res.data;
};

export const restockVehicle = async (id, quantity) => {
    const res = await api.post(`/vehicles/${id}/restock`, {
        quantity,
    });
    return res.data;
};