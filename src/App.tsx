import { Banner } from "./components/banner/Banner";
import { Header } from "./components/header/Header";
import { Nav } from "./components/nav/Nav";

function App() {
  return (
    <div className="container mx-auto">
      <Header />
      <Nav activePage="home" />
      <main className="mt-8">
        <section>
          <Banner bgImage="../public/banners/libarary.png" alt="library">
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
      </main>
    </div>
  );
}

export default App;
