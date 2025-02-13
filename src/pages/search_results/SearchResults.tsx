import FlightsAside from "@/shared/global_aside/flights_aside/FlightsAside";
import RoadstatusAside from "@/shared/global_aside/roadStatus_asede/RoadStatusAside";
import WeatherAside from "@/shared/global_aside/weather_aside/WeatherAside";

import { SEARCH_ITEM } from "./const";

const SearchResults = () => {
  return (
    <div className="flex flex-col lg:flex-row mx-auto max-w-[1200px]">
      <div className="w-full lg:w-3/4">
        <div className="flex flex-col lg:flex-row lg:mb-5 mb-3">
          <h2 className="text-xl lg:text-2xl font-normal">Результат поиска:</h2>
          <h1 className="font-semibold text-xl lg:text-2xl lg:ml-4">
            Вот то что вы искали
          </h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {SEARCH_ITEM.map((item) => (
            <div className="rounded-[6px] bg-[#FFFFFF] max-w-[263px] min-h-[317px]">
              <img src={item.imageUrl} alt="" className="mb-4" />
              <span className="text-[#B3B3B3] font-medium text-[10px] mb-3 ml-[22px]">
                {item.data}
              </span>
              <p className="text-[#676767] font-medium text-[14px] mb-6 ml-[22px]">
                {item.title}
              </p>
              <span className="ml-[38px] font-medium text-[12px]">
                ПОДРОБНЕЕ
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/4 lg:ml-6">
        <WeatherAside />
        <RoadstatusAside />
        <FlightsAside />
      </div>
    </div>
  );
};

export default SearchResults;
