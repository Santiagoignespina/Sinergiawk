// Mockup abstracto de UI (sin datos ni nombres reales) para ilustrar cada sistema.
export default function SystemMock({ variant = "chart" }: { variant?: string }) {
  return (
    <div className="w-full h-full bg-[#0d0d0d] p-3 flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-[#FF4D00]/60" />
      </div>
      <div className="flex-1 min-h-0">{render(variant)}</div>
    </div>
  );
}

function render(variant: string) {
  switch (variant) {
    case "table":
      return (
        <div className="h-full flex flex-col gap-1.5 pt-1">
          <div className="h-2 w-1/3 bg-[#FF4D00]/50 rounded mb-1" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-white/10 rounded" />
              <div className="h-1.5 w-10 bg-white/10 rounded" />
              <div className="h-1.5 w-6 bg-white/[0.18] rounded" />
            </div>
          ))}
        </div>
      );
    case "kanban":
      return (
        <div className="h-full grid grid-cols-3 gap-2 pt-1">
          {[0, 1, 2].map((c) => (
            <div key={c} className="bg-white/[0.03] rounded p-1.5 flex flex-col gap-1.5">
              <div
                className="h-1.5 w-2/3 rounded"
                style={{ background: c === 1 ? "#FF4D00" : "rgba(255,255,255,0.22)" }}
              />
              {Array.from({ length: c === 1 ? 3 : 2 }).map((_, i) => (
                <div key={i} className="h-5 bg-white/[0.06] border border-white/10 rounded" />
              ))}
            </div>
          ))}
        </div>
      );
    case "grid":
      return (
        <div className="h-full grid grid-cols-3 grid-rows-2 gap-1.5 pt-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white/[0.06] rounded flex flex-col justify-end p-1">
              <div
                className="h-1 w-2/3 rounded"
                style={{ background: i === 0 ? "#FF4D00" : "rgba(255,255,255,0.18)" }}
              />
            </div>
          ))}
        </div>
      );
    case "chart":
    default:
      return (
        <div className="h-full flex flex-col gap-2 pt-1">
          <div className="h-2 w-1/4 bg-[#FF4D00]/50 rounded" />
          <div className="flex-1 flex items-end gap-1.5 pb-1">
            {[45, 70, 55, 85, 60, 95, 72].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{ height: `${h}%`, background: i === 5 ? "#FF4D00" : "rgba(255,255,255,0.12)" }}
              />
            ))}
          </div>
        </div>
      );
  }
}
