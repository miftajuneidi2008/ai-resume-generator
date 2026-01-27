import Navbar from "@/components/shared/Navbar";
import { getUserSession } from "@/lib/getUserSession";
import React from "react";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";
import { getUserSubscriptionLevel } from "@/lib/subscription";

const UserLayout = async({ children }: { children: React.ReactNode }) => {
  const session = await getUserSession();
  if(!session)
  {
    return null;
  }
   const userSubscriptionLevel = await getUserSubscriptionLevel(session.user.id);
  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
    <div>
      <Navbar />
      {children}
    </div>
    </SubscriptionLevelProvider>
  );
};

export default UserLayout;
