// src/components/layout/PageContainer.jsx
const PageContainer = ({ children, className }) => {
  return (
    <main className={`max-w-7xl mx-auto px-4 py-8 ${className || ""}`}>
      {children}
    </main>
  );
};

export default PageContainer;
