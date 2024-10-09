import { Variants } from "framer-motion"

export const animationVariants: { [key: string]: Variants } = {
  xMotion: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30, transition: { type: "tween" } },
  },
  yMotion: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30, transition: { type: "tween" } },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } },
    exit: { opacity: 0, scale: 0.8, transition: { type: "tween" } },
  },
  // modal
  scaleFromTop: {
    initial: {
      opacity: 0,
      scaleY: 0.2,
      originY: 0,
      transition: {
        when: "afterChildren",
      },
    },
    animate: {
      opacity: 1,
      scaleY: 1,
      transition: {
        type: "tween",
        duration: 0.15,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.15,
      },
    },
    exit: { opacity: 0, scaleY: 0.5, transition: { type: "tween" } },
  },
  // nav
  itemXmotion: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30, transition: { type: "tween" } },
  },
  // pagination
  xIncrease: {
    initial: { opacity: 0, x: -30, scale: 0.3 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { type: "tween" } },
    exit: { opacity: 0, x: 30, scale: 0.3, transition: { type: "tween" } },
  },
  xDecrease: {
    initial: { opacity: 0, x: 30, scale: 0.3 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { type: "tween" } },
    exit: { opacity: 0, x: -30, scale: 0.3, transition: { type: "tween" } },
  },
  xSubtractNoScale: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { type: "tween" } },
    exit: { opacity: 0, x: 30, transition: { type: "tween" } },
  },
  xAddNoScale: {
    initial: { x: 40 },
    animate: { x: 0, transition: { type: "tween" } },
    exit: { x: -40, transition: { type: "tween" } },
  },
  xAdd: {
    initial: { opacity: 0, x: 30, scale: 0.3 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { type: "tween" } },
    exit: { x: -40, transition: { type: "tween" } },
  },
  // sideBar
  sidebar: {
    initial: { x: -300 },
    animate: { x: 0, transition: { type: "tween", duration: 0.1 } },
    exit: { x: -300, transition: { type: "tween", duration: 0.1 } },
  }
}
