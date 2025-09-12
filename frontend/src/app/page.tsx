export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
      <section className="text-center px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-4">
          Welcome to Fashion Installngo
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Manage your academy, courses, inventory, and business all in one place.  
          The future of fashion business management starts here.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      <footer className="absolute bottom-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Installngo. All rights reserved.
      </footer>
    </main>
  );
}