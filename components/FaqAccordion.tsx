import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaDatabase,
  FaLock,
  FaCode,
  FaSearch,
  FaList,
  FaPen,
  FaUsers,
} from "react-icons/fa";
import {
  SiAuth0,
  SiDaisyui,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);
    setIntervalId(interval);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number) => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setActiveIndex(index);
  };

  return (
    <>
      <div className="collapse bg-purple-400 bg-opacity-10 border-2 border-purple-600">
        <input
          onChange={() => handleChange(0)}
          checked={activeIndex === 0}
          type="radio"
          name="faq-accordion"
        />
        <div className="collapse-title text-xl font-medium">
          What is Read Away?
        </div>
        <div className="collapse-content">
          <p className="py-6 text-lg">
            An innovative application designed to help you effortlessly keep
            track of your reading progress and share insightful reviews of your
            favorite books.
          </p>
        </div>
      </div>
      <div className="collapse my-2 bg-purple-400 bg-opacity-10 border-2 border-purple-600">
        <input
          onChange={() => handleChange(1)}
          checked={activeIndex === 1}
          type="radio"
          name="faq-accordion"
        />
        <div className="collapse-title text-xl font-medium">Features</div>
        <div className="collapse-content">
          <ul className="grid gap-4">
            <li className="flex items-center">
              <FaSearch className="mr-2" /> Search books
            </li>
            <li className="flex items-center">
              <FaList className="mr-2" /> Manage collections (reading lists)
            </li>
            <li className="flex items-center">
              <FaPen className="mr-2" /> Manage personal reviews
            </li>
            <li className="flex items-center">
              <FaUsers className="mr-2" /> See reviews by other users within the
              app
            </li>
          </ul>
        </div>
      </div>
      <div className="collapse bg-purple-400 bg-opacity-10 border-2 border-purple-600">
        <input
          onChange={() => handleChange(2)}
          checked={activeIndex === 2}
          type="radio"
          name="faq-accordion"
        />
        <div className="collapse-title text-xl font-medium">Tech Stack</div>
        <div className="collapse-content">
          <ul className="grid grid-cols-2 gap-4">
            <li className="flex items-center">
              <SiNextdotjs className="mr-2" /> Next.js
            </li>
            <li className="flex items-center">
              <SiPostgresql className="mr-2" /> PostgreSQL
            </li>
            <li className="flex items-center">
              <SiPrisma className="mr-2" /> PrismaORM
            </li>
            <li className="flex items-center">
              <SiAuth0 className="mr-2" /> Auth0
            </li>
            <li className="flex items-center">
              <SiTypescript className="mr-2" /> TypeScript
            </li>
            <li className="flex items-center">
              <SiDaisyui className="mr-2 text-2xl" /> DaisyUI
            </li>
          </ul>
          <p className="py-6 text-lg ">Project was deployed using Vercel</p>
        </div>
      </div>
    </>
  );
};

export default FaqAccordion;
