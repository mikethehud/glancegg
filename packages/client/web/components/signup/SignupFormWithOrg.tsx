import React from "react";
import { Button } from "../button/Button";
import { FormElement } from "../formElement/FormElement";
import { TextInput } from "../textInput/TextInput";
import styles from "./SignupForm.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUpWithOrgMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../formError/FormError";
import { Card } from "../card/Card";
import { Section } from "../container/Section";

type Inputs = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    passwordConfirm: string,
};

interface SignupProps {
    organizationID: string
    onSuccess: () => void
}

export const SignupFormWithOrg = ({ organizationID, onSuccess }: SignupProps) => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<Inputs>({ mode: "onSubmit", reValidateMode: "onChange" });
    const [signUpWithOrg, { data, loading, error }] = useSignUpWithOrgMutation()

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        signUpWithOrg({
            variables: {
                input: {
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    password: formData.password,
                    organizationID: organizationID,
                }
            }
        })
    }

    const getErrorMessage = (code: string): string => {
        switch (code) {
            case "USER_NOT_UNIQUE":
                return "A user with this email already exists."
            case "VALIDATION_ERROR":
                return "Some of those fields don't look right. Please try again."
            default:
                return "Unknown error."
        }
    }

    const validatePasswordsEqual = (val: string): boolean => {
        return watch('password') === val
    }

    if (data) {
        onSuccess()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Card>
                <Section>
                    <h2>User</h2>
                </Section>
                <Section split>
                    <FormElement label="First Name">
                        <TextInput
                            placeholder="Enter First Name"
                            error={errors.firstName && errors.firstName.message}
                            {...register("firstName", { required: true })}
                        />
                    </FormElement>
                    <FormElement label="Last Name">
                        <TextInput
                            placeholder="Enter Last Name"
                            error={errors.lastName && errors.lastName.message}
                            {...register("lastName", { required: true })}
                        />
                    </FormElement>
                </Section>
                <Section>
                    <FormElement label="Email">
                        <TextInput
                            type="email"
                            placeholder="Enter Email"
                            error={errors.email && errors.email.message}
                            {...register("email", { required: true })}
                        />
                    </FormElement>
                </Section>
                <Section split>
                    <FormElement label="Password">
                        <TextInput
                            type="password"
                            placeholder="Enter Password"
                            error={errors.password && errors.password.message}
                            {...register("password", { required: true, minLength: 8 })}
                        />
                    </FormElement>
                    <FormElement label="Confirm Password">
                        <TextInput
                            type="password"
                            placeholder="Confirm Password"
                            error={errors.passwordConfirm && errors.passwordConfirm.message}
                            {...register("passwordConfirm", { required: true, minLength: 8, validate: validatePasswordsEqual })}
                        />
                    </FormElement>
                </Section>
            </Card>
            {error && <FormError error={getErrorMessage(error.message)} />}
            <Section>
                <Button primary loading={loading} type="submit">Create Your Account</Button>
            </Section>
        </form>
    )
}