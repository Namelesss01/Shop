import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";



const Header = () => {

  return (
    <div>
      <div className="mt-4 flex justify-center items-center relative">
        <Search className="absolute left-4 md:left-7 w-5 h-5 text-gray-200" />
        <Input
          placeholder="Поиск товаров"
          className="w-full rounded-3xl pl-10 md:pr-20"
        />
      </div>
    </div>
  );
};

export default Header;
