"use client"
import { useEffect, useState } from "react";
import Search from "@/components/form/search";
import Header from "@/components/header/header";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Header />
      <Search />


    </div>
  );
}
