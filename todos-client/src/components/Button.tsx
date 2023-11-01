interface ButtonProps {
    className?: string,
    type?: "button" | "reset" | "submit" | undefined,
    disabled?: boolean | undefined,
    label?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    children?: React.ReactNode,
}

const Button: React.FC<ButtonProps> = ({ 
    className, 
    type, 
    disabled, 
    label, 
    onClick, 
    children 
}) => {

    return (
        <button className={className} type={type} disabled={disabled} onClick={onClick}>
            { children || label }
        </button>
    );
};

export default Button;