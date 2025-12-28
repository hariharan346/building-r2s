import { Link, Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { getVendorById, getServiceById } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
} from "lucide-react";

const CustomerDashboard = () => {
  const { user, logout, serviceRequests, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.type !== "customer") {
    return <Navigate to="/auth/login" replace />;
  }

  const customerRequests = serviceRequests.filter(
    (r) => r.customerId === user.id
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="bg-primary">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-success">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
    
    
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={user} onLogout={logout} />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {user.name}
          </h1>
          <p className="text-muted-foreground mb-8">
            Manage your service requests
          </p>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">
              Your Service Requests ({customerRequests.length})
            </h2>
            {customerRequests.length > 0 ? (
              <div className="space-y-4">
                {customerRequests.map((req) => {
                  const vendor = getVendorById(req.vendorId);
                  const service = getServiceById(req.serviceId);
                  return (
                    <div
                      key={req.id}
                      className="p-4 bg-muted/50 rounded-xl"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">
                              {service?.name}
                            </span>
                            {req.isUrgent && (
                              <Badge
                                variant="destructive"
                                className="text-xs"
                              >
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {vendor?.name}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {req.location}
                          </p>
                          <p className="text-sm mt-2">
                            {req.description}
                          </p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(req.status)}
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No service requests yet.{" "}
                <Link
                  to="/categories"
                  className="text-primary hover:underline"
                >
                  Browse services
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
