"use client"

import { CreditCard, LogOut, MonitorPlay, Origami, Settings, User } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { ButtonWrapper } from "components/button/button_v2"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu"
import { cn } from "../../lib/utils"
import { Hamburger } from "components/hamburger/hamburger"
import { AnimatePresence, m, Variants } from "framer-motion"
import { animationVariants } from "lib/animate"
import { NotificationIcon } from "components/notification/notifications"
import { AvatarWrapper } from "components/avatar/avatarWrapper"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "components/dropdown/dropdown-menu"

const templates: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export type TNavbar = {
  isLogged: boolean
  name: string | undefined
  email: string | undefined
  // this isOpen is used to control the modal of login
  isOpen: boolean
  handleSwitch: () => void
} & React.HTMLAttributes<HTMLDivElement>

export function Navbar({ handleSwitch, isOpen, isLogged, name, email, ...props }: TNavbar) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  return (
    <nav
      {...props}
      className={cn(
        "fixed top-0 mx-auto box-border block w-full bg-opacity-80 px-4 backdrop-blur-2xl backdrop-saturate-200 lg:px-8",
        "relative 2xl:px-36"
      )}
      style={{ zIndex: isOpen ? "-1" : "10" }}
    >
      <div className="text-blue-gray-900 mx-auto flex h-16 items-center justify-between lg:h-20">
        <span className="flex flex-row">
          <ButtonWrapper
            state={"prev"}
            size={"icon"}
            variant={"ghost"}
            className="z-20 hover:bg-transparent lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Hamburger isOpen={menuOpen} width={24} height={16} />
          </ButtonWrapper>
          <a
            href="/"
            className={cn(
              "dark:text-dark-on-surface mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
            )}
          >
            BrandIcon
          </a>
        </span>
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Origami className="size-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and paste into your apps. Accessible.
                          Customizable. Open Source.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <ListItem href="/docs" title="Introduction" key="Introduction">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </ListItem>
                  </li>
                  <li>
                    <ListItem href="/docs/installation" title="Installation" key="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                  </li>
                  <li>
                    <ListItem href="/docs/primitives/typography" title="Typography" key="Typography">
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {templates.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Support</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* the right part */}
        <div className="flex items-center justify-center gap-x-2 md:gap-x-2">
          {isLogged ? (
            <>
              <NotificationIcon num={2} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <AvatarWrapper isLocal={false} size={"md"} shape={"circular"} name={""} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <MonitorPlay className="mr-2 h-4 w-4" />
                      <span>Workspace</span>
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <ButtonWrapper
                variant={"secondary"}
                disabled={false}
                size={"default"}
                state={"prev"}
                className={cn(
                  "h-8 w-20 lg:h-10 lg:w-32 lg:px-6 lg:text-sm lg:font-medium",
                  "hidden transition-all sm:flex"
                )}
                onClick={handleSwitch}
              >
                Log In
              </ButtonWrapper>
              <ButtonWrapper
                variant={"default"}
                disabled={false}
                size={"default"}
                state={"prev"}
                className={cn("w-24 lg:h-10 lg:w-32 lg:px-6 lg:text-sm lg:font-medium", "hidden lg:flex")}
                onClick={handleSwitch}
              >
                Try For Free
              </ButtonWrapper>
            </>
          )}

          <NavigationMenu>
            <AnimatePresence>
              {menuOpen ? (
                <m.ul
                  variants={animationVariants["scaleFromTop"] as Variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={cn(
                    "fixed left-0 top-0 z-10 bg-secondary",
                    "flex h-screen w-full flex-col items-center justify-center gap-2"
                  )}
                >
                  <m.li
                    variants={animationVariants["itemXmotion"] as Variants}
                    transition={{ type: "tween" }}
                    className={cn("relative w-36 rounded-md py-1 text-center hover:cursor-pointer hover:bg-accent")}
                  >
                    <a className="text-lg ">Features</a>
                  </m.li>
                  <m.li
                    variants={animationVariants["itemXmotion"] as Variants}
                    transition={{ type: "tween" }}
                    className={cn("relative w-36 rounded-md py-1 text-center hover:cursor-pointer hover:bg-accent")}
                  >
                    <a className="text-lg">Templates</a>
                  </m.li>
                  <m.li
                    variants={animationVariants["itemXmotion"] as Variants}
                    transition={{ type: "tween" }}
                    className={cn("relative w-36 rounded-md py-1 text-center hover:cursor-pointer hover:bg-accent")}
                  >
                    <a className="text-lg">Pricing</a>
                  </m.li>
                  <m.li
                    variants={animationVariants["itemXmotion"] as Variants}
                    transition={{ type: "tween" }}
                    className={cn("relative w-36 rounded-md py-1 text-center hover:cursor-pointer hover:bg-accent")}
                  >
                    <a className="text-lg">Support</a>
                  </m.li>
                  <m.li variants={animationVariants["itemXmotion"] as Variants} transition={{ type: "tween" }}>
                    <ButtonWrapper
                      variant={"default"}
                      disabled={false}
                      size={"default"}
                      state={"prev"}
                      onClick={handleSwitch}
                      className="w-36"
                    >
                      Log In
                    </ButtonWrapper>
                  </m.li>
                </m.ul>
              ) : null}
            </AnimatePresence>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </>
    )
  }
)
ListItem.displayName = "ListItem"
