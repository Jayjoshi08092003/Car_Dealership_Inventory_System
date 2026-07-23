import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
    createVehicle,
    updateVehicle,
} from "../../services/vehicleService";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormActions from "./FormActions";

function VehicleForm({
    defaultValues,
    onSuccess,
}) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        defaultValues: {
            make: "",
            model: "",
            category: "SUV",
            price: "",
            quantity: "",
        },
    });

    useEffect(() => {

        reset({
            make: defaultValues?.make ?? "",
            model: defaultValues?.model ?? "",
            category: defaultValues?.category ?? "SUV",
            price: defaultValues?.price ?? "",
            quantity: defaultValues?.quantity ?? "",
        });

    }, [defaultValues?.id, reset]);

    const submit = async (data) => {

        try {

            const payload = {
                ...data,
                price: Number(data.price),
                quantity: Number(data.quantity),
            };

            if (defaultValues?.id) {

                await updateVehicle(
                    defaultValues.id,
                    payload
                );

                toast.success("Vehicle updated successfully");

            } else {

                await createVehicle(payload);

                toast.success("Vehicle added successfully");

            }

            reset({
                make: "",
                model: "",
                category: "SUV",
                price: "",
                quantity: "",
            });

            await onSuccess();

        } catch (error) {

            toast.error(
                error.response?.data?.detail ??
                "Operation failed"
            );

        }

    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="space-y-6"
        >

            <div className="grid grid-cols-2 gap-6">

                <FormInput
                    label="Make"
                    name="make"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Required",
                    }}
                />

                <FormInput
                    label="Model"
                    name="model"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Required",
                    }}
                />

                <FormSelect
                    label="Category"
                    name="category"
                    register={register}
                    errors={errors}
                    options={[
                        "SUV",
                        "Sedan",
                        "Truck",
                        "Luxury",
                        "Sports",
                    ]}
                />

                <FormInput
                    label="Price"
                    name="price"
                    type="number"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Required",
                    }}
                />

                <FormInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Required",
                    }}
                />

            </div>

            <FormActions
                loading={isSubmitting}
                submitLabel={
                    defaultValues?.id
                        ? "Update Vehicle"
                        : "Add Vehicle"
                }
            />

        </form>
    );
}

export default VehicleForm;