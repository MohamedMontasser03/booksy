export const getCoverImage = (bookId: number): string =>
  `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.cover.medium.jpg`;
