export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Todo App</h1>
        <p className="text-xl text-secondary mb-8">Task management with authentication</p>
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="inline-block bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  )
}
