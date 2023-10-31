const arrowDown = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-arrow-down ${className}` : `icon icon-arrow-down`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M18 13l-6 6" />
            <path d="M6 13l6 6" />
        </svg>
    );
};

const arrowUp = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-arrow-up ${className}` : `icon icon-arrow-up`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M18 11l-6 -6" />
            <path d="M6 11l6 -6" />
        </svg>
    );
};

const caretLeft = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-caret-left ${className}` : `icon icon-caret-left`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 6l-6 6l6 6v-12" />
        </svg>
    );
};

const caretRight = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-caret-right ${className}` : `icon icon-caret-right`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 18l6 -6l-6 -6v12" />
        </svg>
    );
};

const loader = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-tabler-loader ${className}` : `icon icon-tabler-loader`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 6l0 -3" />
            <path d="M16.25 7.75l2.15 -2.15" />
            <path d="M18 12l3 0" />
            <path d="M16.25 16.25l2.15 2.15" />
            <path d="M12 18l0 3" />
            <path d="M7.75 16.25l-2.15 2.15" />
            <path d="M6 12l-3 0" />
            <path d="M7.75 7.75l-2.15 -2.15" />
        </svg>
    );
};

const refresh = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-refresh ${className}` : `icon icon-refresh`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
        </svg>
    );
};

const search = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-search ${className}` : `icon icon-search`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
        </svg>
    );
};

const separator = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-separator ${className}` : `icon icon-separator`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12l0 .01" />
            <path d="M7 12l10 0" />
            <path d="M21 12l0 .01" />
        </svg>

    );
};

const tilde = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-tilde ${className}` : `icon icon-tilde`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 12c0 -1.657 1.592 -3 3.556 -3c1.963 0 3.11 1.5 4.444 3c1.333 1.5 2.48 3 4.444 3s3.556 -1.343 3.556 -3" />
        </svg>
    );
};

const x = (className: string = "") => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className ? `icon icon-x ${className}` : `icon icon-x`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
    );
};

type IconType =
    "arrow-down" |
    "arrow-up" |
    "caret-left" |
    "caret-right" |
    "loader" |
    "refresh" |
    "search" |
    "separator" |
    "tilde" |
    "x"
    ;


const Icon: React.FC<{ icon: IconType, className?: string }> = ({ icon, className }) => {

    switch (icon) {
        case "arrow-down":
            return arrowDown(className);
        case "arrow-up":
            return arrowUp(className);
        case "caret-left":
            return caretLeft(className);
        case "caret-right":
            return caretRight(className);
        case "loader":
            return loader(className);
        case "refresh":
            return refresh(className);
        case "search":
            return search(className);
        case "separator":
            return separator(className);
        case "tilde":
            return tilde(className);
        case "x":
            return x(className);
        default:
            return null;
    }
};

export default Icon;