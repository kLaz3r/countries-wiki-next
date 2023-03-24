import axios from "axios";
import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "~/components/Layout";
import { type CountriesResponse, type Country } from "~/pages";

type CountryProps = {
  country: Country;
};

const Index = ({ country }: CountryProps) => {
  console.log(country);

  return (
    <>
      <Head>
        <title>{country.name.common}</title>
      </Head>
      <Layout>
        <div className="Wrapper min-h-screen">
          <div className="container mx-auto px-6 py-6">
            <div className="ImageWrapper relative h-56 w-full">
              <Image
                src={country.flags.svg}
                alt={country.flags.alt ? country.flags.alt : ""}
                fill
              />
            </div>
            <div className="Info px-3 py-3">
              <h1 className="pb-3 text-center text-2xl">
                {country.name.official}
              </h1>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Population: </span>
                <span>{country.population}</span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Area: </span>
                <span>{country.area}</span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Capital: </span>
                <span>
                  {country.capital !== undefined
                    ? country.capital[0]
                    : "No Capital"}
                </span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Continents: </span>
                <span>
                  {country.continents !== undefined
                    ? country.continents.map((continent) => (
                        <span key={continent}>{continent} </span>
                      ))
                    : "No Continents"}
                </span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Sub-region: </span>
                <span>
                  {country.subregion !== undefined
                    ? country.subregion
                    : "No Sub-region"}
                </span>
              </div>
              {country.languages !== undefined && (
                <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                  <span>Languages: </span>
                  <span>
                    {Object.keys(country.languages).map((key) => {
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      return `${country.languages[key]} `;
                    })}
                  </span>
                </div>
              )}
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Landlocked: </span>
                <span>{country.landlocked ? "Yes" : "No"}</span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Border Countries: </span>
                <span className=" flex flex-row gap-1">
                  {country.borders?.map((border) => (
                    <Link
                      className=" rounded-md bg-very-light-gray px-2 py-1 text-dark-blue"
                      key={border}
                      href={`/${border}`}
                    >
                      {border}
                    </Link>
                  ))}
                </span>
              </div>
              {country.demonyms !== undefined && (
                <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                  <span>Demonyms: </span>
                  <span>
                    <ul>
                      <li>F: {country.demonyms.eng.f}</li>
                      <li>M: {country.demonyms.eng.m}</li>
                    </ul>
                  </span>
                </div>
              )}
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Timezones: </span>
                <span>
                  <ul>
                    {country.timezones.map((timezone) => (
                      <li key={timezone}>{timezone} </li>
                    ))}
                  </ul>
                </span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Currencies: </span>
                <span>
                  <ul className="flex flex-row">
                    {country.currencies !== undefined &&
                      Object.keys(country.currencies).map((key) => {
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        return <li key={key}>{key}</li>;
                      })}
                  </ul>
                </span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Phone Prefix: </span>
                <span>{country.idd.root}</span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>United Nations Member: </span>
                <span>{country.unMember ? "Yes" : "No"}</span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Independent: </span>
                <span>{country.independent ? "Yes" : "No"}</span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Top-level Domain: </span>
                <span>{country.tld?.map((tld) => tld)}</span>
              </div>
              {country.coatOfArms.svg !== undefined && (
                <>
                  <h3 className="py-3 text-center text-2xl">Coat of Arms</h3>
                  <div className="ImageWrapper relative h-56 w-full">
                    <Image
                      src={country.coatOfArms.svg}
                      alt={country.name.common}
                      fill
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;

type CountryResponse = {
  data: Country[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params?.cca3 === undefined) {
    return {
      props: {},
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const params = context.params;

    const { data }: CountryResponse = await axios.get(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `https://restcountries.com/v3.1/alpha/${params.cca3}`
    );
    const country = data[0];

    return {
      props: {
        country,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: CountriesResponse = await axios.get(
    "https://restcountries.com/v3.1/all"
  );
  const paths = data.map((country) => ({
    params: { cca3: country.cca3 },
  }));
  return {
    paths,
    fallback: false,
  };
};
