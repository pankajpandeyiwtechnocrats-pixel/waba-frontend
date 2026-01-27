import { useEffect } from "react";
import { logout } from "../../utils/logout";

export default function Logout() {
  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      Logging out...
    </div>
  );
}
