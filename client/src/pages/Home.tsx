import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Home = (): JSX.Element => {
  return (
    <div className="w-full p-4">
      <div className="bg-white w-full max-w-[1200px] min-h-[800px] relative shadow-lg mx-auto rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Главная</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-blue-500 text-white">
              <CardHeader>
                <CardTitle>Академическая информация</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Просмотр академических данных и успеваемости</p>
                <Button className="mt-4 bg-white text-blue-500 hover:bg-gray-100">
                  Перейти к профилю
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-green-500 text-white">
              <CardHeader>
                <CardTitle>Заявки</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Подача и отслеживание заявок</p>
                <Button className="mt-4 bg-white text-green-500 hover:bg-gray-100">
                  Подать заявку
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-purple-500 text-white">
              <CardHeader>
                <CardTitle>Обратная связь</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Отправить отзыв или предложение</p>
                <Button className="mt-4 bg-white text-purple-500 hover:bg-gray-100">
                  Связаться
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Последние новости</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Новый семестр начинается 1 февраля</h3>
                  <p className="text-gray-600">Подготовьтесь к новому учебному семестру. Проверьте расписание и требования.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Обновление системы электронного обучения</h3>
                  <p className="text-gray-600">Новые функции доступны в личном кабинете студента.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};