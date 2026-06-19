export default function KineticText({ as: Tag = "span", text, className = "", chunk = "word" }) {
  const parts = chunk === "char" ? Array.from(text) : text.split(" ");

  return (
    <Tag className={`kinetic-text ${className}`} aria-label={text}>
      {parts.map((part, index) => {
        const content = part === " " ? "\u00A0" : part;
        return (
          <span
            key={`${part}-${index}`}
            className={chunk === "char" ? "kinetic-char" : "kinetic-word"}
            style={{ "--k": index }}
            aria-hidden="true"
          >
            {content}
            {chunk === "word" && index < parts.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}
