import { useEffect, useState } from "react";
import { FaList, FaPen, FaSearch, FaUsers } from "react-icons/fa";
import {
  SiAuth0,
  SiDaisyui,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiTypescript,
} from "react-icons/si";
import FAQItem from "./home/FaqItem";

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
      <FAQItem
        index={0}
        activeIndex={activeIndex}
        onChange={handleChange}
        title="What is Read Away?"
      >
        <p className="py-6 text-lg">
          An innovative application designed to help you effortlessly keep track
          of your reading progress and share insightful reviews of your favorite
          books.
        </p>
      </FAQItem>

      <FAQItem
        index={1}
        activeIndex={activeIndex}
        onChange={handleChange}
        title="Features"
      >
        <ul className="grid gap-4 text-left">
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
      </FAQItem>

      <FAQItem
        index={2}
        activeIndex={activeIndex}
        onChange={handleChange}
        title="Tech Stack"
      >
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
        <p className="py-6 text-lg">Project was deployed using Vercel</p>
      </FAQItem>
    </>
  );
};

export default FaqAccordion;
