interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export const TableOfContents = ({
  items,
  activeId,
}: {
  items: TableOfContentsItem[];
  activeId: string;
}) => {
  return (
    <div className="sticky top-24">
      <h3 className="text-lg font-bold mb-4">Contents</h3>
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm transition-colors ${
              activeId === item.id
                ? "text-primary font-medium"
                : "text-gray-400 hover:text-white"
            } ${item.level === 3 ? "pl-4" : ""}`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
};
