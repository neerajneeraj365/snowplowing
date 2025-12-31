"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Snowflake, ArrowLeft, CreditCard, Check } from "lucide-react";
import Header from "@/components/globals/Homepage/Header";
import Footer from "@/components/globals/Homepage/Footer";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import CheckoutPage from "@/components/globals/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter your full address"),
  service: z.string().min(1, "Please select a service"),
  date: z.date({ error: "Please select a date" }),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

const services = [
  { value: "snow-plowing", label: "Snow Plowing", amount: 75.99 },
  { value: "snow-plowing-seasonal", label: "Snow Plowing (Seasonal Contract)", amount: 500 },
  { value: "ice-management", label: "Ice Management / Salting", amount: 50 },
  { value: "landscaping-design", label: "Landscaping Design Consultation", amount: 150 },
  { value: "lawn-maintenance", label: "Lawn Maintenance (Per Visit)", amount: 65 },
  { value: "lawn-maintenance-monthly", label: "Lawn Maintenance (Monthly)", amount: 200 },
  { value: "tree-care", label: "Tree & Shrub Care", amount: 100 },
  { value: "irrigation", label: "Irrigation System Service", amount: 125 },
];

const BookingPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      service: "",
      notes: "",
    },
  });

  const selectedService = services.find(s => s.value === form.watch("service"));

  const onSubmit =  (data: FormData) => {
    setIsSubmitting(true);
    
    setIsSubmitting(false);
    form.reset();
  };

  const handleNext = async () => {
    const fieldsToValidate = step === 1 
      ? ["firstName", "lastName", "email", "phone", "address", "service", "date"] as const
      : [];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : router.push("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? "Back" : "Back to Home"}
          </button>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                )}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                <span className={cn(
                  "hidden sm:block font-medium",
                  step >= s ? "text-foreground" : "text-muted-foreground"
                )}>
                  {s === 1 ? "Details" : s === 2 ? "Payment" : "Confirmed"}
                </span>
                {s < 2 && <div className="w-12 h-0.5 bg-border" />}
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-card p-6 md:p-10">
              {/* Step 1: Booking Details */}
              {step === 1 && (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                      <Snowflake className="w-8 h-8 text-sky-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Book Your Service</h1>
                    <p className="text-muted-foreground">Fill in your details to schedule your service</p>
                  </div>

                  <Form {...form}>
                    <form className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="(555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St, City, State ZIP" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem key={service.value} value={service.value}>
                                    {service.label} - ${service.amount}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Preferred Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any special instructions or details about your property..."
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="button" variant="snow" size="default" className="w-full" onClick={handleNext}>
                        Continue to Payment
                      </Button>
                    </form>
                  </Form>
                </>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Payment Details</h1>
                    <p className="text-muted-foreground">Complete your booking with secure payment</p>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-muted rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium">{selectedService?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{form.getValues("date") ? format(form.getValues("date"), "PPP") : ""}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Address</span>
                        <span className="font-medium text-right max-w-[200px]">{form.getValues("address")}</span>
                      </div>
                      <div className="border-t border-border pt-3 mt-3">
                        <div className="flex justify-between text-lg">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-primary">${selectedService?.amount || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Form Placeholder */}
                  <div className="bg-muted/50 border-2 border-dashed border-border rounded-xl p-8 text-center mb-6">
                    {/* <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold text-foreground mb-2">Secure Payment</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Payment integration will be enabled once you connect to Lovable Cloud with Stripe.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      For now, click "Confirm Booking" to simulate a successful payment.
                    </p> */}
                    {
                        selectedService && (
                            <Elements
                                stripe={stripePromise}
                                options={{
                                    mode: "payment",
                                    amount: convertToSubcurrency(selectedService.amount),
                                    currency: "cad",
                                }}
                            >
                                <CheckoutPage amount={selectedService.amount} onSuccess={() => setStep(3)} />
                            </Elements>
                        )
                    }
                    
                  </div>

                  {/* <Button 
                    variant="snow" 
                    size="lg" 
                    className="w-full" 
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Confirm Booking - $${selectedService?.amount || 0}`}
                  </Button> */}
                </>
              )}

              
              
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
