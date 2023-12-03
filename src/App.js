import { Route, Routes } from "react-router-dom";
import AllTestsList from "./pages/AllTestsList";
import FormBuilder from "./pages/FormBuilder"
import RenderTest from "./pages/RenderTest";
import Navbar from "./Components/Common/Navbar";

function App() {
  return (
    <div className="App">
      <div
        className="min-w-screen min-h-screen overflow-x-hidden bg-slate-50"
      >
        <Navbar />
        <div className="pt-[3.5rem]">
          <Routes>
            <Route path="/" element={<FormBuilder />} />
            <Route path="/testsList" element={<AllTestsList />} />
            <Route path="/test/:testId" element={<RenderTest />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
