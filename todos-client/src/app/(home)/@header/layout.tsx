const HeaderLayout = (props: {
    appName: React.ReactNode,
    menu: React.ReactNode,
    buttons: React.ReactNode,
    input: React.ReactNode,
}) => {

    return (
        <header className="header">
            <div className="header__top">
                {props.appName}
                {props.menu}
                {props.buttons}
            </div>
            {props.input}
        </header>
    );
};

export default HeaderLayout;