import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface StudentCourse {
  id: number;
  courseName: string;
  courseCode: string;
  grade: string;
  credits: number;
  semester: string;
  year: number;
  description?: string;
}

interface Achievement {
  id: number;
  title: string;
  description?: string;
  type: string;
  year: number;
}

const STUDENT_ID = 1; // In real app, this would come from auth context

export const ProfileEdit = (): JSX.Element => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseCode: "",
    grade: "",
    credits: 3,
    semester: "",
    year: new Date().getFullYear(),
    description: ""
  });

  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    type: "олимпиада",
    year: new Date().getFullYear()
  });

  // Fetch student data
  const { data: student } = useQuery({
    queryKey: [`/api/students/${STUDENT_ID}`]
  });

  // Fetch student courses
  const { data: courses = [] } = useQuery<StudentCourse[]>({
    queryKey: [`/api/students/${STUDENT_ID}/courses`]
  });

  // Fetch student achievements  
  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: [`/api/students/${STUDENT_ID}/achievements`]
  });

  // Add course mutation
  const addCourseMutation = useMutation({
    mutationFn: async (courseData: any) => {
      const response = await fetch(`/api/students/${STUDENT_ID}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      });
      if (!response.ok) throw new Error('Failed to add course');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/students/${STUDENT_ID}/courses`] });
      setNewCourse({
        courseName: "",
        courseCode: "",
        grade: "",
        credits: 3,
        semester: "",
        year: new Date().getFullYear(),
        description: ""
      });
      toast({ title: "Курс добавлен", description: "Курс успешно добавлен в зачетную книжку" });
    },
    onError: () => {
      toast({ 
        title: "Ошибка", 
        description: "Не удалось добавить курс",
        variant: "destructive" 
      });
    }
  });

  // Delete course mutation
  const deleteCourseMutation = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await fetch(`/api/student-courses/${courseId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete course');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/students/${STUDENT_ID}/courses`] });
      toast({ title: "Курс удален", description: "Курс удален из зачетной книжки" });
    }
  });

  // Add achievement mutation
  const addAchievementMutation = useMutation({
    mutationFn: async (achievementData: any) => {
      const response = await fetch(`/api/students/${STUDENT_ID}/achievements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(achievementData)
      });
      if (!response.ok) throw new Error('Failed to add achievement');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/students/${STUDENT_ID}/achievements`] });
      setNewAchievement({
        title: "",
        description: "",
        type: "олимпиада", 
        year: new Date().getFullYear()
      });
      toast({ title: "Достижение добавлено", description: "Достижение успешно добавлено" });
    }
  });

  // Delete achievement mutation
  const deleteAchievementMutation = useMutation({
    mutationFn: async (achievementId: number) => {
      const response = await fetch(`/api/achievements/${achievementId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete achievement');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/students/${STUDENT_ID}/achievements`] });
      toast({ title: "Достижение удалено" });
    }
  });
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
                {/* Existing achievements */}
                <div className="space-y-2">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <div className="text-xs text-gray-400 flex gap-2">
                          <span>{achievement.type}</span>
                          <span>•</span>
                          <span>{achievement.year}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteAchievementMutation.mutate(achievement.id)}
                        disabled={deleteAchievementMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add new achievement */}
                <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Название достижения</Label>
                      <Input
                        value={newAchievement.title}
                        onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                        placeholder="Победитель олимпиады"
                      />
                    </div>
                    <div>
                      <Label>Тип</Label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newAchievement.type}
                        onChange={(e) => setNewAchievement({...newAchievement, type: e.target.value})}
                      >
                        <option value="олимпиада">Олимпиада</option>
                        <option value="конкурс">Конкурс</option>
                        <option value="публикация">Публикация</option>
                        <option value="грант">Грант</option>
                        <option value="стажировка">Стажировка</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Описание</Label>
                      <Textarea
                        value={newAchievement.description}
                        onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                        placeholder="Краткое описание достижения"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Год</Label>
                      <Input
                        type="number"
                        min="2020"
                        max="2030"
                        value={newAchievement.year}
                        onChange={(e) => setNewAchievement({...newAchievement, year: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => addAchievementMutation.mutate(newAchievement)}
                    disabled={!newAchievement.title.trim() || addAchievementMutation.isPending}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить достижение
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Grade Book */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Зачетная книжка</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Existing courses */}
                <div className="space-y-2">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{course.courseName}</h4>
                        <p className="text-sm text-gray-600">{course.description}</p>
                        <div className="text-xs text-gray-400 flex gap-2">
                          <span>{course.courseCode}</span>
                          <span>•</span>
                          <span>Оценка: {course.grade}</span>
                          <span>•</span>
                          <span>{course.credits} кредитов</span>
                          <span>•</span>
                          <span>{course.semester} {course.year}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCourseMutation.mutate(course.id)}
                        disabled={deleteCourseMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add new course */}
                <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Название курса</Label>
                      <Input
                        value={newCourse.courseName}
                        onChange={(e) => setNewCourse({...newCourse, courseName: e.target.value})}
                        placeholder="Алгоритмы и структуры данных"
                      />
                    </div>
                    <div>
                      <Label>Код курса</Label>
                      <Input
                        value={newCourse.courseCode}
                        onChange={(e) => setNewCourse({...newCourse, courseCode: e.target.value})}
                        placeholder="CS301"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Оценка</Label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newCourse.grade}
                        onChange={(e) => setNewCourse({...newCourse, grade: e.target.value})}
                      >
                        <option value="">Выберите оценку</option>
                        <option value="5">Отлично (5)</option>
                        <option value="4">Хорошо (4)</option>
                        <option value="3">Удовлетворительно (3)</option>
                        <option value="зачет">Зачет</option>
                      </select>
                    </div>
                    <div>
                      <Label>Кредиты</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={newCourse.credits}
                        onChange={(e) => setNewCourse({...newCourse, credits: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label>Семестр</Label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newCourse.semester}
                        onChange={(e) => setNewCourse({...newCourse, semester: e.target.value})}
                      >
                        <option value="">Выберите семестр</option>
                        <option value="Осенний">Осенний</option>
                        <option value="Весенний">Весенний</option>
                        <option value="Летний">Летний</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Год</Label>
                      <Input
                        type="number"
                        min="2020"
                        max="2030"
                        value={newCourse.year}
                        onChange={(e) => setNewCourse({...newCourse, year: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label>Описание курса</Label>
                      <Textarea
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                        placeholder="Краткое описание содержания курса"
                        rows={2}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => addCourseMutation.mutate(newCourse)}
                    disabled={!newCourse.courseName.trim() || !newCourse.grade || addCourseMutation.isPending}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить курс
                  </Button>
                </div>
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