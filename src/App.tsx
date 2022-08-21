import { Banner } from "./components/banner/Banner";
import { Header } from "./components/header/Header";
import { Nav } from "./components/nav/Nav";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BookTile } from "./components/book-tile/BookTile";
import { useCallback, useEffect, useRef } from "react";
import { useWindowScroll } from "./hooks/useWindowScroll";

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
  const booklistRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["allBooks"],
      (next) =>
        fetch(
          next.pageParam?.page ?? "https://gutendex.com/books/?page=1"
        ).then<Response>((res) => res.json()),
      {
        getNextPageParam: (lastPage) => ({ page: lastPage.next }),
      }
    );

  useWindowScroll(
    useCallback(() => {
      if (!booklistRef.current || isFetchingNextPage || isLoading) return;
      const booklistBox = booklistRef.current.getBoundingClientRect();
      const threshold = booklistBox.height * 0.6;
      const isReadyToFetch =
        booklistBox.top < 0 && -booklistBox.top > threshold;
      if (isReadyToFetch && data?.pages[data.pages.length - 1].next)
        fetchNextPage();
    }, [isLoading, isFetchingNextPage, data])
  );

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
                Buy two selected books and get one for free
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
          <div className="grid grid-cols-6 gap-10 mt-6" ref={booklistRef}>
            {data?.pages?.map((page) =>
              page.results
                .map((book) => <BookTile key={book.id} book={book} />)
                .map((book) => book)
            )}
          </div>
          {(isFetchingNextPage || isLoading) && (
            <div className="text-center mt-2">Loading...</div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
