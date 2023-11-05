import AppName from "./AppName";
import Menu from "./Menu";

const Header = (props: {
    children?: React.ReactNode,
}) => {

    return (
        <header className="header">
                <div className="header__top">
                    <div className="header__top__app-name">
                        <AppName baseClassName="header__top" />
                    </div>
                    <Menu baseClassName="header__top" />
                </div>
                { props.children }
            </header>
    );
};

export default Header;