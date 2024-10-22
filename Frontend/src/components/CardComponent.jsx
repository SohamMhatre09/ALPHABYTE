import React from 'react';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };