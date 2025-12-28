import { Link } from "react-router-dom";
import { Service } from "@/data/services";

export const ServiceCard = ({ service, index = 0 }) => {
  const Icon = service.icon;

  return (
    <Link
      to={`/service/${service.id}`}
      className="group block"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="bg-card rounded-xl p-5 border border-border card-hover h-full">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-105 transition-all duration-300">
            <Icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {service.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
