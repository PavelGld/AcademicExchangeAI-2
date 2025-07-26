import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon } from "lucide-react";

export const Search = (): JSX.Element => {
  const programs = [
    {
      id: 1,
      name: "ИТМО",
      year: "Набор 2025",
      city: "Санкт-Петербург",
      location: "Москва",
      status: "Подробнее",
      statusColor: "bg-blue-500"
    },
    {
      id: 2,
      name: "МГУ",
      year: "Набор 2025",
      city: "Санкт-Петербург",
      location: "Москва",
      status: "Подробнее",
      statusColor: "bg-blue-500"
    },
    {
      id: 3,
      name: "ВШЭ - Москва",
      year: "Набор 2025",
      city: "Москва",
      location: "Москва",
      status: "Подробнее",
      statusColor: "bg-blue-500"
    }
  ];

  return (
    <div className="w-full p-4">
      <div className="bg-white w-full max-w-[1200px] min-h-[800px] relative shadow-lg mx-auto rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Input 
              placeholder="Введите направление, вуз или страну"
              className="pr-12 h-12 text-base"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1 h-10 w-10 bg-blue-500 hover:bg-blue-600"
            >
              <SearchIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Город</label>
              <select className="px-3 py-2 border border-gray-300 rounded-md min-w-[120px]">
                <option>Все</option>
                <option>Москва</option>
                <option>Санкт-Петербург</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Направление</label>
              <select className="px-3 py-2 border border-gray-300 rounded-md min-w-[120px]">
                <option>Все</option>
                <option>IT</option>
                <option>Экономика</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Язык</label>
              <select className="px-3 py-2 border border-gray-300 rounded-md min-w-[120px]">
                <option>Все</option>
                <option>Русский</option>
                <option>Английский</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Длительность</label>
              <select className="px-3 py-2 border border-gray-300 rounded-md min-w-[120px]">
                <option>Все</option>
                <option>4 года</option>
                <option>2 года</option>
              </select>
            </div>
            
            <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8">
              Применить
            </Button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((program) => (
              <Card key={program.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{program.name}</h3>
                      <p className="text-sm text-gray-600">{program.year}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Город:</span>
                        <span className="text-gray-800">{program.city}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Локация:</span>
                        <span className="text-gray-800">{program.location}</span>
                      </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded"></div>
                      <div className="flex-1"></div>
                      <Badge variant="outline" className="text-xs">📋</Badge>
                      <Badge variant="outline" className="text-xs">🏠</Badge>
                    </div>

                    <Button 
                      className={`w-full ${program.statusColor} hover:bg-blue-600 text-white text-sm`}
                    >
                      {program.status}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Duplicate rows for demonstration */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {programs.map((program, index) => (
              <Card key={`row2-${program.id}`} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{program.name}</h3>
                      <p className="text-sm text-gray-600">{program.year}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Город:</span>
                        <span className="text-gray-800">{program.city}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Локация:</span>
                        <span className="text-gray-800">{program.location}</span>
                      </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded"></div>
                      <div className="flex-1"></div>
                      <Badge variant="outline" className="text-xs">📋</Badge>
                      <Badge variant="outline" className="text-xs">🏠</Badge>
                    </div>

                    <Button 
                      className={`w-full ${program.statusColor} hover:bg-blue-600 text-white text-sm`}
                    >
                      {program.status}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};