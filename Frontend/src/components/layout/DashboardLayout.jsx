import Navbar from "./Navbar";

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;