import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Resume from "@/components/Resume";
import Interests from "@/components/Interests";
import Research from "@/components/Research";
import Contact from "@/components/Contact";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rahul Rao",
  url: "https://rahulrao.dev",
  email: "rao.rahul1@northeastern.edu",
  jobTitle: "Software Developer",
  description:
    "Computer Science student at Northeastern University (Khoury College) building full-stack applications, machine learning pipelines, and quantitative systems.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Northeastern University",
    url: "https://www.northeastern.edu",
  },
  sameAs: [
    "https://github.com/RahulR30",
    "https://www.linkedin.com/in/rahul-rao-755b46236/",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Portfolio />
        <Resume />
        <Interests />
        <Research />
        <Contact />
      </main>
    </>
  );
}
