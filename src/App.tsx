import { Banner } from "./components/banner/Banner";
import { Header } from "./components/header/Header";
import { Nav } from "./components/nav/Nav";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BookTile } from "./components/book-tile/BookTile";
import { useCallback, useEffect, useRef } from "react";
import { useWindowScroll } from "./hooks/useWindowScroll";
import { Spinner } from "./components/spinner/Spinner";

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

  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage } =
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
      const threshold = booklistBox.height * 0.7;
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
      <main className="mt-4 sm:mt-8">
        <section className="hidden sm:block">
          <Banner bgImage="banners/libarary.png" alt="library">
            <div className="flex flex-col w-fit gap-1 md:gap-3 lg:gap-6">
              <h2 className="text-base md:text-xl lg:text-5xl font-semibold text-blue-800">
                Build your library
              </h2>
              <p className="text-sm md:text-base lg:text-lg font-medium text-neutral-400 w-4/5">
                Buy two selected books and get one for free
              </p>
              <button className="bg-red-300 hover:bg-red-400 transition-colors w-fit text-white rounded-lg px-3 py-1 text-sm md:text-base md:px-5 md:py-2">
                View all
              </button>
            </div>
          </Banner>
        </section>
        <section className="m-8">
          <div className="flex justify-between">
            <h2 className="text-base md:text-2xl font-semibold text-black">
              Popular Now
            </h2>
            <a
              href="#"
              className="text-xs md:text-base text-neutral-400 transition-colors hover:text-blue-800"
            >
              View All
            </a>
          </div>
          <div
            className="grid grid-cols-[repeat(auto-fill,_10rem)] justify-center sm:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10 mt-6"
            ref={booklistRef}
          >
            {data?.pages?.map((page) =>
              page.results
                .map((book) => <BookTile key={book.id} book={book} />)
                .map((book) => book)
            )}
          </div>

          <div className="flex justify-center items-center mt-5">
            <Spinner />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
