"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  hovered: boolean;
  setHovered: (hovered: boolean) => void;
}
const SidebarContext = React.createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  className,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen, hovered, setHovered }}>
      <motion.div
        animate={{
          width: open ? "20rem" : hovered ? "20rem" : "5rem",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative hidden md:flex h-screen flex-shrink-0 flex-col z-50 duration-200",
          className
        )}
      >
        {children}
      </motion.div>
      <div className="md:hidden">
         <AnimatePresence>
          {open && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={cn(
                  "fixed h-screen w-64 bg-background border-r inset-y-0 z-50",
                  className
                )}
              >
                  {children}
              </motion.div>
          )}
        </AnimatePresence>
        <div className="p-4 md:hidden fixed top-2 left-2 z-[100]">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full bg-card-foreground/10"
            >
                {open ? <IconX /> : <IconMenu2 />}
            </button>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <motion.div
      initial="closed"
      animate="open"
      variants={{
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.2 }}
      {...props}
      className={cn("flex flex-col h-full p-4", props.className)}
    ></motion.div>
  );
};

interface ISidebarLink {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarLink = ({ link, className, active, onClick }: ISidebarLink) => {
  const { open, hovered } = useSidebar();
  const isTextVisible = open || hovered;
  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        active && "text-primary",
        className
      )}
    >
      {link.icon}
      <AnimatePresence>
        {isTextVisible && (
          <motion.span
            initial={{ opacity: 0, x: -20, width: 0 }}
            animate={{
              opacity: 1,
              x: 0,
              width: "auto",
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              x: -20,
              width: 0,
              transition: {
                duration: 0.1,
                ease: "easeInOut",
              },
            }}
            className={cn("text-neutral-700 dark:text-neutral-200 text-sm whitespace-nowrap", active && "text-primary font-semibold")}
          >
            {link.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};
