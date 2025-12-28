import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { getServiceById } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  Store,
} from "lucide-react";
import { useState } from "react";

const VendorDashboard = () => {
  const {
    user,
    logout,
    serviceRequests,
    updateRequestStatus,
    isAuthenticated,
  } = useAuth();

  const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? true);

  if (!isAuthenticated || user?.type !== "vendor") {
    return <Navigate to="/auth/login" replace />;
  }

  // In real app, filter by vendor's actual ID from the vendors list
  const vendorRequests = serviceRequests.filter(
    (r) => r.vendorId === "v1" || r.customerId !== user.id
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
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Store className="w-8 h-8 text-primary" />
                {user.shopName || user.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {user.location}
              </p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
              <Switch
                id="available"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
              <Label htmlFor="available" className="cursor-pointer">
                {isAvailable ? (
                  <span className="text-success font-medium">
                    Available
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Unavailable
                  </span>
                )}
              </Label>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">
              Incoming Requests
            </h2>
            {vendorRequests.length > 0 ? (
              <div className="space-y-4">
                {vendorRequests.map((req) => {
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
                            {getStatusBadge(req.status)}
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {req.location}
                          </p>
                          <p className="text-sm mt-2">
                            {req.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {req.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateRequestStatus(
                                    req.id,
                                    "accepted"
                                  )
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateRequestStatus(
                                    req.id,
                                    "cancelled"
                                  )
                                }
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {req.status === "accepted" && (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() =>
                                updateRequestStatus(
                                  req.id,
                                  "completed"
                                )
                              }
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No incoming requests yet.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorDashboard;
