import { Header, Footer } from '@/components/Base';
import { Provider } from '@/context';
import { Todos } from '@/components';

export default function HomeLayout(props: {
    todos: React.ReactNode,
    children: React.ReactNode
}) {
    return (
        <Provider.Todos>
            <Header>
                <div className="header__opt">
                    <Todos.Input />
                    <div className="header__opt__buttons">
                        <Todos.SyncButton />
                    </div>
                </div>
            </Header>
            <main className="main-container">
                {props.todos}
                {props.children}
            </main>
            <Footer />
        </Provider.Todos>
    );
}