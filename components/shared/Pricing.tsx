import React from "react";
import Wrapper from "./Wrapper";
import PricingCard from "./PricingCard";

const Pricing = () => {

 
  return (
    <Wrapper className="mt-4 md:mt-12">
      <div className="flex flex-col gap-3">
        <h2 className="text-center text-2xl font-bold">Pricing</h2>
        <p className="text-center text-gray-600">
          Choose the plan that best fits your needs.
        </p>
      </div>
      <div className="my-8 flex w-full items-center justify-center">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PricingCard
            title="Premium"
            price={7.99}  
            features={[
              "AI Tools",
              "Design Customization",
              "Up to three resumes",
            ]}
            className="bg-black text-white"
            buttonText="Get Premium"
            pre={false}
          />
          <PricingCard
            title="Premium Plus"
            price={12.99} 
            features={["AI Tools", "Design Customization", "Unlimited Resume"]}
            className="bg-linear-to-r from-green-500 to-green-400 text-white"
            buttonText="Get Premium Plus"
            pre={true}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Pricing;
