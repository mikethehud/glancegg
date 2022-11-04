import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { FormElement } from "../../components/formElement/FormElement";
import { Section } from "../../components/section/Section";
import { TextInput } from "../../components/textInput/TextInput";
import Link from "next/link";
import { TextLink } from "../../components/textLink/TextLink";
import styles from "./Logout.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogInMutation, useLogOutMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../../components/formError/FormError";
import { useRouter } from "next/router";
import { getToken } from "../../lib/jwt/jwt";
import { LayoutPublic } from "../../components/layout/LayoutPublic";
import { Spinner } from "../../components/spinner/Spinner";
import { Layout } from "../../components/layout/Layout";

type Inputs = {
    email: string,
    password: string,
};

const Logout: NextPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ reValidateMode: "onChange" });
    const [logOut, { data, loading, error }] = useLogOutMutation()

    // useEffect(() => {
    //     const checkToken = async () => {
    //         const token = await getToken();
    //         if (token !== "") {
    //             doRedirect()
    //         }
    //     };
    //     checkToken();
    // }, [])

    return (
        <Layout loading={true}>
            <Section size="small">
                <form><h1>Login</h1>
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
        </Layout>
    )
}

export default Logout