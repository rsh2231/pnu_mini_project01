// src/hooks/useFetchUser.ts

import { useEffect, useState } from "react";
import { User } from "@/type/user";

export function useFetchUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const springurl = process.env.NEXT_PUBLIC_SPRING_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${springurl}/loged-in/user`, {
          credentials: "include",
          headers: {
            Authorization: sessionStorage.getItem("JwtToken") || "",
          },
        });
        const data = await res.json();
        const member = data.content?.member;
        if (!member) throw new Error("유저 정보 없음");
        setUser(member);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
