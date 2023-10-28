import type { Metadata } from 'next';
import Todos from './components/Todos';

export const metadata: Metadata = {
    title: 'Next Todo App',
    description: 'A Todo App Powered by Next JS',
};

const Home = () => {

    return (
      <Todos />  
    );
};

export default Home;
