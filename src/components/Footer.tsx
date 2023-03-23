import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Footer = () => {
  const router = useRouter();
  console.log(router.pathname);
  let snapClass = "";
  if (router.pathname == "/" || router.pathname == "/projects") {
    snapClass = "snap-end";
  } else {
    snapClass = "";
  }
  return (
    <>
      <div className="border-t border-very-light-gray bg-dark-blue">
        <div
          className={`${snapClass} container mx-auto flex h-36 flex-col items-center justify-center border-very-light-gray px-6 py-6 md:h-32 md:flex-row md:justify-between`}
        >
          <div className="SocialButtons flex h-full w-full flex-row justify-center gap-6 pb-3 md:justify-start md:pb-0">
            <Link href="https://github.com/kLaz3r" className="text-[0px]">
              Github
              <GitHubLogoIcon className="h-full w-full text-very-light-gray transition-all hover:text-dark-gray active:text-dark-gray" />
            </Link>
            <Link
              href="https://discordapp.com/users/240478370620506112"
              className="text-[0px]"
            >
              Discord
              <DiscordLogoIcon className="h-full w-full text-very-light-gray transition-all hover:text-dark-gray active:text-dark-gray" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/stefan-nasturas-9bb019207/"
              className="text-[0px]"
            >
              LinkedIn
              <LinkedInLogoIcon className="h-full w-full text-very-light-gray transition-all hover:text-dark-gray active:text-dark-gray" />
            </Link>
            <Link href="https://stefannasturas.live/" className="text-[0px]">
              Portfolio
              <PersonIcon className="h-full w-full text-very-light-gray transition-all hover:text-dark-gray active:text-dark-gray" />
            </Link>
          </div>

          <div className="CopyrightText">
            <p className="-z-10 inline-block w-full text-center text-xs text-very-light-gray">
              &copy; Copyright 2023, Stefan Nasturas. All rights reserved.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
