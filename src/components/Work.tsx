import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";

gsap.registerPlugin(useGSAP);

// repos to exclude (forks, portfolio itself, empty repos)
const EXCLUDED = ["portfolio", "Fund", "doctor-appointment-system", "codeigniter"];

// language → tech label mapping
const LANG_MAP: Record<string, string> = {
  JavaScript: "JavaScript, HTML, CSS",
  TypeScript: "TypeScript, React",
  HTML: "HTML, CSS, JavaScript",
};

interface Repo {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  description: string | null;
  pushed_at: string;
}

const Work = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/desouvik100/repos?per_page=100&sort=pushed")
      .then((r) => r.json())
      .then((data: Repo[]) => {
        const filtered = data
          .filter((r) => !EXCLUDED.includes(r.name) && r.language)
          .slice(0, 8);
        setRepos(filtered);
      })
      .catch(console.error);
  }, []);

  useGSAP(() => {
    if (repos.length === 0) return;

    let translateX: number = 0;
    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box.length) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      duration: 40,
      delay: 0.2,
    });
  }, [repos]);

  // format repo name for display
  const formatName = (name: string) =>
    name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // derive category from language
  const getCategory = (lang: string | null) => {
    if (!lang) return "Project";
    if (lang === "TypeScript") return "Frontend / React";
    if (lang === "JavaScript") return "Full-Stack / JS";
    return "Frontend";
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {repos.map((repo, index) => (
            <div className="work-box" key={repo.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{formatName(repo.name)}</h4>
                    <p>{getCategory(repo.language)}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{LANG_MAP[repo.language ?? ""] ?? repo.language}</p>
              </div>
              <WorkImage
                image="/images/placeholder.webp"
                alt={repo.name}
                link={repo.homepage ?? repo.html_url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
