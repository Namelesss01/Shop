import news from "@/assets/images/news.jpg";
import ads from "@/assets/images/ads.jpg";
import poster from "@/assets/images/poster.jpg";
import transport from "@/assets/images/transport.jpg";
import weather from "@/assets/images/weather.jpg";
import admin from "@/assets/images/admin.jpg";

import HomeProps from "./type";

export const HOME_ITEM: HomeProps[] = [
  {
    id: 1,
    imgURL: news,
    title: "News",
    text: "Новости",
    link: "/News",
  },
  {
    id: 2,
    imgURL: ads,
    title: "Ads",
    text: "Объявления",
    link: "/Announcement",
  },
  {
    id: 3,
    imgURL: poster,
    title: "Poster",
    text: "Афиша",
    link: "/Afisha",
  },
  {
    id: 4,
    imgURL: transport,
    title: "Transport",
    text: "Транспорт",
    link: "/transport",
  },
  {
    id: 5,
    imgURL: weather,
    title: "Weather",
    text: "Погода",
    link: "/Weather",
  },
  {
    id: 6,
    imgURL: admin,
    title: "Admin",
    text: "Администрация",
    link: "/Admin",
  },
];
