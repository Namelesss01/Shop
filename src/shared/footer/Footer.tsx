import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white p-4 mt-14 text-black mb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 gap-10 text-center">
            <li className="text-black font-black text-center ml-16 mr-20 md:ml-28">
              Булунский портал
            </li>
            <li>
              <Link to="/" className="hover:text-black text-[#76767A]">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-black text-[#76767A]">
                Новости
              </Link>
            </li>
            <li>
              <Link
                to="/announcement"
                className="hover:text-black text-[#76767A]"
              >
                Объявления
              </Link>
            </li>
            <li>
              <Link to="/transport" className="hover:text-black text-[#76767A]">
                Транспорт
              </Link>
            </li>
            <li>
              <Link
                to="/administration"
                className="hover:text-black text-[#76767A]"
              >
                Администрация
              </Link>
            </li>
            <li>
              <Link
                to="/archive-page"
                className="hover:text-black text-[#76767A]"
              >
                Архив
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
