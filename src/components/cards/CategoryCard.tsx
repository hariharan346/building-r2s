import { Link } from "react-router-dom";
import { Category } from "@/data/services";

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  const Icon = category.icon;

  return (
    <Link
      to={`/category/${category.id}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-card rounded-2xl p-6 border border-border card-hover h-full">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {category.description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {category.services.length} services
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
