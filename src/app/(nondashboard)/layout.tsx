"use client"
import Navbar from '@/components/Navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {

  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const pathName = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathName.startsWith("/tenants")) ||
        (userRole === "manager" && pathName=== "/")
      ) {
        router.push(
          "/managers/properties",{ scroll: false }
        );
      } else {
        setIsLoading(false)
      }
    }
  }, [authUser, router, pathName]);

  if (authLoading || isLoading) return <>Loading</>;

  return (
    <div className='h-full w-full'>
      <Navbar />
      <main className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  )
}

export default layout

function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.')
}
