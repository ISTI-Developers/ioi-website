import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";
import { lazy, Suspense } from "react";
import { cn } from "./lib/utils";
import { ProtectedRoute } from "./components/pages/auth/ProtectedRoute";



//Public
const Login = lazy(() => import("./pages/Login"));
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
const Banner = lazy(() => import("./pages/Admin/Banner"));



function App() {

  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <Routes>


        <Route path="login" element={<Login />} />

        
        {/* Public */}
        <Route element={<PublicLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="careers" element={<Careers />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin */}
        <Route path="admin" element={<ProtectedRoute />}>
          <Route element={<Sidebar />}>
            <Route path="team" element={<Team />} />
            <Route path="clients" element={<Client />} />
            <Route path="projects" element={<Project />} />
            <Route path="careers" element={<Career />} />
            <Route path="banners" element={<Banner />} />
          </Route>
        </Route>


        <Route path="*" element={<>Error 404</>} />

      </Routes>


    </Suspense >

  );
}

export default App;