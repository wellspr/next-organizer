import { useCallback, useEffect, useRef } from "react";

interface EditableProps {
    showUpdateInput: boolean,
    setShowUpdateInput: React.Dispatch<React.SetStateAction<boolean>>,
    value: string,
    updatedValue: string,
    setUpdatedValue: React.Dispatch<React.SetStateAction<string>>,
    onUpdateSubmit: () => void,
    baseClassName:string,
}

const Editable = (props: EditableProps) => {

    const updateInputRef = useRef<HTMLInputElement>(null);

    const onClickListName = useCallback(() => {
        props.setShowUpdateInput(true);
    }, []);

    const onInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Escape") {
            event.preventDefault();
            props.setShowUpdateInput(false);
        }
    }, []);

    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onUpdateSubmit();
        props.setShowUpdateInput(false);
    }, [props.onUpdateSubmit]);

    useEffect(() => {
        if (updateInputRef && updateInputRef.current) {
            updateInputRef.current.focus();
        }
    }, [updateInputRef, updateInputRef.current]);

    const onClick = useCallback((event: MouseEvent) => {    
        if (props.showUpdateInput) {
            if (updateInputRef.current) {
                if (updateInputRef.current.contains(event.target as Node)) {
                    return;
                }
            }
            props.setShowUpdateInput(false);
        }
    }, [props.showUpdateInput]);

    useEffect(() => {
        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
        };
    }, [onClick]);

    return (
        <>
            <div
                className={
                    props.showUpdateInput ?
                        `${props.baseClassName}__value--hidden` :
                        `${props.baseClassName}__value`
                }
                onClick={onClickListName}
            >
                {props.value}
            </div>
            <form onSubmit={onSubmit}>
                <input
                    ref={updateInputRef}
                    className={
                        props.showUpdateInput ?
                            `${props.baseClassName}__updateInput--show` :
                            `${props.baseClassName}__updateInput`
                    }
                    value={props.updatedValue}
                    onChange={e => props.setUpdatedValue(e.target.value)}
                    onKeyDown={onInputKeyDown}
                    type="text"
                    autoFocus={true}
                />
            </form>
        </>
    );
};

export default Editable;