import React, { useId } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import Select from "react-select";

const formClasses = "input input-bordered w-full form-fix";

function Label({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
            {children}
        </label>
    );
}

type Types = "text" | "password" | "email" | "number";

type RulesProps = {
    min?: number;
    max?: number;
    required?: boolean | string;
    email?: boolean;
    confirmPassword?: {};
};

type FieldProps = {
    name: string;
    label?: string;
    className?: string;
    type?: Types;
    rules?: RulesProps;
    register: UseFormRegister<any>;
    [key: string]: any;
};

type Rules = {
    required?: boolean | string;
    minLength?: {
        value: number;
        message: string;
    };
    maxLength?: {
        value: number;
        message: string;
    };
    pattern?: {
        value: RegExp;
        message: string;
    };
    // eslint-disable-next-line no-unused-vars
    validate?: (value: {}) => boolean | string;
};

export function TextField({ name, label, type = "text", className, register, rules, error, ...props }: FieldProps) {
    let id = useId();
    const formRules: Rules = {};
    const { min, max, email, confirmPassword, required } = rules || {};

    if (required) {
        formRules["required"] = typeof required === "boolean" ? `${label} is required` : required;
    }

    if (min) {
        formRules["minLength"] = {
            value: min,
            message: `${label} must have a minimum of ${min} characters`,
        };
    }

    if (max) {
        formRules["maxLength"] = {
            value: max,
            message: `${label} must have a minimum of ${max} characters`,
        };
    }

    if (email) {
        formRules["pattern"] = {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
        };
    }

    if (confirmPassword) {
        formRules["validate"] = (value: {}) => value === confirmPassword || "Passwords do not match";
    }

    return (
        <div className={className}>
            {label && <Label id={id}>{label}</Label>}
            <input id={id} type={type} {...props} className={formClasses} {...register(name, formRules)} />
            {error && <span className="text-xs text-red-400">{error.message}</span>}
        </div>
    );
}

export function SelectField({ name, label, className, register, ...props }: FieldProps) {
    let id = useId();

    return (
        <div className={className}>
            {label && <Label id={id}>{label}</Label>}
            <select id={id} {...props} className={formClasses} {...register(name)} />
        </div>
    );
}

export function CheckBoxField({ name, label, className, register, ...props }: FieldProps) {
    let id = useId();
    const formRules: Rules = {};

    return (
        <div className={className}>
            {label && <Label id={id}>{label}</Label>}
            <input id={id} type="checkbox" {...props} className="toggle toggle-primary" {...register(name, formRules)} />
        </div>
    );
}

export function MutiSelectField({ name, label, className, options, control, defaultValue }: any) {
    let id = useId();

    return (
        <div className={className}>
            {label && <Label id={id}>{label}</Label>}
            <Controller
                control={control}
                defaultValue={defaultValue}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Select isMulti classNamePrefix="select" options={options} onChange={onChange} onBlur={onBlur} value={value} />
                )}
            />
        </div>
    );
}

export function TextAreaField({ name, register, rules, error, ...props }: FieldProps) {
    let id = useId();
    const formRules: Rules = {};
    const { required } = rules || {};
    if (required) {
        formRules["required"] = typeof required === "boolean" ? `Textfield is required` : required;
    }

    return (
        <div className="flex w-full items-center">
            <div className="overflow-hidden [&:has(textarea:focus)]:border-gray-200 [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full flex-grow relative border border-solid rounded-2xl bg-white/90 border-gray-300">
                <textarea
                    id={id}
                    tabIndex={0}
                    rows={1}
                    placeholder="Message ChatGPT…"
                    className="m-0 w-full resize-none border-0 bg-transparent outline-none py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-52 placeholder-black/50 pl-3 md:pl-4"
                    style={{ height: "52px", overflowY: "hidden" }}
                    {...props}
                    {...register(name, formRules)}
                ></textarea>
                <button
                    disabled={error}
                    className="absolute bottom-1.5 right-2 rounded-lg border border-black bg-black p-0.5 text-white transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10 md:bottom-3 md:right-3"
                >
                    <span className="" data-state="closed">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path
                                d="M7 11L12 6L17 11M12 18V7"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                    </span>
                </button>
                {/* <button type="button" className="rounded-full border-2 border-gray-950 p-1 dark:border-gray-200" aria-label="Stop generating">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-2 w-2 text-token-text-primary"
                        height="16"
                        width="16"
                    >
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" stroke-width="0"></path>
                    </svg>
                </button> */}
            </div>
        </div>
    );
}
