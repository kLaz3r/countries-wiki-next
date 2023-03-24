import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="fixed z-50 flex h-16 w-full items-center justify-center bg-dark-blue text-very-light-gray">
      <Link href="/" className="font-bold">
        Where in the world?
      </Link>
    </nav>
  );
};

export default Header;
