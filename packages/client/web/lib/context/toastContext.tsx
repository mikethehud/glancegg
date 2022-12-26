import { PropsWithChildren, useContext, useState, createContext, useEffect, useRef } from "react";
import { AnimationClasses, Toast, ToastProps } from "../../components/toast/Toast";
import { CSSTransition } from "react-transition-group"

interface IToastContext {
    showToast: (toast: ToastProps) => void
    showSuccessToast: (text: string) => void
}

const ToastContext = createContext({} as IToastContext)

const initToast: ToastProps = {
    style: 'info',
    text: '',
}

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [toast, setToast] = useState<ToastProps>(initToast)
    const [active, setActive] = useState(false)

    const showToast = (toast: ToastProps) => {
        setToast(toast)
        setActive(true)
    }

    const showSuccessToast = (text: string) => {
        showToast({
            style: "success",
            text
        })
    }

    const toastRef = useRef(null)

    return (
        <ToastContext.Provider value={{ showToast, showSuccessToast }}>
            <CSSTransition
                in={active}
                nodeRef={toastRef}
                timeout={3000}
                classNames={{
                    enterActive: AnimationClasses.enter,
                    exitActive: AnimationClasses.exit,
                }}
                // exit once we've entered
                onEntered={() => setActive(false)}
                onExited={() => setToast(initToast)}
            >
                <Toast {...toast} ref={toastRef} />
            </CSSTransition>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext<IToastContext>(ToastContext)