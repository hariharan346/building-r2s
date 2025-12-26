import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VendorCard } from "@/components/cards/VendorCard";
import { getServiceById, getVendorsByService, getCategoryById } from "@/data/services";
import { useAuth } from "@/context/AuthContext";
import { ChevronLeft, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { user, logout } = useAuth();

  const [sortBy, setSortBy] = useState("rating");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const service = getServiceById(serviceId || "");
  const category = service ? getCategoryById(service.categoryId) : null;
  const vendors = getVendorsByService(serviceId || "");

  const filteredVendors = useMemo(() => {
    let result = [...vendors];

    if (showAvailableOnly) {
      result = result.filter((v) => v.isAvailable);
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "distance":
        result.sort(
          (a, b) =>
            parseFloat(a.distance.replace(" km", "")) -
            parseFloat(b.distance.replace(" km", ""))
        );
        break;
    }

    return result;
  }, [vendors, sortBy, showAvailableOnly]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar user={user} onLogout={logout} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Link to="/categories" className="text-primary hover:underline">
              Browse all services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={user} onLogout={logout} />

      <main className="flex-1">
        {/* Header */}
        <section className="py-10 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <Link
              to={category ? `/category/${category.id}` : "/categories"}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              {category?.name || "All Categories"}
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center">
                <Icon className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {service.name}
                </h1>
                <p className="text-muted-foreground mt-1">{service.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vendors List */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredVendors.length}</span> service
                providers found
              </p>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="sm:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                <div className={`${showFilters ? "flex" : "hidden"} sm:flex items-center gap-4`}>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="available"
                      checked={showAvailableOnly}
                      onCheckedChange={setShowAvailableOnly}
                    />
                    <Label htmlFor="available" className="text-sm cursor-pointer">
                      Available Only
                    </Label>
                  </div>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px]">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Top Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviewed</SelectItem>
                      <SelectItem value="distance">Nearest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Vendor Cards */}
            {filteredVendors.length > 0 ? (
              <div className="space-y-4">
                {filteredVendors.map((vendor, index) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    serviceId={serviceId}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No service providers found for this service.
                </p>
                {showAvailableOnly && (
                  <Button
                    variant="link"
                    onClick={() => setShowAvailableOnly(false)}
                    className="mt-2"
                  >
                    Show all providers
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
