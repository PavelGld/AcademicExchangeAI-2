import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Svg = (): JSX.Element => {
  // Academic information data
  const academicInfo = [
    { label: "Номер студенческого:", value: "123456789" },
    { label: "Код специальности:", value: "01.03.02" },
    {
      label: "Название специальности:",
      value: "Информатика и вычислительная техника",
    },
    { label: "Уровень:", value: "Бакалавриат" },
    { label: "Курс:", value: "2" },
    { label: "Форма обучения:", value: "Очное" },
    { label: "Финансирование:", value: "Бюджет" },
    { label: "Уровень английского:", value: "C1" },
    { label: "Справка об обучении:", value: "Доступна (PDF)" },
  ];

  // Achievements data
  const achievements = [
    {
      id: 1,
      text: "Победитель олимпиады по программированию, 2024",
      hasDocument: true,
    },
    { id: 2, text: "Сертификат IELTS 7.5", hasDocument: true },
    { id: 3, text: "Участие в хакатоне AI Solutions", hasDocument: true },
  ];

  // Applications data
  const applications = [
    {
      id: 1,
      text: "Тебе решать!",
      status: "Принято",
      statusColor: "text-[#2bc735]",
    },
    {
      id: 1,
      text: "Тебе решать!",
      status: "Принято",
      statusColor: "text-[#2bc735]",
    },
    {
      id: 1,
      text: "Тебе решать!",
      status: "Отклонено",
      statusColor: "text-[#ab2224]",
    },
    {
      id: 1,
      text: "Тебе решать!",
      status: "Отклонено",
      statusColor: "text-[#ab2224]",
    },
  ];

  // Grade book data
  const grades = [
    { subject: "Алгоритмы и структуры данных", grade: "5" },
    { subject: "Математический анализ", grade: "4" },
  ];

  // Navigation items
  const navItems = [
    { text: "Главная", active: false },
    { text: "Профиль", active: true },
    { text: "Заявки", active: false },
    { text: "Обратная связь", active: false },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-row justify-center w-full">
      <div className="overflow-hidden bg-white w-[1200px] min-h-[800px] relative shadow-lg">
        {/* Navigation Bar */}
        <header className="absolute w-full h-20 top-0 left-0 z-10">
          <nav className="relative w-full h-20 bg-white border-b border-gray-200 flex items-center px-5 shadow-sm">
            <img
              className="w-[66px] h-[66px] object-cover"
              alt="University Logo"
              src="/figmaAssets/chatgpt-image-10------2025-----14-22-45-photoroom-1.png"
            />

            <div className="flex ml-[200px] space-x-[100px]">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`font-normal text-base ${item.active ? "text-[#007bff]" : "text-[#212529]"}`}
                >
                  {item.text}
                </a>
              ))}
            </div>

            <div className="ml-auto flex items-center space-x-4">
              <img
                className="w-[49px] h-[37px]"
                alt="Notification"
                src="/figmaAssets/xmlid-2-.svg"
              />
              <Avatar className="w-[58px] h-[58px]">
                <AvatarImage src="/figmaAssets/vector-2.png" alt="User" />
                <AvatarFallback>ИИ</AvatarFallback>
              </Avatar>
              <Button className="h-10 w-[69px] bg-blue-600 hover:bg-blue-700 text-white rounded">
                Выйти
              </Button>
            </div>
          </nav>
        </header>

        {/* Profile Header */}
        <div className="absolute w-[1160px] h-[150px] top-[100px] left-5 bg-blue-500 rounded-lg flex items-start p-5 shadow-md">
          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage
              src="/figmaAssets/vector-2.png"
              alt="User"
              className="object-cover"
            />
            <AvatarFallback>ИИ</AvatarFallback>
          </Avatar>

          <div className="ml-[20px]">
            <h1 className="font-normal text-2xl text-white">
              Иван Иванович Иванов
            </h1>
            <p className="mt-6 font-normal text-base text-blue-100">
              Московский государственный университет
            </p>
            <p className="mt-2 font-normal text-base text-blue-100">
              Факультет вычислительной математики и кибернетики
            </p>
          </div>

          <Button className="absolute right-[11px] bottom-[11px] h-10 w-[200px] bg-blue-600 hover:bg-blue-700 text-white rounded">
            Редактировать профиль
          </Button>
        </div>

        {/* Academic Information Card */}
        <Card className="absolute w-[560px] h-[300px] top-[270px] left-5 bg-white border border-gray-200 rounded-lg shadow-md">
          <CardHeader className="pt-[23px] pb-2 px-5">
            <CardTitle className="font-normal text-base text-[#212529]">
              Академическая информация
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pt-0">
            <div className="space-y-[20px]">
              {academicInfo.map((item, index) => (
                <div key={index} className="flex">
                  <span className="text-[#6c757d] font-normal text-base w-[216px]">
                    {item.label}
                  </span>
                  <span className="text-[#212529] font-normal text-base">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Card */}
        <Card className="absolute w-[560px] h-[150px] top-[270px] left-[600px] bg-blue-500 border-none rounded-lg shadow-md">
          <CardHeader className="pt-[23px] pb-2 px-5">
            <CardTitle className="font-normal text-base text-white">
              Достижения
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pt-0">
            <div className="space-y-5">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center">
                  <span className="text-white font-normal text-base">
                    {achievement.id}. {achievement.text}
                  </span>
                  {achievement.hasDocument && (
                    <img
                      className="w-[19px] h-[19px] ml-2 object-cover"
                      alt="Document"
                      src="/figmaAssets/-pngtree-vector-document-icon-4141989-3.png"
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Applications Card */}
        <Card className="absolute w-[560px] h-[142px] top-[430px] left-[600px] bg-blue-500 border-none rounded-lg shadow-md">
          <CardHeader className="pt-[11px] pb-0 px-5">
            <CardTitle className="font-normal text-base text-white">
              Заявки
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pt-2">
            <div className="space-y-[23px]">
              {applications.map((application, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-white font-normal text-base w-[126px]">
                    {application.id}. {application.text}
                  </span>
                  <span
                    className={`${application.status === 'Принято' ? 'text-green-200' : 'text-red-200'} font-normal text-base`}
                  >
                    {application.status}
                  </span>
                  <img
                    className="w-[15px] h-5 ml-2 object-cover"
                    alt="Status icon"
                    src="/figmaAssets/image-6.png"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grade Book Card */}
        <Card className="absolute w-[1140px] h-[150px] top-[590px] left-5 bg-blue-500 border-none rounded-lg shadow-md">
          <CardHeader className="pt-[23px] pb-2 px-5">
            <CardTitle className="font-normal text-base text-white">
              Зачетная книжка
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pt-0 relative">
            <div className="flex mb-5">
              <span className="text-blue-200 font-normal text-base w-[375px]">
                Дисциплина
              </span>
              <span className="text-blue-200 font-normal text-base">
                Оценка
              </span>
            </div>

            {grades.map((grade, index) => (
              <div key={index} className="flex mb-5">
                <span className="text-white font-normal text-base w-[375px]">
                  {grade.subject}
                </span>
                <span className="text-white font-normal text-base">
                  {grade.grade}
                </span>
              </div>
            ))}

            {/* Custom Scrollbar */}
            <div className="absolute w-[21px] h-36 top-[3px] right-0">
              <div className="relative h-36">
                <div className="h-[125px] top-[9px] bg-blue-300 absolute w-[21px] left-0 rounded-sm" />
                <div className="top-0 bg-blue-300 absolute w-[21px] h-5 left-0 rounded-full" />
                <div className="top-[22px] bg-blue-600 absolute w-[21px] h-5 left-0 rounded-full" />
                <div className="top-[51px] bg-blue-600 absolute w-[21px] h-5 left-0 rounded-full" />
                <div className="top-[124px] bg-blue-300 absolute w-[21px] h-5 left-0 rounded-full" />
                <div className="h-[31px] top-[31px] bg-blue-600 absolute w-[21px] left-0" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
