import React from 'react';

const Alert = ({ children, variant = "info", className = "" }) => {
  const variants = {
    info: {
      wrapper: "bg-blue-50",
      text: "text-blue-700"
    },
    warning: {
      wrapper: "bg-yellow-50",
      text: "text-yellow-700"
    },
    error: {
      wrapper: "bg-red-50",
      text: "text-red-700"
    },
    success: {
      wrapper: "bg-green-50",
      text: "text-green-700"
    }
  };

  const styles = variants[variant] || variants.info;

  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg ${styles.wrapper} ${className}`}>
      <div className={`text-sm ${styles.text}`}>
        {children}
      </div>
    </div>
  );
};

export default Alert;