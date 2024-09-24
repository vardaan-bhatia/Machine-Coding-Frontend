const Counter = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>CLICK</button>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Counter />);
