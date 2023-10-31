const HeaderLayout = (props: {
    appName: React.ReactNode,
    buttons: React.ReactNode,
    input: React.ReactNode,
}) => {

    return (
        <header className="header">
            <div className="header__top">
                {props.appName}
                {props.buttons}
            </div>
            {props.input}
        </header>
    );
};

export default HeaderLayout;