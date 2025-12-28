import { useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getVendorById, getServiceById } from "@/data/services";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Store, MapPin, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ServiceRequestPage = () => {
  const { vendorId } = useParams();
  const [searchParams] = useSearchParams();
  const serviceIdFromUrl = searchParams.get("service");

  const { user, logout, addServiceRequest, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const vendor = getVendorById(vendorId || "");

  const [selectedServiceId, setSelectedServiceId] = useState(serviceIdFromUrl || "");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!vendor) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar user={user} onLogout={logout} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Vendor Not Found
            </h1>
            <Link to="/categories" className="text-primary hover:underline">
              Browse services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to request a service.",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }

    if (!selectedServiceId || !description.trim() || !location.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    addServiceRequest({
      customerId: user.id,
      vendorId: vendor.id,
      serviceId: selectedServiceId,
      status: "pending",
      description: description.trim(),
      location: location.trim(),
      isUrgent,
    });

    toast({
      title: "Request Submitted!",
      description: "Your service request has been sent to the vendor.",
    });

    setIsSubmitting(false);
    navigate("/customer/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={user} onLogout={logout} />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link
            to={`/vendor/${vendor.id}${
              selectedServiceId ? `?service=${selectedServiceId}` : ""
            }`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to {vendor.name}
          </Link>

          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-md">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Request Service
            </h1>
            <p className="text-muted-foreground mb-6">
              Fill in the details below to send a service request
            </p>

            {/* Vendor Info */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{vendor.name}</p>
                <p className="text-sm text-muted-foreground">
                  {vendor.location}
                </p>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/20 rounded-xl mb-6">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Login Required</p>
                  <p className="text-sm text-muted-foreground">
                    Please{" "}
                    <Link to="/auth/login" className="text-primary hover:underline">
                      login
                    </Link>{" "}
                    or{" "}
                    <Link
                      to="/auth/register"
                      className="text-primary hover:underline"
                    >
                      register
                    </Link>{" "}
                    to submit a service request.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service">Service Type *</Label>
                <Select
                  value={selectedServiceId}
                  onValueChange={setSelectedServiceId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendor.serviceIds.map((sid) => {
                      const s = getServiceById(sid);
                      return s ? (
                        <SelectItem key={sid} value={sid}>
                          {s.name}
                        </SelectItem>
                      ) : null;
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Problem Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Describe Your Problem *</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe the issue or service you need in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Your Location / Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter your full address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Urgency Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div>
                  <Label htmlFor="urgent" className="font-medium cursor-pointer">
                    Urgent Request
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Mark if you need immediate assistance
                  </p>
                </div>
                <Switch
                  id="urgent"
                  checked={isUrgent}
                  onCheckedChange={setIsUrgent}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceRequestPage;
