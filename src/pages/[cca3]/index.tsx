import axios from "axios";
import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
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
              <h1 className="text-center text-2xl">{country.name.official}</h1>
              <div className="slice flex flex-row justify-between border-b border-dashed border-dark-gray py-2">
                <span>Population: </span>
                <span>{country.population}</span>
              </div>
              <div className="slice flex flex-row justify-between border-b border-dashed border-dark-gray py-2">
                <span>Area: </span>
                <span>{country.area}</span>
              </div>
              <div className="slice flex flex-row justify-between border-b border-dashed border-dark-gray py-2">
                <span>Capital: </span>
                <span>
                  {country.capital !== undefined
                    ? country.capital[0]
                    : "No Capital"}
                </span>
              </div>
              <div className="slice flex flex-row justify-between border-b border-dashed border-dark-gray py-2">
                <span>Continents: </span>
                <span>
                  {country.continents !== undefined
                    ? country.continents.map((continent) => continent + " ")
                    : "No Continents"}
                </span>
              </div>
              <div className="slice flex flex-row justify-between border-b border-dashed border-dark-gray py-2">
                <span>Denonyms: </span>
                <span>
                  {country.continents !== undefined
                    ? country.continents.map((continent) => continent + " ")
                    : "No Continents"}
                </span>
              </div>
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
    const cca3: string = context.params.cca3;
    console.log(cca3);

    const { data }: CountryResponse = await axios.get(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `https://restcountries.com/v3.1/alpha/${cca3}`
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
