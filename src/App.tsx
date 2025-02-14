import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/favorites/Favorites";
function App() {
  return (
    <div className="min-h-[100vh] mx-auto">
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
