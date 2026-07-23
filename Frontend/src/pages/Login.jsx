import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../components/common/Input";
import Button from "../components/common/Buttons";
import api from "../api/api";

import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const formData = new URLSearchParams();

            formData.append("username", form.email);
            formData.append("password", form.password);

            const response = await api.post(
                "/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded",
                    },
                }
            );

            await login(response.data.access_token);

            toast.success("Login Successful");

            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Login Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-xl">

                <h1 className="text-center text-3xl font-bold text-white">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </Button>

                </form>

                <p className="mt-6 text-center text-slate-400">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="ml-2 text-blue-500"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;