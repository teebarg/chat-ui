"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Alert from "@/components/core/Alert";
import { TextAreaField } from "@/components/core/Fields";

type Inputs = {
    message: string;
};

export default function ChatInputForm() {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (loading) {
            return;
        }
        setLoading(true);
        console.log(data);
        const { message } = data;
        console.log("🚀 ~ message:", message);
        const body = JSON.stringify(data);
        try {
            // Sign Up
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/conversation/${9}/message`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body,
            });
            const data = await res.json();
            setLoading(false);
            setError(true);
            if (res.status === 400) {
                setErrorMessage(data.detail);
                return;
            } else if (res.status === 422) {
                setErrorMessage("Please check your inputs and try again");
                return;
            }
        } catch (error) {
            setErrorMessage("An error occurred, please contact the administrator");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6 gap-x-6 gap-y-8">
                <TextAreaField
                    name="message"
                    placeholder="Ex. Message ai....."
                    register={register}
                    error={errors.message}
                    rules={{ required: true }}
                />

                {/* <div className="sm:col-span-3">
                    <button type="submit" className="btn btn-primary w-full">
                        {loading && <span className="loading loading-spinner"></span>}
                        {loading ? "Loading" : "Submit"}
                    </button>
                </div> */}
            </div>
            {error && (
                <Alert type="alert" delay={5000} onClose={() => setError(false)}>
                    <p>{errorMessage}</p>
                </Alert>
            )}
        </form>
    );
}
