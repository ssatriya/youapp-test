import { useState } from "react";

const useInterest = () => {
  const [interests, setInterests] = useState<string[]>([]);

  const handleAddInterest = (newInterest: string) => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const addAllInterest = (interests: string[]) => {
    setInterests(interests);
  };

  return { interests, handleAddInterest, handleRemoveInterest, addAllInterest };
};

export default useInterest;
