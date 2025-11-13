import CompanyCard from "./company-card";

interface Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  slug: string;
}

interface CompanyGridProps {
  companies: Company[];
  columns?: 1 | 2 | 3 | 4;
}

export default function CompanyGrid({
  companies,
  columns = 3,
}: CompanyGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}>
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          id={company.id}
          name={company.name}
          description={company.description}
          logo={company.logo}
          slug={company.slug}
        />
      ))}
    </div>
  );
}
