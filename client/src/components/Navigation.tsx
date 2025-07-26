import { Link, useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className = "" }: NavigationProps): JSX.Element => {
  const [location] = useLocation();

  const navItems = [
    { text: "Поиск", path: "/", active: location === "/" },
    { text: "Рекомендации", path: "/recommendations", active: location === "/recommendations" },
    { text: "Профиль", path: "/profile", active: location === "/profile" || location === "/profile/edit" },
    { text: "Заявки", path: "/applications", active: location === "/applications" },
    { text: "Обратная связь", path: "/feedback", active: location === "/feedback" },
  ];

  return (
    <header className={`w-full h-20 bg-white border-b border-gray-200 z-10 ${className}`}>
      <nav className="w-full h-20 flex items-center px-5 shadow-sm">
        <img
          className="w-[66px] h-[66px] object-cover"
          alt="University Logo"
          src="/figmaAssets/chatgpt-image-10------2025-----14-22-45-photoroom-1.png"
        />

        <div className="flex ml-[200px] space-x-[100px]">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`font-normal text-base hover:text-blue-600 transition-colors ${
                item.active ? "text-[#007bff]" : "text-[#212529]"
              }`}
            >
              {item.text}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <img
            className="w-[49px] h-[37px]"
            alt="Notification"
            src="/figmaAssets/xmlid-2-.svg"
          />
          <Avatar className="w-[58px] h-[58px]">
            <AvatarImage src="/figmaAssets/vector-2.png" alt="User" />
            <AvatarFallback>ИИ</AvatarFallback>
          </Avatar>
          <Button className="h-10 w-[69px] bg-blue-600 hover:bg-blue-700 text-white rounded">
            Выйти
          </Button>
        </div>
      </nav>
    </header>
  );
};