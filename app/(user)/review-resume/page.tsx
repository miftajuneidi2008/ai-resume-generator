import ReviewResume from '@/components/shared/ReviewResume'
import Wrapper from '@/components/shared/Wrapper'
import React from 'react'

const ReviewResumePage = () => {
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