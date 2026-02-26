import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import { lazy, Suspense } from "react";
import { cn } from "./lib/utils";


//Public
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Projects = lazy(() => import("./pages/Project"));


//Admin
const Team = lazy(() => import("./pages/Admin/Team"));
const Client = lazy(() => import("./pages/Admin/Client"));
const Project = lazy(() => import("./pages/Admin/Project"));
const Career = lazy(() => import("./pages/Admin/Career"));



function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className={`min-h-screen ${isAdminRoute ? "bg-white font-sans" : "bg-black"}`}>
      {!isAdminRoute && <Navbar />}
      <AppRoutes />
      {!isAdminRoute && <Footer />}
    </div>
  );
}


function AppRoutes() {


  return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>

          <div
           
          >
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:title" element={<ProjectDetails />} />
              <Route path="careers" element={<Careers />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />

              {/* Admin */}
              <Route path="admin" element={<Sidebar />}>
                <Route path="team" element={<Team />} />
                <Route path="clients" element={<Client />} />
                <Route path="projects" element={<Project />} />
                <Route path="careers" element={<Career />} />
              </Route>

              <Route path="*" element={<>Error 404</>} />
            </Routes>

          </div>
        </Suspense>

  );
}

export default App;