

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo / Brand */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400">NoteNest</h2>
            <p className="mt-2 text-gray-400 text-sm">
              Your secure and simple note-keeping app.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
              <li><a href="/register" className="hover:text-white">Register</a></li>
              
            </ul>
          </div>

          {/* Contact / Social (Optional) */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400 text-sm">
              Email: support@notenest.com <br />
              Phone: +91-0000000000
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} NoteNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
