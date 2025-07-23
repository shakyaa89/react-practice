import UsersList from "../components/UsersList";

const AboutUsPage = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-black-700">
        About Us
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Welcome to our React Practice App! This project is designed to help
        users learn and practice modern web development with React, TypeScript,
        Express, MongoDB and Node.js.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800"> Mission</h2>
      <p className="text-gray-700 mb-6">
        The mission is to create a simple, hands-on environment for learning
        full-stack development. This app is a playground for experimenting with
        user authentication, CRUD operations, and more.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">The Team</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Developer: Shashwat Shakya</li>
      </ul>
      <p className="text-gray-600 text-center">
        Thank you for visiting our app. Happy coding!
      </p>
    </div>
  );
};

export default AboutUsPage;
