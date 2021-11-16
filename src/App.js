import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home';

function App() {
  return (
    <Home/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" exact component={Home}/>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
