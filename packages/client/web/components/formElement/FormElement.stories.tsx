import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react"
import { FormElement } from "./FormElement";
import { TextInput } from "../textInput/TextInput";
import { Button } from "../button/Button";

export default {
    title: 'FormElement',
    component: FormElement,
    parameters: {
        componentSubtitle: 'This is a button',
    },
    args: {
        label: "Kekw"
    }
} as ComponentMeta<typeof FormElement>

export const formElement: ComponentStory<typeof FormElement> = (args) => (
    <>
        <FormElement {...args}><TextInput placeholder="Enter Text"/></FormElement>
    </>
)