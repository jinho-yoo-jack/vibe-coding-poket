import { STAT_COLORS, STAT_KOREAN } from '../utils/pokemon'

export default function StatBar({ name, value }) {
  const percentage = Math.min((value / 255) * 100, 100)

  return (
    <div className="flex items-center gap-4">
      <span className="text-slate-400 text-sm w-24 text-right">
        {STAT_KOREAN[name] || name}
      </span>
      <span className="text-white font-bold w-12 text-right">{value}</span>
      <div className="flex-1 bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className={`stat-bar ${STAT_COLORS[name] || 'from-gray-400 to-gray-600'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}