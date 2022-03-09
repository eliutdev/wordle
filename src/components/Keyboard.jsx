const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
];

export default Keyboard = ({ onClick, colors }) => {
  return (
    <div
      style={{
        maxWidth: "32rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "0.5rem",
        margin: "0 auto",
      }}
    >
      {KEYS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${rowIndex == 2 ? 9 : 10}, 1fr)`,
          }}
        >
          {row.map((key, keyIndex) => (
            <button
              onClick={() => onClick(key)}
              key={keyIndex}
              style={{
                textAlign: "center",
                fontWeight: "bold",
                height: "2.75rem",
                borderRadius: "0.25rem",
                fontSize: "1.05rem",
                lineHeight: "1.25rem",
                margin: "0.33rem",
                padding: "0.33rem",
                cursor: "pointer",
                border: "none",
                backgroundColor: colors.find((color) => color.key === key)
                  ?.color,
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
