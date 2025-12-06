import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { steps } from "./steps";

interface BreadCrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}
const BreadCrumbs = ({ currentStep, setCurrentStep }: BreadCrumbsProps) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((step) => {
            return (
              <React.Fragment key={step.key}>
                <BreadcrumbItem>
                  {step.key === currentStep ? (
                    <BreadcrumbPage>{step.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild className="cursor-pointer">
                      <button onClick={() => setCurrentStep(step.key)}>
                        {step.title}
                      </button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="last:hidden" />
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
