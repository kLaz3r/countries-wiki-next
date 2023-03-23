import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountryCard from "~/components/CountryCard";
import Layout from "../components/Layout";

export interface Country {
  name: Name;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status: Status;
  unMember: boolean;
  currencies?: Currencies;
  idd: Idd;
  capital?: string[];
  altSpellings: string[];
  region: Region;
  subregion?: string;
  languages?: { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms?: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini?: { [key: string]: number };
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: Continent[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: StartOfWeek;
  capitalInfo: CapitalInfo;
  postalCode?: PostalCode;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  signs?: string[];
  side: Side;
}

export enum Side {
  Left = "left",
  Right = "right",
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export enum Continent {
  Africa = "Africa",
  Antarctica = "Antarctica",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}

export interface Currencies {
  GTQ?: Aed;
  SGD?: Aed;
  BAM?: BAM;
  MVR?: Aed;
  EUR?: Aed;
  AUD?: Aed;
  JOD?: Aed;
  BDT?: Aed;
  USD?: Aed;
  DZD?: Aed;
  BTN?: Aed;
  INR?: Aed;
  STN?: Aed;
  XAF?: Aed;
  XPF?: Aed;
  NOK?: Aed;
  TVD?: Aed;
  KHR?: Aed;
  MUR?: Aed;
  CDF?: Aed;
  PAB?: Aed;
  NIO?: Aed;
  SLL?: Aed;
  BBD?: Aed;
  ILS?: Aed;
  MAD?: Aed;
  MRU?: Aed;
  XCD?: Aed;
  RWF?: Aed;
  TRY?: Aed;
  MZN?: Aed;
  NGN?: Aed;
  RUB?: Aed;
  CUC?: Aed;
  CUP?: Aed;
  GBP?: Aed;
  JEP?: Aed;
  CRC?: Aed;
  CKD?: Aed;
  NZD?: Aed;
  PGK?: Aed;
  HNL?: Aed;
  MOP?: Aed;
  TTD?: Aed;
  GMD?: Aed;
  MMK?: Aed;
  EGP?: Aed;
  LBP?: Aed;
  KES?: Aed;
  PHP?: Aed;
  KZT?: Aed;
  ARS?: Aed;
  TJS?: Aed;
  AZN?: Aed;
  RON?: Aed;
  CLP?: Aed;
  CVE?: Aed;
  BGN?: Aed;
  UYU?: Aed;
  MKD?: Aed;
  AFN?: Aed;
  BWP?: Aed;
  CAD?: Aed;
  QAR?: Aed;
  YER?: Aed;
  SOS?: Aed;
  SEK?: Aed;
  CHF?: Aed;
  SHP?: Aed;
  MGA?: Aed;
  UAH?: Aed;
  IRR?: Aed;
  PLN?: Aed;
  VUV?: Aed;
  PEN?: Aed;
  SZL?: Aed;
  ZAR?: Aed;
  DJF?: Aed;
  HTG?: Aed;
  SYP?: Aed;
  GIP?: Aed;
  MXN?: Aed;
  ISK?: Aed;
  FJD?: Aed;
  KPW?: Aed;
  SBD?: Aed;
  GNF?: Aed;
  BHD?: Aed;
  GEL?: Aed;
  RSD?: Aed;
  XOF?: Aed;
  MNT?: Aed;
  DKK?: Aed;
  ETB?: Aed;
  LYD?: Aed;
  NAD?: Aed;
  MDL?: Aed;
  BOB?: Aed;
  DOP?: Aed;
  ANG?: Aed;
  IDR?: Aed;
  BYN?: Aed;
  LRD?: Aed;
  AMD?: Aed;
  ALL?: Aed;
  SSP?: Aed;
  GGP?: Aed;
  AED?: Aed;
  CZK?: Aed;
  PKR?: Aed;
  JMD?: Aed;
  KMF?: Aed;
  FKP?: Aed;
  TMT?: Aed;
  BND?: Aed;
  GHS?: Aed;
  KWD?: Aed;
  ERN?: Aed;
  ZWL?: Aed;
  TZS?: Aed;
  BZD?: Aed;
  SAR?: Aed;
  COP?: Aed;
  MYR?: Aed;
  BMD?: Aed;
  WST?: Aed;
  UGX?: Aed;
  NPR?: Aed;
  PYG?: Aed;
  FOK?: Aed;
  ZMW?: Aed;
  IMP?: Aed;
  KGS?: Aed;
  HKD?: Aed;
  VND?: Aed;
  JPY?: Aed;
  BRL?: Aed;
  GYD?: Aed;
  CNY?: Aed;
  AWG?: Aed;
  LAK?: Aed;
  VES?: Aed;
  HUF?: Aed;
  TOP?: Aed;
  IQD?: Aed;
  THB?: Aed;
  TND?: Aed;
  BIF?: Aed;
  KID?: Aed;
  SDG?: BAM;
  UZS?: Aed;
  LKR?: Aed;
  SRD?: Aed;
  AOA?: Aed;
  KYD?: Aed;
  LSL?: Aed;
  MWK?: Aed;
  BSD?: Aed;
  SCR?: Aed;
  TWD?: Aed;
  KRW?: Aed;
  OMR?: Aed;
}

export interface Aed {
  name: string;
  symbol: string;
}

export interface BAM {
  name: string;
}

export interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Idd {
  root?: string;
  suffixes?: string[];
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex?: string;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}

export enum StartOfWeek {
  Monday = "monday",
  Saturday = "saturday",
  Sunday = "sunday",
}

export enum Status {
  OfficiallyAssigned = "officially-assigned",
  UserAssigned = "user-assigned",
}

type HomeProps = {
  countries: Country[];
};

const Home = ({ countries }: HomeProps) => {
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countries);
  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredData = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });
    setFilteredCountries(filteredData);
  };
  return (
    <>
      <Head>
        <title>Countries Wiki</title>
        <meta name="description" content="A Simple Countries Wiki App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="Wrapper bg-very-dark-blue">
          <div className="container mx-auto min-h-screen px-6">
            <div className="flex w-full flex-row justify-between pt-6">
              <input
                type="text"
                placeholder="Search for a country..."
                className="w-full bg-dark-blue py-2 px-3"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="grid gap-6 py-6">
              {filteredCountries &&
                filteredCountries.map((country, index) => (
                  <CountryCard key={index} country={country} />
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

export type CountriesResponse = {
  data: Country[];
};

export const getStaticProps = async () => {
  const { data }: CountriesResponse = await axios.get(
    "https://restcountries.com/v3.1/all"
  );

  return {
    props: {
      countries: data,
    },
  };
};
