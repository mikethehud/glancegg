import classNames from "classnames";
import React, { ReactNode } from "react"

import styles from "./Button.module.css"
import { Spinner } from "../spinner/Spinner";
import { Button, ButtonProps } from "./Button";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconButtonProps extends ButtonProps {
    icon: IconProp
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ loading, icon, className, disabled, ...attributes }, forwardRef) => {
        const classes = classNames(className, styles.iconButton)

        return (
            <Button
                className={classes}
                ref={forwardRef}
                disabled={disabled || loading}
                {...attributes}
            >
                {loading ? <Spinner /> : <FontAwesomeIcon icon={icon} className={styles.icon} />}
            </Button>
        )
    }
)