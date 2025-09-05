import { useEffect, useMemo, useState } from 'react';

const REMIX_ICONS = [
  'ri-star-fill','ri-star-line','ri-award-fill','ri-award-line','ri-trophy-fill','ri-trophy-line',
  'ri-team-fill','ri-team-line','ri-graduation-cap-fill','ri-graduation-cap-line','ri-building-4-fill','ri-building-4-line',
  'ri-book-open-fill','ri-book-open-line','ri-briefcase-4-fill','ri-briefcase-4-line','ri-cpu-fill','ri-cpu-line',
  'ri-rocket-2-fill','ri-rocket-2-line','ri-global-fill','ri-global-line','ri-hand-heart-fill','ri-hand-heart-line',
  'ri-medal-fill','ri-medal-line','ri-lightbulb-flash-fill','ri-lightbulb-flash-line','ri-community-fill','ri-community-line',
  'ri-building-fill','ri-building-line','ri-user-star-fill','ri-user-star-line','ri-service-fill','ri-service-line'
];

export default function IconPicker({ open, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    if (!query) return REMIX_ICONS;
    return REMIX_ICONS.filter((i) => i.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold">Choose an icon</h4>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons..."
          className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3 max-h-80 overflow-auto">
          {filtered.map((icon) => (
            <button
              key={icon}
              onClick={() => { onSelect(icon); onClose(); }}
              className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 flex items-center justify-center"
              title={icon}
            >
              <i className={`${icon} text-2xl`}></i>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">No icons found</div>
          )}
        </div>
      </div>
    </div>
  );
}


