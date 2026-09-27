interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  bgColor?: string;
  height?: string;
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color = "bg-emerald-500",
  bgColor = "bg-gray-100",
  height = "h-2",
  showLabel = false,
  label,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      <div
        className={`w-full ${bgColor} ${height} rounded-full overflow-hidden`}
      >
        <div
          className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-gray-500">{label}</span>
          <span className="text-xs font-medium text-gray-700">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
}
