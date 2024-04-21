interface I404 {}

const Custom404: React.FC<I404> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]  bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4 overflow-hidden">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 w-80">
          The page you are looking for does not exist. Maybe it does? It is zk
          who knows
        </p>
      </div>
    </div>
  );
};
export default Custom404;
