interface DonutChartProps {
  data: { label: string; amount: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({
  data,
  size = 180,
  thickness = 28,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let offset = 0;
  const segments = data.map((d) => {
    const fraction = total > 0 ? d.amount / total : 0;
    const length = fraction * circumference;
    const segment = {
      color: d.color,
      dashArray: `${length} ${circumference - length}`,
      dashOffset: -offset,
    };
    offset += length;
    return segment;
  });

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={thickness}
        />
        {total > 0 &&
          segments.map((seg, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          ))}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && (
            <span className="text-xl font-bold text-gray-900">
              {centerValue}
            </span>
          )}
          {centerLabel && (
            <span className="text-xs text-gray-500 mt-0.5">{centerLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}

interface BarChartProps {
  data: { label: string; amount: number }[];
  height?: number;
  color?: string;
  formatValue?: (v: number) => string;
}

export function BarChart({
  data,
  height = 140,
  color = "#10b981",
  formatValue,
}: BarChartProps) {
  const max = Math.max(...data.map((d) => d.amount), 1);

  return (
    <div className="w-full">
      <div className="flex items-end gap-1.5" style={{ height }}>
        {data.map((d, i) => {
          const barHeight = (d.amount / max) * height;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end group relative"
              style={{ height: "100%" }}
            >
              <div
                className="w-full rounded-t-md transition-all duration-500 ease-out hover:opacity-80"
                style={{
                  height: `${Math.max(2, barHeight)}px`,
                  backgroundColor: color,
                  minHeight: d.amount > 0 ? "4px" : "2px",
                }}
              />
              <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none z-10">
                {formatValue ? formatValue(d.amount) : d.amount.toFixed(0)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[10px] text-gray-400">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
