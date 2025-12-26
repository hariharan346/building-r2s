import React, { createContext, useContext, useState, useEffect } from "react";
import { ServiceRequest } from "@/data/services";

type UserRole = "customer" | "vendor";

interface User {
  id: string;
  name: string;
  email: string;
  type: UserRole;
  phone?: string;
  // Vendor-specific fields
  shopName?: string;
  shopDescription?: string;
  serviceIds?: string[];
  location?: string;
  experience?: string;
  isAvailable?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, type: UserRole) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  serviceRequests: ServiceRequest[];
  addServiceRequest: (request: Omit<ServiceRequest, "id" | "createdAt" | "updatedAt">) => void;
  updateRequestStatus: (requestId: string, status: ServiceRequest["status"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: "customer-1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    type: "customer",
    phone: "+91 98765 11111",
  },
  {
    id: "vendor-1",
    name: "Raj Kumar",
    email: "raj@powerfix.com",
    password: "password123",
    type: "vendor",
    phone: "+91 98765 43210",
    shopName: "PowerFix Electricals",
    shopDescription: "Expert electrical services for residential and commercial properties.",
    serviceIds: ["electrician"],
    location: "Sector 15, Cityville",
    experience: "12 years",
    isAvailable: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState(mockUsers);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: "req-1",
      customerId: "customer-1",
      vendorId: "v1",
      serviceId: "electrician",
      status: "pending",
      description: "Need to fix faulty wiring in kitchen",
      location: "123 Main Street, Cityville",
      isUrgent: false,
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: "req-2",
      customerId: "customer-1",
      vendorId: "v4",
      serviceId: "plumber",
      status: "accepted",
      description: "Bathroom tap leaking",
      location: "123 Main Street, Cityville",
      isUrgent: true,
      createdAt: "2024-01-19T14:00:00Z",
      updatedAt: "2024-01-19T15:30:00Z",
    },
    {
      id: "req-3",
      customerId: "customer-1",
      vendorId: "v8",
      serviceId: "ac-repair",
      status: "completed",
      description: "AC not cooling properly",
      location: "123 Main Street, Cityville",
      isUrgent: false,
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T16:00:00Z",
    },
  ]);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("serviconnect_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, type: UserRole): Promise<boolean> => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password && u.type === type
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("serviconnect_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      return false;
    }

    const newUser = {
      ...userData,
      id: `${userData.type}-${Date.now()}`,
    } as User & { password: string };

    setUsers([...users, newUser]);

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("serviconnect_user", JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("serviconnect_user");
  };

  const addServiceRequest = (request: Omit<ServiceRequest, "id" | "createdAt" | "updatedAt">) => {
    const newRequest: ServiceRequest = {
      ...request,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setServiceRequests([newRequest, ...serviceRequests]);
  };

  const updateRequestStatus = (requestId: string, status: ServiceRequest["status"]) => {
    setServiceRequests(
      serviceRequests.map((req) =>
        req.id === requestId
          ? { ...req, status, updatedAt: new Date().toISOString() }
          : req
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        serviceRequests,
        addServiceRequest,
        updateRequestStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
