"use client";

import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Alert from "@/components/core/Alert";
import { TextAreaField } from "@/components/core/Fields";
import { Http } from "@/lib/http";
import { signOut } from "next-auth/react";

type Inputs = {
    message: string;
};

export default function ChatInputForm({ slug }: { slug?: string }) {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const form = useRef<any>(null);

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
        const body = JSON.stringify(data);
        try {
            const path = slug ? `/conversations/${slug}/message` : `/conversations`;
            const res = await Http(`${path}`, "POST", body);
            const data = await res.json();
            setLoading(false);
            if (res.ok) {
                window.location.href = `/chat/${data.slug}`;
                return;
            }
            setError(true);
            if (res.status === 400) {
                setErrorMessage(data.detail);
                return;
            } else if (res.status === 422) {
                setErrorMessage("Please check your inputs and try again");
                return;
            } else if ([401, 403].includes(res.status)) {
                signOut();
                return;
            }
        } catch (error) {
            setErrorMessage("An error occurred, please contact the administrator");
            setLoading(false);
        }
    };

    const clickSubmit = () => {
        form?.current?.click();
    };

    return (
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <TextAreaField
                    name="message"
                    placeholder="Ex. Message ai....."
                    register={register}
                    error={errors.message}
                    rules={{ required: true }}
                    handleClick={() => clickSubmit()}
                />
            </div>
            {error && (
                <Alert type="alert" delay={5000} onClose={() => setError(false)}>
                    <p>{errorMessage}</p>
                </Alert>
            )}
        </form>
    );
}
