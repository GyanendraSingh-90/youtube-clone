export default function Header({ search, setSearch }) {
  const username = localStorage.getItem("username");

  return (
    <header className="header">
      <h2>YouTube Clone</h2>

      <input
        className="search-input"
        placeholder="Search videos..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {username ? <span>Hello, {username}</span> : <span>Sign In</span>}
    </header>
  );
}
