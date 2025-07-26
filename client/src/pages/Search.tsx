import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, Calendar, MapPin, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface ExchangeProgram {
  id: number;
  universityId: number;
  name: string;
  description: string;
  duration: string;
  language: string;
  requirements: any;
  availableSpots: number;
  applicationDeadline: string;
  semesterStart: string;
  semesterEnd: string;
  isActive: boolean;
  createdAt: string;
  university: {
    id: number;
    name: string;
    city: string;
    country: string;
    description: string;
    website: string;
    rating: number;
  };
}

export const Search = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    language: "",
    duration: ""
  });

  const { data: programs = [], isLoading } = useQuery<ExchangeProgram[]>({
    queryKey: ['/api/exchange-programs', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.language) params.append('language', filters.language);
      if (filters.duration) params.append('duration', filters.duration);
      
      const response = await fetch(`/api/exchange-programs?${params}`);
      if (!response.ok) throw new Error('Failed to fetch programs');
      return response.json();
    }
  });

  const filteredPrograms = programs.filter(program => 
    searchQuery === "" || 
    program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApplyFilters = () => {
    // Filters are already applied via useQuery dependency
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white w-full max-w-[1200px] min-h-[800px] relative shadow-lg mx-auto rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Input 
              placeholder="Введите направление, вуз или страну"
              className="pr-12 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-1 top-1 h-10 w-10 flex items-center justify-center">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Город</label>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md min-w-[120px]"
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
              >
                <option value="">Все</option>
                <option value="Москва">Москва</option>
                <option value="Санкт-Петербург">Санкт-Петербург</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Язык</label>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md min-w-[120px]"
                value={filters.language}
                onChange={(e) => setFilters({...filters, language: e.target.value})}
              >
                <option value="">Все</option>
                <option value="Русский">Русский</option>
                <option value="Английский">Английский</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Длительность</label>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md min-w-[120px]"
                value={filters.duration}
                onChange={(e) => setFilters({...filters, duration: e.target.value})}
              >
                <option value="">Все</option>
                <option value="семестр">Семестр</option>
                <option value="год">Год</option>
              </select>
            </div>
            
            <Button 
              onClick={handleApplyFilters}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8"
            >
              Применить
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500">Загрузка программ обмена...</div>
            </div>
          )}

          {/* Results Grid */}
          {!isLoading && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Найдено программ: {filteredPrograms.length}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <Card key={program.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800 mb-1">
                            {program.university.name}
                          </h3>
                          <p className="text-sm font-medium text-blue-600 mb-2">
                            {program.name}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {program.description}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{program.university.city}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{program.duration} • {program.language}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">
                              Дедлайн: {new Date(program.applicationDeadline).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                        </div>

                        {/* Available spots indicator */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">
                              {program.availableSpots} мест
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600">
                              {program.university.rating}
                            </span>
                          </div>
                        </div>

                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                          Подробнее
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPrograms.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    Программы не найдены. Попробуйте изменить критерии поиска.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};