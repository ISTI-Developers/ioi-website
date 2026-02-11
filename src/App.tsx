import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import { lazy, Suspense } from "react";


//Public
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Projects = lazy(() => import("./pages/Project"));


//Admin
const Team = lazy(() => import("./pages/Admin/Team"));


function App() {

  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div
    className={`min-h-screen ${isAdminRoute ? "bg-white" : "bg-black"}`

    }
    >
      {!isAdminRoute && <Navbar /> }
      <AppRoutes />
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='projects' element={<Projects />} />
        <Route path='projects/:title' element={<ProjectDetails />} />
        <Route path="careers" element={<Careers />} />
        <Route path="about" element={<><About /></>} />
        <Route path="contact" element={<Contact />} />



        <Route path="admin/team" element={<Team />} />
        
        <Route path="*" element={<>Error 404</>} />
      </Routes>
    </Suspense>
  );
}

export default App;