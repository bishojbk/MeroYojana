import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Schemes from "./pages/Schemes";
import Applications from "./pages/Applications";
import DocumentVerification from "./pages/DocumentVerification";
import AuditLogs from "./pages/AuditLogs";
import Complaints from "./pages/Complaints";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/applications" element={<Applications />} />
            <Route
              path="/doc-verification"
              element={<DocumentVerification />}
            />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
