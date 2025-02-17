import { Settings } from "lucide-react";
import Avatar_image from "@/assets/images/avatar-image.png";
import Banner from "@/assets/images/banner-threads.png";
import BurgerMenu from "../../shared/burger_menu/Burger_menu";
const More = () => {
  return (
    <div className="container mx-auto max-w-[375px]">
      <div className="mt-7 flex justify-between mb-5">
        <div className="flex">
          <img className="rounded-full max-w-10 max-h-10" src={Avatar_image} alt="avatar"/>
          <button className="bg-[#916DF9] text-white min-w-[145px] min-h-10 text-[16px] rounded-2xl  ml-3">Быстрая связь</button>
        </div>
        <BurgerMenu triggerIcon={<Settings />} />
      </div>
      <h1 className="font-bold text-[24px] color-[#202020] mb-5 font-raleway">Производство одежды</h1>
      <img className="rounded-[5px] mb-6" src={Banner} alt="banner-treads" />
      <h3 className="mb-2 font-raleway font-bold text-[18px] text-[#202020]">Для Маркетплейсов</h3>
      <p className="max-w-[286px] font-normal text-[12px] text-[#000000] font-sans ">Вы можете заказать у нас производство одежды на любой вкус. Большие и малые партии. Для WB и OZON</p>
    </div>
  );
};

export default More;
