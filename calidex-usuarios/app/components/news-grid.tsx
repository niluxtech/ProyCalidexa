import NewCard from "./news-card";

interface News {
  id: string;
  image: string;
  date: string;
  title: string;
  description: string;
  slug: string;
}

interface NewCardGridProps {
  news: News[];
  columns?: 1 | 2 | 3 | 4;
}

export default function NewCardGrid({ news, columns = 3 }: NewCardGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}>
      {news.map((item) => (
        <NewCard
          key={item.id}
          id={item.id}
          image={item.image}
          date={item.date}
          title={item.title}
          description={item.description}
          slug={item.slug}
        />
      ))}
    </div>
  );
}
