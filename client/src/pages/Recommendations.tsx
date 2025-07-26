import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Star, Clock, MapPin, BookOpen, Sparkles } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface Recommendation {
  id: number;
  studentId: number;
  courseId: number;
  programId: number;
  score: number;
  reasoning: string;
  createdAt: string;
  course: {
    id: number;
    name: string;
    code: string;
    description: string;
    credits: number;
    prerequisites: string;
    instructor: string;
  };
  program: {
    id: number;
    name: string;
    description: string;
    duration: string;
    language: string;
    availableSpots: number;
    applicationDeadline: string;
    university: {
      id: number;
      name: string;
      city: string;
      rating: number;
    };
  };
}

const STUDENT_ID = 1; // In real app, this would come from auth context

export const Recommendations = (): JSX.Element => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch existing recommendations
  const { data: recommendations = [], isLoading } = useQuery<Recommendation[]>({
    queryKey: [`/api/students/${STUDENT_ID}/recommendations`]
  });

  // Generate new recommendations
  const generateRecommendationsMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/students/${STUDENT_ID}/generate-recommendations`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to generate recommendations');
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/students/${STUDENT_ID}/recommendations`] });
      toast({ 
        title: "Рекомендации обновлены", 
        description: `Создано ${data.recommendations?.length || 0} новых рекомендаций на основе ИИ-анализа`
      });
    },
    onError: () => {
      toast({ 
        title: "Ошибка", 
        description: "Не удалось создать рекомендации. Попробуйте позже.",
        variant: "destructive" 
      });
    }
  });

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return "bg-green-500";
    if (score >= 0.8) return "bg-blue-500";
    if (score >= 0.7) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const getScoreText = (score: number) => {
    if (score >= 0.9) return "Отличное соответствие";
    if (score >= 0.8) return "Хорошее соответствие";
    if (score >= 0.7) return "Подходит";
    return "Возможно подходит";
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white w-full max-w-[1200px] min-h-[800px] relative shadow-lg mx-auto rounded-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-500" />
                ИИ-рекомендации курсов
              </h1>
              <p className="text-gray-600 mt-1">
                Персонализированные рекомендации курсов для обмена на основе вашего академического профиля
              </p>
            </div>
            <Button
              onClick={() => generateRecommendationsMutation.mutate()}
              disabled={generateRecommendationsMutation.isPending}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {generateRecommendationsMutation.isPending ? "Генерация..." : "Обновить рекомендации"}
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500">Загрузка рекомендаций...</div>
            </div>
          )}

          {/* Recommendations List */}
          {!isLoading && (
            <>
              {recommendations.length === 0 ? (
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Пока нет рекомендаций
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Нажмите "Обновить рекомендации", чтобы ИИ проанализировал ваш профиль и предложил подходящие курсы
                  </p>
                  <Button
                    onClick={() => generateRecommendationsMutation.mutate()}
                    disabled={generateRecommendationsMutation.isPending}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Создать рекомендации
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-sm text-gray-600 mb-4">
                    Найдено рекомендаций: {recommendations.length}
                  </div>

                  {recommendations.map((rec) => (
                    <Card key={rec.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Course Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                  {rec.course.name}
                                </h3>
                                <Badge 
                                  className={`${getScoreColor(rec.score)} text-white text-xs`}
                                >
                                  {Math.round(rec.score * 100)}%
                                </Badge>
                              </div>
                              <p className="text-sm text-blue-600 font-medium mb-1">
                                {rec.program.university.name} • {rec.program.name}
                              </p>
                              <p className="text-sm text-gray-600 mb-2">
                                {rec.course.description}
                              </p>
                            </div>
                          </div>

                          {/* Course Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm">
                              <BookOpen className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">
                                {rec.course.code} • {rec.course.credits} кредитов
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">
                                {rec.program.university.city} • {rec.program.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">
                                Дедлайн: {new Date(rec.program.applicationDeadline).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                          </div>

                          {/* AI Reasoning */}
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Brain className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-blue-800 mb-1">
                                  Обоснование ИИ
                                </h4>
                                <p className="text-sm text-blue-700">
                                  {rec.reasoning}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Program Info */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm text-gray-600">
                                  {rec.program.university.rating}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600">
                                {rec.program.availableSpots} свободных мест
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {getScoreText(rec.score)}
                              </Badge>
                            </div>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                              Подать заявку
                            </Button>
                          </div>

                          {/* Prerequisites */}
                          {rec.course.prerequisites && (
                            <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                              <span className="font-medium">Требования:</span> {rec.course.prerequisites}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};