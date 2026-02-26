import ReviewResume from '@/components/shared/ReviewResume'
import Wrapper from '@/components/shared/Wrapper'
import { buttonVariants } from '@/components/ui/button';
import { getUserSession } from '@/lib/getUserSession';
import { canUseAnalyzer } from '@/lib/permissions';
import { getUserSubscriptionLevel } from '@/lib/subscription';
import Link from 'next/link';
import { redirect } from 'next/navigation';
const ReviewResumePage = async () => {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

 const subscription:"free" | "pro" | "pro_plus" = await getUserSubscriptionLevel(session.user.id!);
  
  if (!subscription) return null;

  if (!canUseAnalyzer(subscription)) { 
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center h-screen flex-col gap-4">
        <div>
          <p>Upgrade Subscription level to use this feature</p>
        </div>
       <Link href="/" className={buttonVariants({variant:"outline"})} >Upgrade your subscription for more service</Link>
      </div>
    );
  }

  return (
    <Wrapper>
     <main className="min-h-screen bg-linear-to-b from-white to-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewResume />
        </div>
      </main>
    </Wrapper>
  )
}

export default ReviewResumePage