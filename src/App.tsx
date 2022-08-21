import { Search } from "tabler-icons-react";

function App() {
  return (
    <div className="container mx-auto">
      <header className="flex items-center justify-between flex-wrap p-4">
        <h1 className="App text-xl font-semibold">Booksy</h1>
        <div className="w-1/2 relative">
          <input
            className="bg-gray-100 appearance-none rounded w-full py-2 px-3 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:font-medium"
            type="text"
            placeholder="Search by author, title, or name"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline">
            <Search size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between"></div>
      </header>
    </div>
  );
}

export default App;
