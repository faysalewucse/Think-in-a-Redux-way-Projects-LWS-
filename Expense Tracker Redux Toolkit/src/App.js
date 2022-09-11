import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTransactions from "./pages/AllTransactions";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-transactions" element={<AllTransactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
