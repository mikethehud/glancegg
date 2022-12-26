import { NextPage } from "next";
import React, { useEffect } from "react";
import { Button } from "../../components/button/Button";
import { FormElement } from "../../components/formElement/FormElement";
import { Container } from "../../components/container/Container";
import { TextInput } from "../../components/textInput/TextInput";
import Link from "next/link";
import { TextLink } from "../../components/textLink/TextLink";
import styles from "./SignupForm.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUpWithOrgMutation, useSignUpWithoutOrgMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../../components/formError/FormError";
import { useRouter } from "next/router";
import { getToken } from "../../lib/jwt/jwt";
import { LayoutPublic } from "../../components/layout/LayoutPublic";
import { Card } from "../../components/card/Card";
import { Section } from "../../components/container/Section";

type Inputs = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    passwordConfirm: string,
    organizationName: string,
};

interface SignupProps {
    onSuccess: () => void
}

export const SignupForm = ({ onSuccess }: SignupProps) => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<Inputs>({ mode: "onSubmit", reValidateMode: "onChange" });
    const [signUpWithoutOrg, { data, loading, error }] = useSignUpWithoutOrgMutation()

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        signUpWithoutOrg({
            variables: {
                input: {
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    password: formData.password,
                    organizationName: formData.organizationName
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
            <Card>
                <Section>
                    <h2>Organization</h2>
                </Section>
                <Section>
                    <FormElement label="Name">
                        <TextInput
                            placeholder="Organization Name"
                            error={errors.organizationName && errors.organizationName.message}
                            {...register("organizationName", { required: true })}
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