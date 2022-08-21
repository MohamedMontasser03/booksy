import { Book } from "../../App";
import { getCoverImage } from "../../utils/image";
import { Star } from "tabler-icons-react";
import { useMemo } from "react";

type BookTileProps = {
  book: Book;
};

export const BookTile: React.FC<BookTileProps> = ({ book }) => {
  const authorsNames = useMemo(
    () => book.authors.map((author) => author.name).join(", "),
    [book.authors]
  );
  const stars = useMemo(() => Math.round(Math.random() * 5), [book]);
  return (
    <div className="flex flex-col">
      <div className="rounded-lg overflow-hidden">
        <img
          src={getCoverImage(book.id)}
          alt={book.title}
          className="w-[170px] h-[255px]"
        />
      </div>
      <div className="flex flex-col justify-between mt-3">
        <h3
          title={book.title}
          className="text-md font-semibold text-black line-clamp-1"
        >
          {book.title}
        </h3>
        <p
          title={authorsNames}
          className="text-sm font-medium text-neutral-400 line-clamp-1"
        >
          {authorsNames}
        </p>
        <div className="flex gap-1 mt-2">
          {new Array(5).fill(0).map((_, idx) => (
            <Star
              strokeWidth={0}
              fill={idx + 1 <= stars ? "#ffc107" : "#dadada"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
