import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      {/* Header */}
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Welcome to NoteNest
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          A simple and smart way to organize your ideas, tasks, and reminders.
        </p>
        
      </div>

      {/* Illustration */}
      <div className="max-w-md mx-auto mt-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3771/3771374.png"
          alt="Notes Illustration"
          className="w-40 mx-auto"
        />
      </div>

      {/* Features */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {/* Feature 1 */}
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Organize"
            className="w-10 mx-auto mb-2"
          />
          <h3 className="text-sm font-semibold text-gray-700">Organize</h3>
          <p className="text-xs text-gray-500 mt-1">
            Categorize and color your notes for easy tracking.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
            alt="Collaborate"
            className="w-10 mx-auto mb-2"
          />
          <h3 className="text-sm font-semibold text-gray-700">Collaborate</h3>
          <p className="text-xs text-gray-500 mt-1">
            Share notes and to-do lists with your friends or team.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3262/3262798.png"
            alt="Reminders"
            className="w-10 mx-auto mb-2"
          />
          <h3 className="text-sm font-semibold text-gray-700">Reminders</h3>
          <p className="text-xs text-gray-500 mt-1">
            Set quick reminders to never miss a task or thought.
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default HomePage;