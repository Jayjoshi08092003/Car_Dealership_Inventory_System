import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vehicles from "./pages/Vehicles";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import AddVehicle from "./pages/AddVehicle";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/vehicles"
                element={
                    <ProtectedRoute>
                        <Vehicles />
                    </ProtectedRoute>
                }
            />
            <Route
    path="/add-vehicle"
    element={
        <ProtectedRoute>
            <AddVehicle />
        </ProtectedRoute>
    }
/>

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;