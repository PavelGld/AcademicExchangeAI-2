import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ProfileEdit = (): JSX.Element => {
  return (
    <div className="w-full p-4">
      <div className="bg-white w-full max-w-[1200px] min-h-[800px] relative shadow-lg mx-auto rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Редактирование профиля студента
          </h1>

          <div className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Личная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">ФИО</Label>
                    <Input id="fullName" defaultValue="Иван Иванович Иванов" />
                  </div>
                  <div>
                    <Label htmlFor="photo">Загрузить фото (PNG, JPEG)</Label>
                    <Input id="photo" type="file" accept=".png,.jpeg,.jpg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Академическая информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="university">ВУЗ</Label>
                    <Input id="university" defaultValue="Московский государственный университет" />
                  </div>
                  <div>
                    <Label htmlFor="faculty">Факультет</Label>
                    <Input id="faculty" defaultValue="ВМК" />
                  </div>
                  <div>
                    <Label htmlFor="studentId">Номер студенческого</Label>
                    <Input id="studentId" defaultValue="123456789" />
                  </div>
                  <div>
                    <Label htmlFor="specialtyCode">Код специальности</Label>
                    <Input id="specialtyCode" defaultValue="01.03.02" />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Специальность</Label>
                    <Input id="specialty" defaultValue="Информатика и вычислительная техника" />
                  </div>
                  <div>
                    <Label htmlFor="level">Уровень</Label>
                    <Input id="level" defaultValue="Бакалавриат" />
                  </div>
                  <div>
                    <Label htmlFor="course">Курс</Label>
                    <Input id="course" defaultValue="2" />
                  </div>
                  <div>
                    <Label htmlFor="studyForm">Форма обучения</Label>
                    <Input id="studyForm" defaultValue="Очное" />
                  </div>
                  <div>
                    <Label htmlFor="financing">Финансирование</Label>
                    <Input id="financing" defaultValue="Бюджет" />
                  </div>
                  <div>
                    <Label htmlFor="englishLevel">Уровень английского</Label>
                    <Input id="englishLevel" defaultValue="C1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="certificate">Справка об обучении</Label>
                  <Input id="certificate" type="file" accept=".pdf" />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Достижения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Input defaultValue="Победитель олимпиады, 2024" className="flex-1" />
                    <Button variant="outline" size="sm">Добавить</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grade Book */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Зачетная книжка</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Предмет</Label>
                    <Input id="subject" defaultValue="Алгоритмы" placeholder="Название предмета" />
                  </div>
                  <div>
                    <Label htmlFor="grade">Оценка</Label>
                    <Input id="grade" defaultValue="5" placeholder="Оценка" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">Добавить</Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6">
              <Button className="px-8 bg-blue-500 hover:bg-blue-600 text-white">
                Сохранить
              </Button>
              <Button variant="outline" className="px-8">
                Отмена
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};