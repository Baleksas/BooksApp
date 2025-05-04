import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-base-300 footer-center  text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <p>© {new Date().getFullYear()} - Licensed under the MIT License.</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href="https://github.com/Baleksas"
          target="_blank"
          className="text-xl"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/aleksas-bagdonas/"
          target="_blank"
          className="text-xl"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
