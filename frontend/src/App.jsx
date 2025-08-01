import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import EventListView from './pages/EventListView';
import CreateEventWizard from './pages/CreateEventWizard';
import AIAssistant from './components/AIAssistant';
import SubNavigation from './components/SubNavigation';

const AppLayout = () => {
    const location = useLocation();
    const isCreateRoute = location.pathname === '/create-event';

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-white border-b border-slate-200 px-4 shrink-0 h-14"></header>

            {!isCreateRoute && <SubNavigation />}

            <div className="flex flex-grow overflow-hidden">
                <Routes>
                    <Route path="/" element={
                        <>
                            <main className="flex-grow overflow-y-auto">
                                <EventListView />
                            </main>
                            <AIAssistant />
                        </>
                    } />
                    <Route path="/create-event" element={
                        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
                            <CreateEventWizard />
                        </main>
                    } />
                </Routes>
            </div>
        </div>
    );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;