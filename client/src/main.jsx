import ReactDOM from "react-dom/client";
import WorkoutContextProvider from "./context/WorkoutContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WorkoutContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </WorkoutContextProvider>
);
