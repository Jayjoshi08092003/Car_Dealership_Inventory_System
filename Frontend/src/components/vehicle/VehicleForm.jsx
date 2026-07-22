import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormActions from "./FormActions";

import { createVehicle } from "../../services/vehicleService";

function VehicleForm({ defaultValues = {} }) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            make: defaultValues.make || "",
            model: defaultValues.model || "",
            category: defaultValues.category || "SUV",
            price: defaultValues.price || "",
            quantity: defaultValues.quantity || "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            await createVehicle({
                ...data,
                price: Number(data.price),
                quantity: Number(data.quantity),
            });

            toast.success("Vehicle added successfully!");

            navigate("/vehicles");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add vehicle.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <FormInput
                    label="Make"
                    name="make"
                    register={register}
                    errors={errors}
                    placeholder="Toyota"
                />

                <FormInput
                    label="Model"
                    name="model"
                    register={register}
                    errors={errors}
                    placeholder="Camry"
                />

                <FormSelect
                    label="Category"
                    name="category"
                    register={register}
                    errors={errors}
                    options={[
                        "SUV",
                        "Sedan",
                        "Luxury",
                        "Truck",
                        "Sports",
                    ]}
                />

                <FormInput
                    label="Price"
                    name="price"
                    type="number"
                    register={register}
                    errors={errors}
                    placeholder="2400000"
                />

                <FormInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    register={register}
                    errors={errors}
                    placeholder="5"
                />

            </div>

            <FormActions loading={loading} />
        </form>
    );
}

export default VehicleForm;