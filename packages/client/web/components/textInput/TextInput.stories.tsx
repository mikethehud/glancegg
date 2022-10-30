import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react"
import { TextInput } from "./TextInput";
import { Button } from "../button/Button";

export default {
    title: 'TextInput',
    component: TextInput,
    parameters: {
        componentSubtitle: 'This is a button',
    },
    args: {
        placeholder: "Enter E-Mail",
        error: ""
    }
} as ComponentMeta<typeof TextInput>

export const textInput: ComponentStory<typeof TextInput> = (args) => (
    <>
        <TextInput {...args} />
    </>
)