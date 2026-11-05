import { Navigate, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { SignInPage, SignUpPage } from "@/pages/Auth";
import ClerkAuthProvider from "@/components/auth/ClerkAuthProvider";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <ClerkAuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ClerkAuthProvider>
  );
}
