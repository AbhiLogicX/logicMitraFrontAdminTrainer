import { useState } from "react";

export const useLogut = () => {
  const [logout, setLogut] = useState(false);
  return [logout, setLogut];
};
