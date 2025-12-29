import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React from "react";

const PricingCard = ({
  title,
  price,
  features,
  className,
  buttonText,
}: {
  title: string;
  price: number;
  features: string[];
  buttonText: string;
  className?: string;
}) => {
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
            "cursor-pointer rounded-md px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105",
            className,
          )}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
