import React, { useEffect, useRef, useState } from "react";

// How many items to reveal on each "page"
const PAGE_SIZE = 10;

// This component assumes the API returns the FULL list (no page / limit on server)
// and we only do "pagination" on the client by showing more items as we scroll.
export default function ClientSideInfiniteList() {
  // Full list returned by API (we fetch once)
  const [allItems, setAllItems] = useState([]);
  // How many items from allItems we currently show
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Just for the initial API call
  const [loading, setLoading] = useState(false);

  // Ref to the empty div at the bottom we will observe
  const sentinelRef = useRef(null);

  // 1) Fetch full list once on mount
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // Example API that returns full list (no page/limit on server)
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json(); // { users: [...] }

      setAllItems(data.users || []);
      setLoading(false);
    };

    load();
  }, []);

  // 2) Compute currently visible slice + "has more"
  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;

  // 3) IntersectionObserver: when sentinel is visible, increase visibleCount
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first && first.isIntersecting) {
        // Show next PAGE_SIZE items from the already-fetched list
        setVisibleCount((count) => count + PAGE_SIZE);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div className="page">
      <div className="container">
        <h1>Infinite Scroll (client-side list)</h1>

        {/* Render only the visible slice of the full list */}
        {visibleItems.map((user) => (
          <div className="row" key={user.id}>
            <p className="rowTitle">
              {user.firstName} {user.lastName}
            </p>
            <p className="rowBody">Age: {user.age}</p>
          </div>
        ))}

        {/* Simple status text so you can explain the states */}
        <div className="status">
          {loading && "Loading full list from API..."}
          {!loading && !hasMore && "End of list."}
          {!loading && hasMore && "Scroll to load more..."}
        </div>

        {/* Invisible target watched by IntersectionObserver */}
        <div className="sentinel" ref={sentinelRef} />
      </div>
    </div>
  );
}
