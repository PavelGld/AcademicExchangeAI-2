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
    <div className="w-full p-4">
      <div className="bg-white w-full max-w-[1200px] min-h-[800px] relative shadow-lg mx-auto rounded-lg overflow-hidden">

        {/* Profile Header */}
        <div className="w-full h-[150px] bg-blue-500 rounded-lg flex items-start p-5 shadow-md mx-4 my-4" style={{width: 'calc(100% - 2rem)'}}>
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

          <Button className="ml-auto mt-auto h-10 w-[200px] bg-blue-600 hover:bg-blue-700 text-white rounded">
            Редактировать профиль
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex flex-wrap gap-4 p-4">
          {/* Academic Information Card */}
          <Card className="w-full md:w-[560px] h-[300px] bg-white border border-gray-200 rounded-lg shadow-md">
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

          {/* Right Column */}
          <div className="flex flex-col gap-4 w-full md:w-[560px]">
            {/* Achievements Card */}
            <Card className="h-[150px] bg-blue-500 border-none rounded-lg shadow-md">
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
            <Card className="h-[142px] bg-blue-500 border-none rounded-lg shadow-md">
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
          </div>
        </div>

        {/* Grade Book Card */}
        <Card className="w-full h-[150px] bg-blue-500 border-none rounded-lg shadow-md mx-4 mb-4" style={{width: 'calc(100% - 2rem)'}}>
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


          </CardContent>
        </Card>
      </div>
    </div>
  );
};
