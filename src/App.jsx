import './App.css';
import { Box } from '@mui/material';
import { LeftBar } from './components/LeftBar.jsx';
import TodoList from './components/TodoList.jsx';

function App() {
  return (
    <Box className="app-container">
      <LeftBar />
      <Box className="main-content">
        <TodoList />
      </Box>
    </Box>
  )
}

export default App;
