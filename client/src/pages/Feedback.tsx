import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Feedback = (): JSX.Element => {
  return (
    <div className="w-full p-4">
      <div className="bg-white w-full max-w-[1200px] min-h-[800px] relative shadow-lg mx-auto rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Обратная связь</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Отправить сообщение</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Тема</Label>
                    <Input 
                      id="subject" 
                      placeholder="Укажите тему вашего сообщения" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Категория</Label>
                    <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Выберите категорию</option>
                      <option value="technical">Техническая поддержка</option>
                      <option value="academic">Учебные вопросы</option>
                      <option value="administrative">Административные вопросы</option>
                      <option value="suggestion">Предложения и пожелания</option>
                      <option value="complaint">Жалобы</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Опишите ваш вопрос или предложение подробно..."
                      className="mt-1 h-32"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact">Контактная информация (необязательно)</Label>
                    <Input 
                      id="contact" 
                      placeholder="Email или телефон для обратной связи" 
                      className="mt-1"
                    />
                  </div>
                  
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Отправить сообщение
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800">Деканат</h4>
                    <p className="text-gray-600">Тел: +7 (495) 939-00-00</p>
                    <p className="text-gray-600">Email: dean@cs.msu.ru</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">Техническая поддержка</h4>
                    <p className="text-gray-600">Тел: +7 (495) 939-11-11</p>
                    <p className="text-gray-600">Email: support@cs.msu.ru</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">Приемные часы</h4>
                    <p className="text-gray-600">Понедельник - Пятница: 9:00 - 18:00</p>
                    <p className="text-gray-600">Суббота: 10:00 - 16:00</p>
                    <p className="text-gray-600">Воскресенье: выходной</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Часто задаваемые вопросы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Как восстановить пароль?</h4>
                    <p className="text-sm text-gray-600">Обратитесь в техническую поддержку с паспортом и студенческим билетом.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">Где получить справку об обучении?</h4>
                    <p className="text-sm text-gray-600">Подайте заявку через систему или обратитесь в деканат.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">Как изменить персональные данные?</h4>
                    <p className="text-sm text-gray-600">Обратитесь к куратору вашей группы с соответствующими документами.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};