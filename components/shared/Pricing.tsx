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
            title="Basic"
            price={0}
            features={["1 Resume", "1 Download", "1 Month"]}
          />
          <PricingCard
            title="Premium"
            price={5}
            features={[
              "Unlimited Resume",
              "Unlimited Download",
              "Unlimited Month",
            ]}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Pricing;
