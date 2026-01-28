import React from "react";
import PaginatedInfiniteList from "./PaginatedInfiniteList";
// import ClientSideInfiniteList from "./ClientSideInfiniteList";

// App shows the paginated API version by default.
// For the "normal" full-list API version, use:
//   return <ClientSideInfiniteList />;
export default function App() {
  return <PaginatedInfiniteList />;
}
