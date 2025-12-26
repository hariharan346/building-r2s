import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Store, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserType = "customer" | "vendor" | null;

interface NavbarProps {
  user?: { name: string; type: UserType } | null;
  onLogout?: () => void;
}

export const Navbar = ({ user, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname.includes("/auth");

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow duration-300">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Servi<span className="text-gradient">Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Services
            </Link>

            {!isAuthPage && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                          {user.type === "vendor" ? (
                            <Store className="w-4 h-4 text-primary" />
                          ) : (
                            <User className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <span className="hidden sm:inline">{user.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to={user.type === "vendor" ? "/vendor/dashboard" : "/customer/dashboard"}>
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" asChild>
                      <Link to="/auth/login">Login</Link>
                    </Button>
                    <Button variant="default" asChild>
                      <Link to="/auth/register">Register</Link>
                    </Button>
                    <Button variant="outline" asChild className="hidden lg:flex">
                      <Link to="/auth/vendor-register">
                        <Store className="w-4 h-4 mr-2" />
                        Register Shop
                      </Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-down">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>

              {!isAuthPage && (
                <>
                  {user ? (
                    <>
                      <Link
                        to={user.type === "vendor" ? "/vendor/dashboard" : "/customer/dashboard"}
                        className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-medium text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/auth/register"
                        className="px-4 py-2 text-primary hover:bg-primary-light rounded-lg transition-colors font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Register
                      </Link>
                      <Link
                        to="/auth/vendor-register"
                        className="px-4 py-2 text-primary hover:bg-primary-light rounded-lg transition-colors font-medium flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Store className="w-4 h-4" />
                        Register Your Shop
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
