import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Process from "./components/Process";
import Team from "./components/Team";
import Audit from "./components/Audit";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Industries />
      <Process />
      <Team />
      <Audit />
      <Contact />
      <Footer />
    </>
  );
}