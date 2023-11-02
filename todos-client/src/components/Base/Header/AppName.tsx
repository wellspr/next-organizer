const AppName = (props: { 
    baseClassName: string
 }) => {
    return (
        <div 
            className={
                props.baseClassName ?
                `${ props.baseClassName }__app-name` :
                "app-name"
            }
            >
            <h1>Next Todos</h1>
        </div>
    );
};

export default AppName;