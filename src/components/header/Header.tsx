import { Search, Heart } from "tabler-icons-react";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between flex-wrap p-6">
      <h1 className="App text-xl font-semibold basis-0 grow">Booksy</h1>
      <div className="w-1/2 relative">
        <input
          className="bg-gray-100 appearance-none rounded w-full py-2 px-3 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:font-medium"
          type="text"
          placeholder="Search by author, title, or name"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 focus:outline-none focus:shadow-outline">
          <Search size={20} />
        </button>
      </div>
      <div className="flex items-center gap-5 basis-0 grow ml-auto justify-end">
        <a className="flex items-center hover:bg-gray-200 transition-colors justify-center rounded-full w-8 h-8 focus:outline-none focus:shadow-outline">
          <Heart size={20} />
        </a>
        <button className="flex items-center hover:bg-gray-200 transition-colors justify-center rounded-full w-8 h-8 focus:outline-none focus:shadow-outline">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360"
            width={40}
            height={40}
            alt="user"
          />
        </button>
        <button className="flex items-center hover:bg-gray-200 transition-colors justify-center rounded-full w-8 h-8 focus:outline-none focus:shadow-outline">
          <span className="font-semibold text-gray-500 opacity-80">EN</span>
        </button>
      </div>
    </header>
  );
};
