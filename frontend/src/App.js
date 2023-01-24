import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormEdit from './views/FormEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/edit" element={<FormEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
