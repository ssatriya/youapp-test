import { useMemo } from "react";
import moment from "moment";

const zodiacData = [
  { sign: "Aries", symbol: "♈", start: "03-21", end: "04-19", name: "Ram" },
  { sign: "Taurus", symbol: "♉", start: "04-20", end: "05-20", name: "Bull" },
  { sign: "Gemini", symbol: "♊", start: "05-21", end: "06-21", name: "Twins" },
  { sign: "Cancer", symbol: "♋", start: "06-22", end: "07-22", name: "Crab" },
  { sign: "Leo", symbol: "♌", start: "07-23", end: "08-22", name: "Lion" },
  { sign: "Virgo", symbol: "♍", start: "08-23", end: "09-22", name: "Virgin" },
  {
    sign: "Libra",
    symbol: "♎",
    start: "09-23",
    end: "10-23",
    name: "Balance",
  },
  {
    sign: "Scorpius",
    symbol: "♏",
    start: "10-24",
    end: "11-21",
    name: "Scorpion",
  },
  {
    sign: "Sagittarius",
    symbol: "♐",
    start: "11-22",
    end: "12-21",
    name: "Archer",
  },
  {
    sign: "Capricornus",
    symbol: "♑",
    start: "12-22",
    end: "01-19",
    name: "Goat",
  },
  {
    sign: "Aquarius",
    symbol: "♒",
    start: "01-20",
    end: "02-18",
    name: "Water Bearer",
  },
  { sign: "Pisces", symbol: "♓", start: "02-19", end: "03-20", name: "Fish" },
];

const shioAnimals = [
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
];

const getShio = (birthdate: string): string | null => {
  const date = moment(birthdate, "DD MM YYYY");
  if (!date.isValid()) return null;

  const birthYear = date.year();
  const offsetYear = 4; // The cycle starts in 1924 with the Rat
  const shioIndex = (birthYear - offsetYear) % 12;

  return shioAnimals[shioIndex];
};

export const useShio = (birthdate: string): string | null => {
  return useMemo(() => getShio(birthdate), [birthdate]);
};
const getHoroscope = (birthdate: string): string | null => {
  const date = moment(birthdate, "DD MM YYYY");
  if (!date.isValid()) return null;

  for (const { sign, symbol, start, end, name } of zodiacData) {
    const startDate = moment(`${date.year()}-${start}`, "YYYY-MM-DD");
    const endDate = moment(`${date.year()}-${end}`, "YYYY-MM-DD");

    if (end === "01-19") {
      endDate.add(1, "year"); // Handle Capricorn spanning two years
    }

    if (date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate)) {
      return sign;
    }
  }

  return null;
};

export const useHoroscope = (birthdate: string): string | null => {
  return useMemo(() => getHoroscope(birthdate), [birthdate]);
};
