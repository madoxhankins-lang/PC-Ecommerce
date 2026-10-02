interface QuantityControlProps {
  value: number;
  min?: number;
  max: number;
  label: string;
  onChange: (quantity: number) => void;
}

function QuantityControl({ value, min = 1, max, label, onChange }: QuantityControlProps) {
  const updateValue = (nextValue: number) => {
    if (Number.isInteger(nextValue) && nextValue >= min && nextValue <= max) {
      onChange(nextValue);
    }
  };

  return (
    <div className="inline-flex items-center rounded border border-white/15" role="group" aria-label={label}>
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= min}
        onClick={() => updateValue(value - 1)}
        className="px-3 py-2 text-zinc-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        -
      </button>
      <input
        type="number"
        aria-label={label}
        min={min}
        max={max}
        value={value}
        onChange={(event) => updateValue(Number(event.currentTarget.value))}
        className="w-12 bg-transparent text-center text-sm text-white outline-none"
      />
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= max}
        onClick={() => updateValue(value + 1)}
        className="px-3 py-2 text-zinc-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;