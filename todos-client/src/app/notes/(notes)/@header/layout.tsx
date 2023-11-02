const HeaderLayout = (props: {
    appName: React.ReactNode,
    menu: React.ReactNode,
}) => {

    return (
        <header className="header">
            <div className="header__top">
                {props.appName}
                {props.menu}
            </div>
        </header>
    );
};

export default HeaderLayout;