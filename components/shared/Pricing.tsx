import React from "react";
import Wrapper from "./Wrapper";
import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <Wrapper className="mt-4 md:mt-12">
      <h2 className="text-center text-2xl font-bold">Pricing</h2>
      <p className="text-center text-gray-600">
        Choose the plan that best fits your needs.
      </p>
      <div className="my-6 flex w-full items-center justify-center">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PricingCard
            title="Premium"
            price={0}
            features={[
              "AI Tools",
              "Design Customization",
              "Up to three resumes",
            ]}
            className="bg-black text-white"
            buttonText="Get Premium"
          />
          <PricingCard
            title="Premium"
            price={5}
            features={["AI Tools", "Design Customization", "Unlimited Resume"]}
            className="bg-linear-to-r from-green-500 to-green-400 text-white"
            buttonText="Get Premium Plus"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Pricing;
