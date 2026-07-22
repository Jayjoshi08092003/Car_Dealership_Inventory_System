import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../components/common/Input";
import Button from "../components/common/Buttons";
import api from "../api/api";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await api.post("/auth/register", {
                username: form.username,
                email: form.email,
                password: form.password,
            });

            toast.success("Registration Successful");

            navigate("/login");

        } catch (error) {
            toast.error(
                error.response?.data?.detail ||
                "Registration Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-slate-900 rounded-xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-white text-center">
                    Register
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                >

                    <Input
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                    />

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>

                </form>

                <p className="text-center text-slate-400 mt-6">
                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-500 ml-2"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;