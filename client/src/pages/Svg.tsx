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
    { id: 4, text: "Диплом участника конференции по ИИ", hasDocument: true },
    { id: 5, text: "Сертификат AWS Cloud Practitioner", hasDocument: true },
    { id: 6, text: "Стипендия за академические успехи", hasDocument: false },
  ];

  // Applications data
  const applications = [
    {
      id: 1,
      text: "Справка об обучении",
      status: "Принято",
      statusColor: "text-[#2bc735]",
    },
    {
      id: 2,
      text: "Академический отпуск",
      status: "Принято",
      statusColor: "text-[#2bc735]",
    },
    {
      id: 3,
      text: "Перевод на бюджет",
      status: "Отклонено",
      statusColor: "text-[#ab2224]",
    },
    {
      id: 4,
      text: "Смена специальности",
      status: "Отклонено",
      statusColor: "text-[#ab2224]",
    },
    {
      id: 5,
      text: "Дополнительные курсы",
      status: "На рассмотрении",
      statusColor: "text-[#f39c12]",
    },
  ];

  // Grade book data
  const grades = [
    { subject: "Алгоритмы и структуры данных", grade: "5" },
    { subject: "Математический анализ", grade: "4" },
    { subject: "Операционные системы", grade: "5" },
    { subject: "Базы данных", grade: "5" },
    { subject: "Компьютерные сети", grade: "4" },
    { subject: "Программная инженерия", grade: "5" },
    { subject: "Теория вероятностей", grade: "4" },
    { subject: "Дискретная математика", grade: "5" },
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
        <div className="w-full h-[150px] bg-blue-500 rounded-t-lg flex items-center p-5 shadow-md relative">
          <Avatar className="w-[100px] h-[100px] flex-shrink-0">
            <AvatarImage
              src="/figmaAssets/vector-2.png"
              alt="User"
              className="object-cover"
            />
            <AvatarFallback>ИИ</AvatarFallback>
          </Avatar>

          <div className="ml-5 flex-1">
            <h1 className="font-normal text-2xl text-white">
              Иван Иванович Иванов
            </h1>
            <p className="mt-2 font-normal text-base text-blue-100">
              Московский государственный университет
            </p>
            <p className="mt-1 font-normal text-base text-blue-100">
              Факультет вычислительной математики и кибернетики
            </p>
          </div>

          <Button className="absolute bottom-4 right-4 h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded">
            Редактировать профиль
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* Academic Information Card */}
          <Card className="flex-1 min-h-[300px] bg-white border border-gray-200 rounded-lg shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="font-normal text-base text-[#212529]">
                Академическая информация
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {academicInfo.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row">
                    <span className="text-[#6c757d] font-normal text-sm sm:text-base sm:w-48 flex-shrink-0">
                      {item.label}
                    </span>
                    <span className="text-[#212529] font-normal text-sm sm:text-base break-words">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="flex flex-col gap-4 flex-1">
            {/* Achievements Card */}
            <Card className="min-h-[150px] bg-blue-500 border-none rounded-lg shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="font-normal text-base text-white">
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 max-h-32 overflow-y-auto">
                <div className="space-y-3 pr-2">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start">
                      <span className="text-white font-normal text-sm flex-1">
                        {achievement.id}. {achievement.text}
                      </span>
                      {achievement.hasDocument && (
                        <img
                          className="w-4 h-4 ml-2 object-cover flex-shrink-0"
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
            <Card className="min-h-[142px] bg-blue-500 border-none rounded-lg shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="font-normal text-base text-white">
                  Заявки
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 max-h-28 overflow-y-auto">
                <div className="space-y-3 pr-2">
                  {applications.map((application, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-white font-normal text-sm flex-1">
                        {application.id}. {application.text}
                      </span>
                      <span
                        className={`${
                          application.status === 'Принято' 
                            ? 'text-green-200' 
                            : application.status === 'Отклонено'
                            ? 'text-red-200'
                            : 'text-yellow-200'
                        } font-normal text-sm flex-shrink-0`}
                      >
                        {application.status}
                      </span>
                      <img
                        className="w-4 h-4 object-cover flex-shrink-0"
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
        <Card className="w-full min-h-[200px] bg-blue-500 border-none rounded-b-lg shadow-md mx-4 mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="font-normal text-base text-white">
              Зачетная книжка
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 relative">
            <div className="max-h-32 overflow-y-auto pr-4">
              <div className="flex mb-3 sticky top-0 bg-blue-500 pb-2">
                <span className="text-blue-200 font-normal text-sm flex-1">
                  Дисциплина
                </span>
                <span className="text-blue-200 font-normal text-sm w-16 text-center">
                  Оценка
                </span>
              </div>

              {grades.map((grade, index) => (
                <div key={index} className="flex mb-3 items-start">
                  <span className="text-white font-normal text-sm flex-1 pr-4">
                    {grade.subject}
                  </span>
                  <span className="text-white font-normal text-sm w-16 text-center flex-shrink-0">
                    {grade.grade}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
