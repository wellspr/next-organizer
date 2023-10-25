import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Next Todo App',
    description: 'A Todo App Powered by Next JS',
};

import { TodosCompleted, TodosInput, TodosList } from "./components";

const Home = () => {

    return (
        <>
            <TodosInput />

            <h2>Current Tasks</h2>
            <TodosList />

            <h2>Completed Tasks</h2>
            <TodosCompleted />
        </>
    );
};

export default Home;
