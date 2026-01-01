"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/globals/Homepage/Footer";
import Header from "@/components/globals/Homepage/Header";
import { format } from "date-fns";

export default function CountdownRedirect({ seconds = 10 }: { seconds?: number }) {
  const [counter, setCounter] = useState(seconds);

  useEffect(() => {
    if (counter <= 0) {
      window.location.href = "/";
      return;
    }

    const interval = setInterval(() => {
      setCounter(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <p className="text-md text-muted-foreground my-4">
      You will be redirected to the homepage in <span className="font-bold text-red-500">{counter}</span> seconds.
    </p>
  );
}
