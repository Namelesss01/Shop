import { useState, useEffect } from "react";
import { ts } from "./const";
import BurgerMenuProps from "./type";

const BurgerMenu = ({ triggerIcon }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [isOfferAcknowledged, setIsOfferAcknowledged] = useState<boolean>(false);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);

  // Check if user is registered and offer acknowledgment status on mount
  useEffect(() => {
    const registeredStatus = localStorage.getItem("isUserRegistered");
    if (registeredStatus === "true") {
      setIsUserRegistered(true);
    }

    const acknowledged = localStorage.getItem("offerAcknowledged");
    if (acknowledged === "true") {
      setIsOfferAcknowledged(true);
    }
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setCurrentSection(null);
  };

  const handleOfferAcknowledged = () => {
    setIsOfferAcknowledged(true);
    localStorage.setItem("offerAcknowledged", "true");
  };

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer z-50">
        {triggerIcon}
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMenu}
      ></div>
      <div
        className={`fixed top-0 right-0 w-full h-full bg-white shadow-lg p-6 transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Настройки</h2>
          <button onClick={closeMenu} className="text-2xl font-bold">
            ×
          </button>
        </div>
        {!currentSection ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Аккаунт</h3>
            {ts.slice(0, 2).map((item: any) => (
              <div
                key={item.link}
                onClick={() => setCurrentSection(item.link)}
                className="flex justify-between items-center py-2 text-gray-800 hover:text-blue-500 border-b border-gray-200 cursor-pointer"
              >
                <span>{item.label}</span> <span className="text-xl">›</span>
              </div>
            ))}

            <h3 className="text-lg font-semibold text-gray-700 mt-4">Прочее</h3>
            {ts.slice(2).map((item: any) => (
              <div
                key={item.link}
                onClick={() => setCurrentSection(item.link)}
                className="flex justify-between items-center py-2 text-gray-800 hover:text-blue-500 border-b border-gray-200 cursor-pointer"
              >
                <span>{item.label}</span>
                {item.status && <span className="text-green-600">{item.status}</span>}
                <span className="text-xl">›</span>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button onClick={() => setCurrentSection(null)} className="text-xl text-gray-700 mb-6">
              ← Назад
            </button>
            <div className="mt-6">
              {ts.map((item: any) =>
                item.link === currentSection ? (
                  <div key={item.link}>
                    <h3 className="text-lg font-semibold text-gray-700">{item.label}</h3>
                    <p>{item.text}</p>
                    {item.link === "offer" && !isOfferAcknowledged && isUserRegistered && (
                      <button
                        onClick={handleOfferAcknowledged}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      >
                        Ознакомлен
                      </button>
                    )}
                    {/* If the user isn't registered */}
                    {!isUserRegistered && (
                      <div className="mt-4 text-red-600">Вы не зарегистрированы!</div>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BurgerMenu;
