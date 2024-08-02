const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Something Went Wrong</h2>
        <p className="mt-2 text-center text-gray-600">
          We are working on it. Please refresh the page.
        </p>
        <div className="mt-4 text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
