import NewsCard from "./news-home";


interface News {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  image: string;
  slug: string;
}

interface NewsGridProps {
  news: News[];
  columns?: 1 | 2 | 3;
}

export default function NewsGrid({ news, columns = 3 }: NewsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}>
      {news.map((item) => (
        <NewsCard
          key={item.id}
          id={item.id}
          title={item.title}
          date={item.date}
          category={item.category}
          author={item.author}
          image={item.image}
          slug={item.slug}
        />
      ))}
    </div>
  );
}