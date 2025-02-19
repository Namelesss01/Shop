import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyApplications from "../../shared/my_applications/MyApplications";
import MyBasket from "../../shared/my_basket/MyBasket";

const Basket = () => {
  return (
    <div className="flex justify-center p-4 w-full">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex justify-center gap-6 w-full bg-gray-200">
          <TabsTrigger
            value="account"
            className="px-10 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg"
          >
            Моя корзина
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="px-10 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg"
          >
            Мои заявки
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="text-center w-full">
          <MyBasket />
        </TabsContent>
        <TabsContent value="password" className="text-center w-full">
          <MyApplications />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Basket;
