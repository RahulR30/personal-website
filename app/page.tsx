import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Resume from "@/components/Resume";
import Interests from "@/components/Interests";
import Research from "@/components/Research";
import Contact from "@/components/Contact";
import ExploreShell from "@/components/explore/ExploreShell";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rahul Rao",
  url: "https://rahulrao.dev",
  email: "rao.rahul1@northeastern.edu",
  jobTitle: "ML Research Assistant & Software Engineer",
  description:
    "Computer Science student at Northeastern University (Khoury College) researching machine learning on high-frequency market data and building production data infrastructure as a software engineer at Wayfair.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Northeastern University",
    url: "https://www.northeastern.edu",
  },
  knowsAbout: [
    "Quantitative Research",
    "Time Series Modeling",
    "Market Microstructure",
    "Machine Learning",
    "Software Engineering",
    "Distributed Data Systems",
    "PyTorch",
    "C++",
    "Python",
    "C#",
  ],
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
      <ExploreShell>
        <main className="min-h-screen">
          <Navbar />
          <Hero />
          <Research />
          <Resume />
          <Portfolio />
          <Interests />
          <Contact />
        </main>
      </ExploreShell>
    </>
  );
}
