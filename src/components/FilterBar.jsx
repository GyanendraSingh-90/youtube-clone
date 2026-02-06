export default function FilterBar({ setCategory }) {
  const categories = [
    "All",
    "React",
    "Node",
    "MongoDB",
    "JavaScript",
    "CSS"
  ];

  return (
    <div style={{ display: "flex", gap: 10 }}>
      {categories.map(cat => (
        <button key={cat} onClick={() => setCategory(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}
