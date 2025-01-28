import React from "react";
import { motion } from "framer-motion";
import styles from "./Copy.module.css";

const Copy = () => {
  return (
    <motion.div
      className={styles.copy}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <i class="fa-solid fa-circle-check"></i>
      Link Copied
    </motion.div>
  );
};

export default Copy;