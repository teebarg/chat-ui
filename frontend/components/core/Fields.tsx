import React, { useId } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import Select from "react-select";

const formClasses = "input input-bordered w-full form-fix";

function Label({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            {children}
        </label>
    );
}

type Types = "text" | "password" | "email" | "number";

type RulesProps = {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
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

export function TextAreaField({ name, register, rules, error, handleClick, loading, ...props }: FieldProps) {
    let id = useId();
    // const textarea = React.useRef<HTMLTextAreaElement>(null);
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };
    const formRules: Rules = {};
    const { required } = rules || {};
    if (required) {
        formRules["required"] = typeof required === "boolean" ? `Textfield is required` : required;
    }

    return (
        <div className="flex w-full items-center">
            <div className="overflow-hidden [&:has(textarea:focus)]:border-gray-200 [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full flex-grow relative border border-solid rounded-2xl border-gray-300">
                <textarea
                    id={id}
                    onInput={handleInput}
                    tabIndex={0}
                    rows={1}
                    placeholder="Message ChatGPT…"
                    className="m-0 w-full resize-none border-0 bg-transparent outline-none py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-52 placeholder-black/50 dark:placeholder:text-white pl-3 md:pl-4 h-14 overflow-y-auto"
                    {...props}
                    {...register(name, formRules)}
                ></textarea>
                {loading ? (
                    <button className="absolute cursor-none bottom-1.5 right-2 p-1 rounded-full border-2 border-gray-950 dark:border-gray-200 md:bottom-3 md:right-3">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" strokeWidth="0"></path>
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={handleClick}
                        disabled={error}
                        className="absolute bottom-1.5 right-2 p-0.5 rounded-lg border border-black transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10 md:bottom-3 md:right-3"
                    >
                        <span data-state="closed">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                                <path
                                    d="M7 11L12 6L17 11M12 18V7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}
