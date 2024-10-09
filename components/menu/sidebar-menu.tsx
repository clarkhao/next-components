import { BadgeHelp, ChevronsLeft, CreditCard, LayoutDashboard, LogOut, MonitorPlay, Settings } from "lucide-react"
import { NavigationMenu, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./navigation-menu"
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu"
import { SubscriptionStatus } from "components/subscription/status"
import { cn } from "lib/utils"
import React from "react"
import { AnimatePresence, HTMLMotionProps, m, Variants } from "framer-motion"
import { animationVariants } from "lib/animate"

type TSidebarMenu = {}
export function SidebarMenu() {
  const [open, setOpen] = React.useState(true)
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <m.aside
            id="default-sidebar"
            className={cn(
              "fixed left-0 top-0 z-40 h-screen w-[300px] ",
              "bg-gray-50 pb-10 transition-transform dark:bg-gray-800",
              open ? "-translate-x-0 " : "-translate-x-full  "
            )}
            aria-label="Sidebar"
            variants={animationVariants["sidebar"] as Variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <NavigationMenu
              className={cn(
                "flex h-full w-full flex-col items-start justify-between overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-800",
                "py-4 "
              )}
            >
              <NavigationMenuList className="w-[300px] flex-col items-start gap-2 px-1">
                <NavigationMenuItem className="ml-1 w-full flex-row flex justify-between items-end">
                  <NavigationMenuLink asChild className="mb-10">
                    <a href="#" className="group flex w-fit items-center rounded-lg p-2 text-gray-900 dark:text-white">
                      <span className="ms-3 cursor-pointer">BrandIcon</span>
                    </a>
                  </NavigationMenuLink>
                  <ChevronsLeft
                    className="size-7 cursor-pointer rounded-md bg-gray-50 transition-all hover:w-12 hover:bg-secondary dark:bg-gray-800"
                    onClick={() => setOpen(false)}
                  />
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <LayoutDashboard className=" stroke-[1.5]" />
                      <span className="ms-3">Overview</span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full ">
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <MonitorPlay className="stroke-[1.5]" />
                      <span className="ms-3 flex-1 whitespace-nowrap">New Video</span>
                      <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Pro
                      </span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <CreditCard className="stroke-[1.5]" />
                      <span className="ms-3 flex-1 whitespace-nowrap">Subscription</span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <Settings className="stroke-[1.5]" />
                      <span className="ms-3 flex-1 whitespace-nowrap">Settings</span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <BadgeHelp className="stroke-[1.5]" />
                      <span className="ms-3 flex-1 whitespace-nowrap">Help Center</span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
              <SubscriptionStatus
                plan="free"
                messages={[
                  {
                    free: "Unlock More Features!",
                    starter: "Go Pro and Maximize Your Productivity",
                  },
                ]}
              />
              <NavigationMenuList className="w-[300px] pl-2">
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className="group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <LogOut className="stroke-[1.5]" />
                    <span className="ms-3 flex-1 whitespace-nowrap">Log Out</span>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuList>
            </NavigationMenu>
          </m.aside>
        ) : null}
      </AnimatePresence>
    </>
  )
}
