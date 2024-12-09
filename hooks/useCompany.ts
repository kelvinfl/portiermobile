import { Company } from "@/types/company";
import { useEffect, useState } from "react";

export function useCompany() {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompany({ id: "123", name: "dr.Oetker" });
    }, 0);

    return () => clearTimeout(timer); // Cleanup to avoid memory leaks
  }, []);

  return { company };
}
