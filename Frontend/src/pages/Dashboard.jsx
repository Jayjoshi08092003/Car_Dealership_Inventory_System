import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardHero from "../components/dashboard/DashboardHero";
import StateCard from "../components/dashboard/StateCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentVehicles from "../components/dashboard/RecentVehicles";

import {
    FiTruck,
    FiPackage,
    FiAlertTriangle,
    FiDollarSign,
} from "react-icons/fi";

import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

            async function loadDashboard() {

            try {

                const data = await getDashboardStats();

                setStats(data);

            } catch (err) {

                console.error(err);

            }

        }

        loadDashboard();

    }, []);

    if (!stats) {

        return (
            <DashboardLayout>

                <p className="text-white">
                    Loading dashboard...
                </p>

            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-12">

                <DashboardHero />

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <StateCard
                        title="Vehicles"
                        value={stats.totalVehicles}
                        icon={<FiTruck />}
                        color="#2563EB"
                    />

                    <StateCard
                        title="Total Stock"
                        value={stats.totalStock}
                        icon={<FiPackage />}
                        color="#10B981"
                    />

                    <StateCard
                        title="Low Stock"
                        value={stats.lowStock}
                        icon={<FiAlertTriangle />}
                        color="#F59E0B"
                    />

                    <StateCard
                        title="Inventory Value"
                        value={`₹${stats.totalValue.toLocaleString()}`}
                        icon={<FiDollarSign />}
                        color="#8B5CF6"
                    />

                </div>

            </div>
         <QuickActions />
         <RecentVehicles />
        </DashboardLayout>
         

    );

}

export default Dashboard;