'use client';

import { useState } from 'react';
import { haptic } from '@/lib/haptics';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const formatDateDisplay = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleApply = () => {
    haptic('light');
    if (new Date(tempStartDate) <= new Date(tempEndDate)) {
      onDateChange(tempStartDate, tempEndDate);
      setIsOpen(false);
    } else {
      alert('Start date must be before end date');
    }
  };

  const handleQuickSelect = (days: number) => {
    haptic('light');
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    const endStr = end.toISOString().split('T')[0];
    const startStr = start.toISOString().split('T')[0];
    
    setTempStartDate(startStr);
    setTempEndDate(endStr);
    onDateChange(startStr, endStr);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => {
          haptic('light');
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-ws-gray-300 rounded-xl text-sm font-medium hover:border-ws-coral transition-colors"
      >
        <span>📅</span>
        <span>
          {formatDateDisplay(startDate)} - {formatDateDisplay(endDate)}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Picker Content */}
          <div className="absolute top-full mt-2 right-0 z-50 bg-white rounded-2xl shadow-ws-lg border border-ws-gray-300 p-4 w-80">
            {/* Quick Select */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-ws-gray-500 uppercase mb-2">
                Quick Select
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleQuickSelect(7)}
                  className="chip chip-inactive text-xs"
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => handleQuickSelect(30)}
                  className="chip chip-inactive text-xs"
                >
                  Last 30 Days
                </button>
                <button
                  onClick={() => handleQuickSelect(90)}
                  className="chip chip-inactive text-xs"
                >
                  Last 90 Days
                </button>
              </div>
            </div>

            {/* Custom Range */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-ws-gray-500 uppercase mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-ws-gray-300 rounded-xl text-sm focus:border-ws-coral focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ws-gray-500 uppercase mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => setTempEndDate(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-ws-gray-300 rounded-xl text-sm focus:border-ws-coral focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  haptic('light');
                  setIsOpen(false);
                  setTempStartDate(startDate);
                  setTempEndDate(endDate);
                }}
                className="flex-1 px-4 py-2 bg-ws-gray-100 text-ws-gray-900 font-semibold rounded-xl text-sm hover:bg-ws-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-4 py-2 bg-ws-coral text-white font-semibold rounded-xl text-sm hover:bg-ws-coral-dark transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

