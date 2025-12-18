import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

const LoadingButton = ({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
