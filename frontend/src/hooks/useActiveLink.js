// src/hooks/useActive.js
import { useLocation } from "react-router-dom";

const useActive = (path) => {
  const location = useLocation();
  return location.pathname === path;
};

export default useActive;
