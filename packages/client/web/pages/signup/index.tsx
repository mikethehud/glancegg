import { NextPage } from "next";
import React, { useEffect } from "react";
import { Button } from "../../components/button/Button";
import { FormElement } from "../../components/formElement/FormElement";
import { Section } from "../../components/section/Section";
import { TextInput } from "../../components/textInput/TextInput";
import Link from "next/link";
import { TextLink } from "../../components/textLink/TextLink";
import styles from "./Signup.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUpMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../../components/formError/FormError";
import { useRouter } from "next/router";
import { getToken } from "../../lib/jwt/jwt";
import { LayoutPublic } from "../../components/layout/LayoutPublic";

type Inputs = {
    email: string,
    name: string,
    password: string,
    passwordConfirm: string,
    organizationName: string,
};

const Login: NextPage = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<Inputs>({ mode: "onSubmit", reValidateMode: "onChange" });
    const [signUp, { data, loading, error }] = useSignUpMutation()
    const router = useRouter()

    const doRedirect = () => {
        if(router.query.redirectTo) {
            router.push(router.query.redirectTo as string)
        }
        else {
            router.push('/home')
        }
    }

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token !== "") {
                doRedirect()
            }
        };
        checkToken();
    }, [])

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        signUp({
            variables: {
                input: {
                    userEmail: formData.email,
                    userName: formData.name,
                    userPassword: formData.password,
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
        doRedirect()
    }

    return (
        <LayoutPublic>
            <Section size="medium">
                <h1>Sign Up</h1>
                <p>
                    Todo: Add some text here to explain why it's cool 😎
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.split}>
                        <FormElement label="Your Name">
                            <TextInput
                                placeholder="Enter Name"
                                error={errors.name && errors.name.message}
                                {...register("name", { required: true })}
                            />
                        </FormElement>
                        <FormElement label="Email">
                            <TextInput
                                type="email"
                                placeholder="Enter Email"
                                error={errors.email && errors.email.message}
                                {...register("email", { required: true })}
                            />
                        </FormElement>
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
                    </div>
                    <FormElement label="Organization Name">
                        <TextInput
                            placeholder="Organization Name"
                            error={errors.organizationName && errors.organizationName.message}
                            {...register("organizationName", { required: true })}
                        />
                    </FormElement>
                    {error && <FormError error={getErrorMessage(error.message)} />}
                    <p>
                        <Button primary loading={loading} type="submit">Create Your Account</Button>
                    </p>
                </form>
            </Section>
            <Section size="medium" className={styles.bottomLinks}>
                <div>
                    <Link href="/login"><TextLink primary>Log In</TextLink></Link>
                </div>
                <div>
                    <Link href="/forgot_password"><TextLink>Forgot Password</TextLink></Link>
                </div>
            </Section>
        </LayoutPublic>
    )
}

export default Login