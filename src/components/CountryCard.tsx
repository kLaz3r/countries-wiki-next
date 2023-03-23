import Image from "next/image";
import Link from "next/link";
import React from "react";
import { type Country } from "~/pages";

type CountryCardProps = {
  country: Country;
};

const CountryCard = ({ country }: CountryCardProps) => {
  console.log(country);

  return (
    <Link href={`/${country.cca3}`}>
      <div className="ImageWrapper relative h-56 w-full">
        <Image
          src={country.flags.svg}
          alt={country.flags.alt ? country.flags.alt : ""}
          fill
        />
      </div>
      <div className="Info flex h-56 flex-col justify-center gap-3 bg-dark-blue px-6">
        <h1 className="text-2xl">{country.name.common}</h1>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital}</p>
      </div>
    </Link>
  );
};

export default CountryCard;
