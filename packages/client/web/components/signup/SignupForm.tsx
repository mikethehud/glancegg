import React from "react";
import { Button } from "../../components/button/Button";
import { FormElement } from "../../components/formElement/FormElement";
import { TextInput } from "../../components/textInput/TextInput";
import styles from "./SignupForm.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUpWithoutOrgMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../../components/formError/FormError";
import { Card } from "../../components/card/Card";
import { Section } from "../../components/container/Section";
import { getErrorMessage } from "../../lib/util/errors";
import { validateEmail, validatePasswordsEqual } from "../../lib/util/validation";
import { getTimeZone } from "../../lib/util/timezones";

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
                    organizationName: formData.organizationName,
                    organizationTimezone: getTimeZone()
                }
            }
        })
    }

    if (data) {
        onSuccess()
    }

    console.log(errors)

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
            <Card>
                <Section>
                    <h2>Organization</h2>
                </Section>
                <Section>
                    <FormElement label="Name">
                        <TextInput
                            placeholder="Organization Name"
                            error={errors.organizationName && errors.organizationName.message}
                            {...register("organizationName", {
                                required: { value: true, message: "Organization name is required" }
                            })}
                        />
                    </FormElement>
                </Section>
            </Card>
            {error && <FormError error={getErrorMessage(error.message)} />}
            <div>
                <Button primary loading={loading} type="submit">Create Your Account</Button>
            </div>
        </form>
    )
}
