import React from "react";

const PricingCard = ({
  title,
  price,
  features,
}: {
  title: string;
  price: number;
  features: string[];
}) => {
  return (
    <div className="w-md overflow-x-clip bg-slate-400">
      <h2 className="text-center text-2xl font-bold">{title}</h2>
      <p className="text-center text-gray-600">${price}/month</p>
      <ul className="list-disc text-gray-600">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button className="">Get Started</button>
    </div>
  );
};

export default PricingCard;
