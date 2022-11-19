import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { FormElement } from "../../components/formElement/FormElement";
import { Section } from "../../components/section/Section";
import { TextInput } from "../../components/textInput/TextInput";
import Link from "next/link";
import { TextLink } from "../../components/textLink/TextLink";
import styles from "./Login.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogInMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../../components/formError/FormError";
import { useRouter } from "next/router";
import { getToken, storeToken } from "../../lib/jwt/jwt";
import { LayoutPublic } from "../../components/layout/LayoutPublic";

type Inputs = {
    email: string,
    password: string,
};

const Login: NextPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ reValidateMode: "onChange" });
    const [logIn, { data, loading, error }] = useLogInMutation()
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
        logIn({
            variables: {
                input: {
                    userEmail: formData.email,
                    userPassword: formData.password,
                }
            }
        })
    }

    const getErrorMessage = (code: string): string => {
        switch (code) {
            case "USER_DOESNT_EXIST":
                return "A user with this email doesn't exist."
            case "WRONG_PASSWORD":
                return "Please enter the correct password for this user."
            default:
                return "Unknown error."
        }
    }

    if (data) {
        storeToken(data.logIn) // store auth token
        doRedirect()
    }

    return (
        <LayoutPublic>
            <Section size="small">
                <form onSubmit={handleSubmit(onSubmit)}><h1>Login</h1>
                    <FormElement label="Email">
                        <TextInput
                            type="email"
                            placeholder="Enter Email"
                            error={errors.email && "Enter your email"}
                            {...register("email", { required: true })}
                        />
                    </FormElement>
                    <FormElement label="Password">
                        <TextInput
                            type="password"
                            placeholder="Enter Password"
                            error={errors.password && "Enter your password"}
                            {...register("password", { required: true })}
                        />
                    </FormElement>
                    {error && <FormError error={getErrorMessage(error.message)} />}
                    <p>
                        <Button primary loading={loading} type="submit">Log In</Button>
                    </p>
                </form>
            </Section>
            <Section size="small" className={styles.bottomLinks}>
                <div>
                    <Link href="/"><TextLink primary>Create New Account</TextLink></Link>
                </div>
                <div>
                    <Link href="/"><TextLink>Forgot Password</TextLink></Link>
                </div>
            </Section>
        </LayoutPublic>
    )
}

export default Login