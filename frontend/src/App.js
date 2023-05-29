import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormList from './views/FormList';
import InstanceCreate from './views/InstanceCreate';
import FormView from './views/FormView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/d/:id/edit" element={<FormView />} />
        <Route path="/d/e/:id/view" element={<InstanceCreate />} />
      </Routes>
    </Router>
  );
}

export default App;
