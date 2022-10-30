import { NextPage } from "next";
import React, { useState } from "react";
import { Button } from "../../components/button/Button";
import { FormElement } from "../../components/formElement/FormElement";
import { Section } from "../../components/section/Section";
import { TextInput } from "../../components/textInput/TextInput";
import Link from "next/link";
import { TextLink } from "../../components/textLink/TextLink";
import styles from "./Login.module.css"

type LoginForm = {
    password: {
        value: string
        error: string
    }
    email: {
        value: string
        error: string
    }
}

const Login: NextPage = () => {
    const [form, setForm] = useState<LoginForm>({
        password: {value:"",error:""},
        email: {value:"",error:""},
    })

    const handleEmailChange = (value: string) => {
        setForm({
            ...form,
            email: {
                value,
                error: ""
            }
        })
    }

    const handlePasswordChange = (value: string) => {
        setForm({
            ...form,
            password: {
                value,
                error: ""
            }
        })
    }

    const handleSubmit = () => {
        setForm({
            email: {
                ...form.email,
                error: form.email.value == "" ? "Email can't be empty" : ""
            },
            password: {
                ...form.password,
                error: form.password.value == "" ? "Password can't be empty" : ""
            }
        })
    }

    return (
        <>
            <Section size="small">
                <h1>Login</h1>
                <p>Email: {form.email.value} {form.email.error}</p>
                <p>Email: {form.password.value} {form.password.error}</p>
                <FormElement label="Email">
                    <TextInput
                        value={form.email.value}
                        type="email"
                        placeholder="Enter Email"
                        error={form.email.error}
                        onChange={e => handleEmailChange(e.target.value)}
                    />
                </FormElement>
                <FormElement label="Password">
                    <TextInput
                        value={form.password.value}
                        type="password"
                        placeholder="Enter Password"
                        error={form.password.error}
                        onChange={e => handlePasswordChange(e.target.value)}
                    />
                </FormElement>
                <p>
                    <Button primary onClick={() => handleSubmit()}>Log In</Button>
                </p>
            </Section>
            <Section size="small" className={styles.bottomLinks}>
                <div>
                    <Link href="/"><TextLink primary>Create New Account</TextLink></Link>
                </div>
                <div>
                    <Link href="/"><TextLink>Forgot Password</TextLink></Link>
                </div>
            </Section>
        </>
    )
}

export default Login