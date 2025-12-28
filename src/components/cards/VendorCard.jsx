import { Link } from "react-router-dom";
import { getServiceById } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Phone, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const VendorCard = ({ vendor, serviceId, index = 0 }) => {
  return (
    <div
      className="bg-card rounded-2xl p-6 border border-border card-hover animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Vendor Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg text-foreground">
                  {vendor.name}
                </h3>
                {vendor.isAvailable ? (
                  <Badge
                    variant="default"
                    className="bg-success text-success-foreground text-xs"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Available
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    <XCircle className="w-3 h-3 mr-1" />
                    Unavailable
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {vendor.description}
              </p>
            </div>
          </div>

          {/* Rating & Location */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-semibold text-sm">{vendor.rating}</span>
              <span className="text-muted-foreground text-sm">
                ({vendor.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>{vendor.location}</span>
              <span className="text-primary font-medium">• {vendor.distance}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>{vendor.experience} experience</span>
            </div>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-2 mt-4">
            {vendor.specializations.map((spec) => (
              <Badge
                key={spec}
                variant="secondary"
                className="text-xs font-normal"
              >
                {spec}
              </Badge>
            ))}
          </div>

          {/* Price Range */}
          <p className="text-sm mt-3">
            <span className="text-muted-foreground">Price Range: </span>
            <span className="font-semibold text-primary">
              {vendor.priceRange}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 lg:w-40">
          <Button asChild variant="default" className="w-full">
            <Link
              to={`/vendor/${vendor.id}${
                serviceId ? `?service=${serviceId}` : ""
              }`}
            >
              View Profile
            </Link>
          </Button>
          {vendor.isAvailable && (
            <Button asChild variant="hero" className="w-full">
              <Link
                to={`/request/${vendor.id}${
                  serviceId ? `?service=${serviceId}` : ""
                }`}
              >
                Request Service
              </Link>
            </Button>
          )}
          <a
            href={`tel:${vendor.phone}`}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};
