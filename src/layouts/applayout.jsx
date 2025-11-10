import { Outlet } from 'react-router-dom';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import './applayout.css';
import ChatBot from '../components/chatbot';

const AppLayout = () => {
  return (
    <div className="app-layout">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <ChatBot/>
      <Footer />
    </div>
  );
};

export default AppLayout;
