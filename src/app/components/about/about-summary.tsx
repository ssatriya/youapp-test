import { AboutSummaryType } from "@/type";

const AboutSummary = ({
  birthday,
  horoscope,
  zodiac,
  height,
  weight,
}: AboutSummaryType) => {
  return (
    <div className="flex flex-col text-xs space-y-3  mt-4">
      <div className="flex gap-1">
        <span className="text-white/35">Birthday:</span>
        <span>{birthday}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-white/35">Horoscope:</span>
        <span>{horoscope}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-white/35">Zodiac:</span>
        <span>{zodiac}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-white/35">Height:</span>
        <span>{height}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-white/35">Weight:</span>
        <span>{weight} kg</span>
      </div>
    </div>
  );
};

export default AboutSummary;
