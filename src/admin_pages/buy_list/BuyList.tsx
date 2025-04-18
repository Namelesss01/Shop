import AdminAside from "../../shared/admin_aside/AdminAside";
import AdminHeader from "../../shared/admin_header/AdminHeader";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";

const BuyList = () => {
  const orders = [
    {
      basketNumber: "№512",
      date: "22 Oct, 2020",
      user: "Jane Cooper",
      items: 826,
      country: "Åland Islands",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "24 May, 2020",
      user: "Jacob Jones",
      items: 740,
      country: "Greece",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "8 Sep, 2020",
      user: "Theresa Webb",
      items: 447,
      country: "Israel",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "22 Oct, 2020",
      user: "Cameron Williams",
      items: 798,
      country: "Afghanistan",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "21 Sep, 2020",
      user: "Savannah Nguyen",
      items: 556,
      country: "Georgia",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "24 May, 2020",
      user: "Darrell Steward",
      items: 816,
      country: "South Africa",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "17 Oct, 2020",
      user: "Annette Black",
      items: 196,
      country: "Sao Tome and Prin",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "17 Oct, 2020",
      user: "Bessie Cooper",
      items: 177,
      country: "Brazil",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "1 Feb, 2020",
      user: "Guy Hawkins",
      items: 185,
      country: "Saint Barthélemy",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "1 Feb, 2020",
      user: "Brooklyn Simmons",
      items: 922,
      country: "Pakistan",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
    {
      basketNumber: "№512",
      date: "1 Feb, 2020",
      user: "Courtney Henry",
      items: 994,
      country: "Central African Rei",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
      address: "123 Main St, Anytown USA",
      contact: "123-456-7890",
      quantity: "2 пачки серых 3 пачки красных",
    },
  ];

  return (
    <div className="">
      <AdminHeader />
      <div className="flex">
        <AdminAside />

        <div className="flex-1">
          <Tabs defaultValue="news">
            <TabsList>
              <TabsTrigger value="news">Новые</TabsTrigger>
              <TabsTrigger value="Service">Обслуживание</TabsTrigger>
              <TabsTrigger value="Processed">Обработанные</TabsTrigger>
            </TabsList>
            <TabsContent
              className="bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl"
              value="news"
            >
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-[#2F80ED] text-white">
                    <th className="py-3 px-4 border-b text-left">Дата</th>
                    <th className="py-3 px-4 border-b text-left">Адрес</th>
                    <th className="py-3 px-4 border-b text-left">Контакт</th>
                    <th className="py-3 px-4 border-b text-left">Статус</th>
                    <th className="py-3 px-4 border-b text-left">
                      Кол-во корзин
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">{order.date}</td>
                      <td className="py-3 px-4 border-b">{order.address}</td>
                      <td className="py-3 px-4 border-b">{order.contact}</td>
                      <td className="py-3 px-4 border-b">{order.status}</td>
                      <td className="py-3 px-4 border-b">{order.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent
              className="bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl"
              value="Processed"
            >
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-[#2F80ED] text-white">
                    <th className="py-3 px-4 border-b text-left">
                      Номер корзины
                    </th>
                    <th className="py-3 px-4 border-b text-left">Дата</th>
                    <th className="py-3 px-4 border-b text-left">
                      Пользователь
                    </th>
                    <th className="py-3 px-4 border-b text-left">Позиции</th>
                    <th className="py-3 px-4 border-b text-left">Страна</th>
                    <th className="py-3 px-4 border-b text-left">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">
                        {order.basketNumber}
                      </td>
                      <td className="py-3 px-4 border-b">{order.date}</td>
                      <td className="py-3 px-4 border-b">{order.user}</td>
                      <td className="py-3 px-4 border-b">{order.items}</td>
                      <td className="py-3 px-4 border-b">{order.country}</td>
                      <td className="py-3 px-4 border-b">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="Service">
              <div className="max-w-[600px] mx-auto p-5 border border-gray-300 rounded-lg bg-gray-50">

                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-2">
                    9 проход 410 контейнер
                  </h1>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Артикулов: 5</p>
                    <p>Дата: 22.04.2025</p>
                    <p>Страна: Россия, Казахстан</p>
                    <p>Связь: Telegram: @marleno</p>
                    <p>WhatsApp: +99670700433</p>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-gray-200 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Сумма закупа</h2>
                  <p className="font-bold">KGS</p>
                  <p>Закуп завершен</p>
                </div>

                {/* Артикул */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold">Артикул: 32345</h3>
                  <p className="text-sm text-gray-600">
                    Дата рассылки: 22.01.2025
                  </p>
                </div>

                {/* Описание товара */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Описание товара
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      Повторное{" "}
                      <a href="#" className="text-blue-500 hover:underline">
                        Допучили <strong>ФИО</strong>
                      </a>
                    </p>
                    <p>Город ФИО</p>
                    <p>Размерный ряд 49/54</p>
                    <p>Цена ТВО</p>
                    <p>Ткань Корейский Сигнал</p>
                    <p>Качество хорошее люкс</p>
                    <p>Посадка хорошо сушит</p>
                    <p>
                      1.3 расцветок в наличии <strong>ФИО</strong>
                    </p>
                    <p>Количество ограничений III</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Комментарий покупателя
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Нужно по три пачки каждого цвета</p>
                    <p>Размерный ряд: 50-56</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BuyList;
