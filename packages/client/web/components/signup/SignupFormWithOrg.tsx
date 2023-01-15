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
import { getErrorMessage, validateEmail, validatePasswordsEqual } from "./utils";

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
                            {...register("firstName", { required: "This field is required." })}
                        />
                    </FormElement>
                    <FormElement label="Last Name">
                        <TextInput
                            placeholder="Enter Last Name"
                            error={errors.lastName && errors.lastName.message}
                            {...register("lastName", { required: "This field is required." })}
                        />
                    </FormElement>
                </Section>
                <Section>
                    <FormElement label="Email">
                        <TextInput
                            type="email"
                            placeholder="Enter Email"
                            error={errors.email && errors.email.message}
                            {...register("email", {
                                required: "This field is required.",
                                validate: validateEmail
                            })}
                        />
                    </FormElement>
                </Section>
                <Section split>
                    <FormElement label="Password">
                        <TextInput
                            type="password"
                            placeholder="Enter Password"
                            error={errors.password && errors.password.message}
                            {...register("password", {
                                required: "This field is required.",
                                minLength: {
                                    value: 8,
                                    message: "Passwords must be at least 8 characters long."
                                }
                            })}
                        />
                    </FormElement>
                    <FormElement label="Confirm Password">
                        <TextInput
                            type="password"
                            placeholder="Confirm Password"
                            error={errors.passwordConfirm && errors.passwordConfirm.message}
                            {...register("passwordConfirm", {
                                required: "This field is required.",
                                validate: val => validatePasswordsEqual(watch('password'), val)
                            })}
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