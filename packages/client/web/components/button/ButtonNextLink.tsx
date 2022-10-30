import Link, { LinkProps } from "next/link";
import React from "react"
import { InternalButtonProps, getButtonClassesFromProps } from "./Button";

type ButtonNextLinkProps = InternalButtonProps & LinkProps

export const Button = (props: ButtonNextLinkProps) => (
    <Link
        {...props}
        className={getButtonClassesFromProps(props)}
    >
        {props.children}
    </Link>
)