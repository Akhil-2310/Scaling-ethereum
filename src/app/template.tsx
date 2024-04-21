"use client";

import { motion } from "framer-motion";
import React from "react";

interface ITemplate {
  children: React.ReactNode;
}

const Template: React.FC<ITemplate> = ({ children }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};
export default Template;
