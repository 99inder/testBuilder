import { Route, Routes } from "react-router-dom";
import AllTestsList from "./pages/AllTestsList";
import FormBuilder from "./pages/FormBuilder"
import RenderTest from "./pages/RenderTest";

function App() {
  return (
    <div className="App">
      <div
        className="min-w-screen min-h-screen overflow-x-hidden bg-slate-50"
      >
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/testsList" element={<AllTestsList />} />
          <Route path="/test/:testId" element={<RenderTest />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
