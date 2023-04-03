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
        <meta name="description" content="A Simple Countries Wiki App" />
      </Head>
      <Layout>
        <div className="Wrapper min-h-screen pt-16 lg:pt-0">
          <div className="container mx-auto items-center px-6 py-16 lg:flex lg:flex-row ">
            <div className="ImageWrapper relative h-56 lg:h-96 lg:w-1/2">
              <Image
                src={country.flags.svg}
                alt={country.flags.alt ? country.flags.alt : ""}
                className="object-contain"
                fill
              />
            </div>
            <div className="Info mx-auto max-w-lg justify-center gap-6 px-3 py-3 lg:grid lg:h-screen lg:w-1/2 lg:max-w-none lg:grid-cols-2 lg:flex-wrap">
              <h1 className="pb-3 text-center text-2xl lg:text-4xl">
                {country.name.official}
              </h1>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Population: </span>
                <span>{country.population}</span>
              </div>
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Area: </span>
                <span>{country.area} km2</span>
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
                    <ul>
                      {Object.keys(country.languages).map((key) => {
                        if (country.languages === undefined) return;

                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const language = country.languages[key]!;

                        return (
                          <li
                            key={key}
                            className="text-end"
                          >{`${language} `}</li>
                        );
                      })}
                    </ul>
                  </span>
                </div>
              )}
              <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                <span>Landlocked: </span>
                <span>{country.landlocked ? "Yes" : "No"}</span>
              </div>
              {country.borders !== undefined && (
                <div className="slice flex flex-row items-center justify-between border-b border-dashed border-dark-gray py-2">
                  <span>Border Countries: </span>
                  <span className=" flex flex-row flex-wrap justify-end gap-1">
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
              )}
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
                  <ul className="flex flex-row gap-2">
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
                <span>{country.tld?.map((tld) => tld + " ")}</span>
              </div>
              {country.coatOfArms.svg !== undefined && (
                <div className="w-full lg:ml-12 lg:w-auto">
                  <h2 className="py-3 text-center text-2xl">Coat of Arms</h2>
                  <div className="ImageWrapper relative h-56 w-full">
                    <Image
                      className="object-contain drop-shadow-lg"
                      src={country.coatOfArms.svg}
                      alt={country.name.common}
                      fill
                    />
                  </div>
                </div>
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
