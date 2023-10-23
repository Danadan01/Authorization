import { useEffect, useState } from "react";

const useIsOutsideClick = (ref: React.RefObject<Node>): boolean => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  
  return isClicked;
}

export default useIsOutsideClick