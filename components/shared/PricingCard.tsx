"use client";
import { createCheckoutSession } from "@/data/action";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const PricingCard = ({
  title,
  price,
  features,
  className,
  buttonText,
  pre 
}: {
  title: string;
  price: number;
  features: string[];
  buttonText: string;
  className?: string;
  pre?:boolean;
}) => {

const [loading ,setLoading] = useState(false);
const priceId = pre ? env.NEXT_PUBLIC_PRICE_ID_PRO_PLUS_MONTHLY! : env.NEXT_PUBLIC_PRICE_ID_PRO_MONTHLY!;

const handleSubscribe = async ()=>{
  setLoading(true);

 try{
   
  const redurectUrl = await createCheckoutSession(priceId);
  console.log("Redirecting to:", redurectUrl);
  window.location.href = redurectUrl;
 }
 catch(err){
  console.log("Error creating checkout session:", err);
  toast.error("Failed to initiate checkout. Please try again.");
 }
 finally{
  setLoading(false);
 }
}

  return (
    <div className="w-md overflow-x-clip rounded-xl border-2 border-slate-200 p-4 shadow-sm">
      <h2 className="text-center text-2xl font-bold">{title}</h2>
      <p className="text-center text-gray-600">${price}/month</p>
      <ul className="list-disc space-y-3 text-gray-600">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <CheckIcon className="size-4 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-center">
        <button
          className={cn(
            "cursor-pointer rounded-md px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105 w-full",
            className,
          )}
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? (<span> Processing...</span>) : buttonText}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
