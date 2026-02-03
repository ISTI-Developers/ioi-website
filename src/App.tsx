import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import { lazy, Suspense } from "react";


const Home = lazy(() => import("./pages/Home"));
const ProjectItem = lazy(() => import("./pages/ProjectItems"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <AppRoutes />
      <Footer/>
    </BrowserRouter>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<>Projects List</>} />
        <Route path="projects/:title" element={<ProjectItem />} />
        <Route path="careers" element={<Careers/>} />
        <Route path="about" element={<><About/></>} />
        <Route path="contact" element={<>Contact</>} />
        <Route path="*" element={<>Error 404</>} />
      </Routes>
    </Suspense>
  );
}

export default App;