"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar';
import { Building, FileText, Heart, Home, Menu, Settings, X } from 'lucide-react';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';

const AppSidebar = ({ userType }: AppSidebarProps) => {

  const pathname = usePathname();

  const { toggleSidebar, open } = useSidebar();


  const navLinks =
    userType === "manager"
      ? [
        { icon: Building, Label: "Properties", href: "/managers/properties" },
        { icon: FileText, Label: "Applications", href: "/managers/applications" },
        { icon: Settings, Label: "Settings", href: "/managers/settings" },
      ] : [
        { icon: Heart, Label: "Favorites", href: "/tenants/favorites" },
        { icon: FileText, Label: "Applications", href: "/tenants/applications" },
        { icon: Home, Label: "Residences", href: "/tenants/residences" },
        { icon: Settings, Label: "Settings", href: "/tenants/sttings" },
      ]
  return (
    <Sidebar
      collapsible='icon'
      className='fixed left-0 bg-white shadow-lg'
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
            className={cn(
              "flex min-h-[56px] w-full items-center pt-3 mb-3",
              open ? "justify-between px-6": "justify-center"
            )}
            >
              {open?(
                <>
                <h1 className='text-xl font-bold text-gray-800'>
                  {userType === "manager"? "Manager View": "Rental View"}
                </h1>
                <Button
                className='hover:bg-gray-100 p-2 rounded-md'
                onClick={()=>toggleSidebar()} 
                >
                  <X 
                  className='h-6 w-6 text-gray-600'/>
                </Button>
                </>
              ):(
                <Button
                className='hover:bg-gray-100 p-2 rounded-md'
                onClick={()=>toggleSidebar()} 
                >
                  <Menu 
                  className='h-6 w-6 text-gray-600'/>
                </Button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {
            navLinks.map((link)=>{
              const isActive = pathname === link.href;

              return (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn("flex items-center px-7 py-7",
                      isActive
                      ?"bg-gray-100": "text-gray-600 hover:bg-gray-100",
                      open?"text-blue-600": "ml-[5x]"
                    )}
                  >
                    <Link href={link.href} className='w-full' scroll={false}>
                    <div className="flex items-center gap-3">
                      <link.icon className={`h-5 w-5 ${
                        isActive ? "text-blue-600": "text-gray-600"
                      }`}/>  
                      <span
                      className={`font-medium ${
                        isActive ? "text-blue-600": "text-gray-600"
                      }`}
                      >
                          {link.Label}
                      </span>
                    </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })
          }
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar