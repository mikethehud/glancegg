import React from "react"
import { InternalButtonProps, getButtonClassesFromProps } from "./Button";

type ButtonLinkProps = InternalButtonProps & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const ButtonLink = (props: ButtonLinkProps) => (
    <a
        {...props}
        className={getButtonClassesFromProps(props)}
    >
        {props.children}
    </a>
)