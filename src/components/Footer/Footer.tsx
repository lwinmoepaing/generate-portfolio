import React from "react";

interface FooterInterface {}

const Footer: React.FC<FooterInterface> = () => {
  return (
    <footer className="p-4 bg-gray-800 text-white  shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="https://lwinmoepaing.github.io/" className="hover:underline">
          Made with Love By LwinMoePaing.
        </a>
      </span>
    </footer>
  );
};

export default Footer;
