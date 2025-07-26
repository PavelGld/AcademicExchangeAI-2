import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Applications = (): JSX.Element => {
  const applications = [
    {
      id: 1,
      title: "Заявка на академический отпуск",
      status: "На рассмотрении",
      statusColor: "bg-yellow-500",
      date: "2025-01-20",
      description: "Заявка на предоставление академического отпуска на весенний семестр"
    },
    {
      id: 2,
      title: "Заявка на перевод на другую специальность",
      status: "Принято",
      statusColor: "bg-green-500",
      date: "2025-01-15",
      description: "Заявка на перевод с текущей специальности на 'Программная инженерия'"
    },
    {
      id: 3,
      title: "Заявка на справку об обучении",
      status: "Отклонено",
      statusColor: "bg-red-500",
      date: "2025-01-10",
      description: "Запрос справки об обучении для предоставления в стороннюю организацию"
    },
    {
      id: 4,
      title: "Заявка на восстановление студенческого билета",
      status: "Выполнено",
      statusColor: "bg-blue-500",
      date: "2025-01-05",
      description: "Восстановление утерянного студенческого билета"
    }
  ];

  return (
    <div className="w-full p-4">
      <div className="bg-card w-full max-w-[1200px] min-h-[800px] relative shadow-lg mx-auto rounded-lg overflow-hidden border border-border">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-card-foreground">Заявки</h1>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Подать новую заявку
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {applications.map((application) => (
              <Card key={application.id} className="border border-border shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-medium text-card-foreground">
                        {application.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Подано: {application.date}
                      </p>
                    </div>
                    <Badge className={`${application.statusColor} text-white`}>
                      {application.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{application.description}</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                    {application.status === "На рассмотрении" && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Отозвать
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Как подать заявку?</h3>
                <ul className="text-blue-700 space-y-1">
                  <li>• Нажмите кнопку "Подать новую заявку"</li>
                  <li>• Выберите тип заявки из списка</li>
                  <li>• Заполните необходимую информацию</li>
                  <li>• Приложите требуемые документы</li>
                  <li>• Отправьте заявку на рассмотрение</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};