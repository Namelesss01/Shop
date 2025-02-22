import { Forward, Settings } from "lucide-react";
import Avatar_image from "@/assets/images/avatar-image.png";
import Banner from "@/assets/images/banner-threads.png";
import BurgerMenu from "../../shared/burger_menu/Burger_menu";
import { MORE_PAGES } from "./const";
const More = () => {
  return (
    <div className="container mx-4 w-full">
      <div className="mt-7 flex w-full justify-between mb-5">
        <div className="flex">
          <img
            className="rounded-full max-w-10 max-h-10"
            src={Avatar_image}
            alt="avatar"
          />
          <button className="bg-[#916DF9] text-white min-w-[145px] min-h-10 text-[16px] rounded-2xl  ml-3">
            Быстрая связь
          </button>
        </div>
        <div className="mt-2">
          <BurgerMenu triggerIcon={<Settings />} />
        </div>
      </div>
      <div className="w-full">
        <h1 className="font-bold text-[24px] color-[#202020] mb-5 font-raleway">
          Производство одежды
        </h1>
        <img className="rounded-[5px] mb-6" src={Banner} alt="banner-treads" />
        <h3 className="mb-2 font-raleway font-bold text-[18px] text-[#202020]">
          Для Маркетплейсов
        </h3>
        <p className="max-w-[286px] font-normal text-[12px] text-[#000000] font-sans ">
          Вы можете заказать у нас производство одежды на любой вкус. Большие и
          малые партии. Для WB и OZON
        </p>
        <div className="flex mt-4 w-full">
          <button className="flex items-center font-medium pl-3 pr-4 border-[1px] border-[#B1B1B1] rounded-full min-w-[138px] min-h-10 text-[16px] mr-5">
            <Forward className="mr-2" /> Поделиться
          </button>
          <button className="rounded-full border-[1px] border-[#916DF9] text-[#916DF9] min-w-[197px] min-h-10 text-[16px]">
            Узнать цену
          </button>
        </div>
      </div>
      <div className="mb-[100px]">
        <h2 className="font-bold text-[21px] text-[#202020] mt-10 mb-4 font-raleway">
          Услуги
        </h2>
        {MORE_PAGES.map((item) => (
          <div className="flex items-center mb-7 w-full">
            <img
              className="mr-4 rounded-[5px]"
              src={item.img}
              alt={item.service}
            />
            <div>
              <h3 className="font-semibold text-[14px] text-[#202020] mb-2 font-raleway">
                {item.service}
              </h3>
              <p className="font-normal text-[12px] flex-wrap max-w-[196px] text-[#000000] font-sans">
                {item.description}
              </p>
              <button className="rounded-full border-[1px] border-[#916DF9] text-[#916DF9] min-w-[197px] min-h-10 text-[16px]">
                Узнать цену
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default More;
