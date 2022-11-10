import "./App.css";
import { Routes, Route } from "react-router";
import Randompage from "./cryptodata/Randompage";
import Error from "./cryptodata/Error";
import MainFile from "./MainFile";

function App() {
  return (
    <div>
      <Routes>
        {/* Just to let you know the use of of routes and route */}
        <Route path="/Randompage" element={<Randompage />} />
        <Route path="*" element={<Error />} />
        <Route path="/" element={<MainFile />} />
      </Routes>
    </div>
  );
}
export default App;
