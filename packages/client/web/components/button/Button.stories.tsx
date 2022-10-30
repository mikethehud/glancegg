import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Button } from "./Button";

export default {
    title: 'Button',
    component: Button,
    parameters: {
        componentSubtitle: 'This is a button',
    },
    args: {
        primary: true,
        small: false,
    }
} as ComponentMeta<typeof Button>

export const button: ComponentStory<typeof Button> = (args) => (
    <Button {...args}>{args.children || 'Click me'}</Button>
)