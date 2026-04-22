import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import PublicLayout from "./components/layout/PublicLayout";
import { lazy, Suspense } from "react";
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
const Settings = lazy(() => import ("./pages/Admin/Settings"));



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
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<>Error 404</>} />
      </Routes>


    </Suspense >

  );
}

export default App;