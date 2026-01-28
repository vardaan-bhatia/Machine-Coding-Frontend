import React, { useEffect, useRef, useState } from "react";

// Server-side paginated API: we pass page + limit to the backend.
const LIMIT = 10;

export default function PaginatedInfiniteList() {
  // Items loaded so far from the server
  const [posts, setPosts] = useState([]);
  // Current page number we are on
  const [page, setPage] = useState(1);
  // Are we currently fetching a page?
  const [loading, setLoading] = useState(false);
  // Do we still have more pages to load?
  const [hasMore, setHasMore] = useState(true);

  // Ref to the sentinel div at the bottom
  const sentinelRef = useRef(null);

  // 1) Call paginated API whenever "page" changes
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);

      // Example paginated API: page + limit as query params
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT}`,
      );
      const data = await res.json();

      // Append new page to the list
      setPosts((prev) => [...prev, ...data]);
      // If we got fewer than LIMIT items, we assume there are no more pages
      if (data.length < LIMIT) setHasMore(false);
      setLoading(false);
    };

    if (hasMore) fetchPage();
  }, [page, hasMore]);

  // 2) IntersectionObserver: when sentinel is visible, increase page
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first && first.isIntersecting) {
        // Ask for the next page
        setPage((p) => p + 1);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div className="page">
      <div className="container">
        <h1>Infinite Scroll (paginated API)</h1>
        <p className="status">Loaded {posts.length} posts</p>

        <div className="list" role="list">
          {posts.map((p) => (
            <div className="row" key={p.id} role="listitem">
              <p className="rowTitle">
                #{p.id}: {p.title}
              </p>
              <p className="rowBody">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="status">
          {loading && "Loading next page..."}
          {!loading && !hasMore && "End of list."}
          {!loading && hasMore && "Scroll to load more..."}
        </div>

        {/* Sentinel observed by IntersectionObserver */}
        <div className="sentinel" ref={sentinelRef} />
      </div>
    </div>
  );
}
