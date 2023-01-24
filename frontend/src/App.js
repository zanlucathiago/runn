import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormEdit from './views/FormEdit';
import FormList from './views/FormList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/edit/:id" element={<FormEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
