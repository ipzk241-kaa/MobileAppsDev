import { useState, useEffect } from "react";

const generateNewCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let newCode = "";
  for (let i = 0; i < 5; i++) {
    newCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return newCode;
};

const useAuthCode = () => {
  const [code, setCode] = useState(generateNewCode());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 30000;
    const intervalTime = 100;
    const increment = intervalTime / totalDuration;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 1) {
          setCode(generateNewCode());
          return 0;
        }
        return prevProgress + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return { code, progress };
};

export default useAuthCode;
