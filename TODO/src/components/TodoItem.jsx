export const TodoItem = ({
  item,
  index,
  onEdit,
  onDelete,
  onChecked,
  isChecked,
}) => (
  <div style={{ display: "flex", justifyContent: "space-between" }} key={index}>
    <input
      type="checkbox"
      onChange={() => onChecked(index)}
      checked={isChecked[index] || false}
      aria-label={`Mark ${item} as completed`}
    />
    <span
      style={{
        textDecoration: isChecked[index] ? "line-through" : "none",
        color: isChecked[index] ? "gray" : "black",
        fontWeight: isChecked[index] ? "normal" : "bold",
      }}
    >
      {item}
    </span>
    <span style={{ cursor: "pointer" }}>
      <span
        onClick={() => onDelete(index)}
        aria-label={`Delete ${item}`}
        role="button"
        tabIndex={0}
      >
        🗑️
      </span>
      <span
        onClick={() => onEdit(index)}
        aria-label={`Edit ${item}`}
        role="button"
        tabIndex={0}
      >
        ✏️
      </span>
    </span>
  </div>
);
