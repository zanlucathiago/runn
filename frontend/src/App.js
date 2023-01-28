import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormEdit from './views/FormEdit';
import FormList from './views/FormList';
import FormResponses from './views/FormResponses';
import InstanceCreate from './views/InstanceCreate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/d/:id/edit" element={<FormEdit />} />
        <Route path="/d/:id/responses" element={<FormResponses />} />
        <Route path="/d/e/:id/view" element={<InstanceCreate />} />
      </Routes>
    </Router>
  );
}

export default App;
