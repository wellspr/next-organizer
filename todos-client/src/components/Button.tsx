interface ButtonProps {
    className?: string,
    type?: "button" | "reset" | "submit" | undefined,
    disabled?: boolean | undefined,
    label?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button: React.FC<ButtonProps> = ({ className, type, disabled, label, onClick }) => {

    return (
        <button className={className} type={type} disabled={disabled} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;