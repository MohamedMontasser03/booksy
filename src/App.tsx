import { Banner } from "./components/banner/Banner";
import { Header } from "./components/header/Header";
import { Nav } from "./components/nav/Nav";
import { useQuery } from "@tanstack/react-query";
import { getCoverImage } from "./utils/image";
import { BookTile } from "./components/book-tile/BookTile";

type Person = {
  birth_year: number | null;
  death_year: number | null;
  name: string;
};

export type Book = {
  id: number;
  title: string;
  subjects: string[];
  authors: Person[];
  translators: Person[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
};

type Response = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
};

function App() {
  const { data, isLoading } = useQuery(["allBooks"], () =>
    fetch("https://gutendex.com/books/?page=1").then<Response>((res) =>
      res.json()
    )
  );

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto">
      <Header />
      <Nav activePage="home" />
      <main className="mt-8">
        <section>
          <Banner bgImage="banners/libarary.png" alt="library">
            <div className="flex flex-col w-fit gap-6">
              <h2 className="text-5xl font-semibold text-blue-800">
                Build your library
              </h2>
              <p className="text-lg font-medium text-neutral-400 w-4/5">
                Buy two selected books and get one | free
              </p>
              <button className="bg-red-300 hover:bg-red-400 transition-colors w-fit text-white rounded-lg px-5 py-2">
                View all
              </button>
            </div>
          </Banner>
        </section>
        <section className="m-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-black">Popular Now</h2>
            <a
              href="#"
              className="text-neutral-400 transition-colors hover:text-blue-800"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-6 gap-10 mt-6">
            {data?.results.map((book) => (
              <BookTile key={book.id} book={book} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
