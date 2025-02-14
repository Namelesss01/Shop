import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/favorites/Favorites";
import More from "./pages/more/More";
function App() {
  return (
    <div className="min-h-[100vh] mx-auto">
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </div>
  );
}

export default App;