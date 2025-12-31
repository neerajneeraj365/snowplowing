"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Footer from "@/components/globals/Homepage/Footer";
export default function PaymentSuccess({
    params: { amount },
    
  }: {
    params: { amount: string };
  }) {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-muted">
      <main className="pt-24 pb-16">
       
                <div className="text-center py-8">
                  <div className="w-64 h-64 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                    <Check className="w-32 h-32 text-primary-foreground" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Thank you for your booking. We've sent a confirmation email to your emailwith all the details.
                  </p>
                  <p>Payment Amount: ${amount}</p>
                  <p>Payment Status: Successful</p>
                  <p>Payment Id: 1234567890 </p>
                  <Button variant="snow" size="default" onClick={() => router.push("/")}>Back to Home</Button>

              
                </div>
             <Footer />
      </main>
      </div>
    );
  }