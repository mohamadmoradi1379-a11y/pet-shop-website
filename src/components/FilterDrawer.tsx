"use client";
import { X, ChevronDown } from "lucide-react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    onlyAvailable: boolean;
    amazingOnly: boolean;
    freeShipping: boolean;
  };
  setFilters: (filters: any) => void;
}

export default function FilterDrawer({ isOpen, onClose, filters, setFilters }: FilterDrawerProps) {
  if (!isOpen) return null;

  const activeFiltersCount = [filters.onlyAvailable, filters.amazingOnly, filters.freeShipping].filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-[90] bg-black/25">
      <div className="absolute inset-0 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#f0f0f1] bg-white shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={onClose}>
              <X className="w-6 h-6 text-[#3d4152]" />
            </button>
            <span className="text-[16px] font-black text-[#3d4152]">فیلترها</span>
          </div>
          <button
            onClick={() => setFilters({ onlyAvailable: false, amazingOnly: false, freeShipping: false })}
            className="text-[12px] font-bold text-[#19bfd3]"
          >
            حذف همه فیلترها
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-32 flex flex-col gap-6">
          {/* Toggle Switches */}
          <div className="flex flex-col gap-4">
            <FilterToggle
              label="فقط کالاهای موجود"
              active={filters.onlyAvailable}
              onChange={(val) => setFilters({ ...filters, onlyAvailable: val })}
            />
            <FilterToggle
              label="فقط کالاهای شگفت‌انگیز"
              active={filters.amazingOnly}
              onChange={(val) => setFilters({ ...filters, amazingOnly: val })}
            />
            <FilterToggle
              label="فقط کالاهای با ارسال رایگان"
              active={filters.freeShipping}
              onChange={(val) => setFilters({ ...filters, freeShipping: val })}
            />
          </div>

          {/* Accordion Sections */}
          <div className="flex flex-col border-t border-[#f0f0f1]">
            <FilterAccordion label="برند" />
            <FilterAccordion label="محدوده قیمت" />
            <FilterAccordion label="نوع حیوان" />
            <FilterAccordion label="سن حیوان" />
          </div>
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 bg-white border-t border-[#f0f0f1] p-4 shrink-0"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
        >
          <button
            onClick={onClose}
            className="w-full bg-[#ef4056] text-white py-3 rounded-xl font-black text-[14px] shadow-lg shadow-[#ef4056]/20"
          >
            مشاهده {activeFiltersCount > 0 ? `${activeFiltersCount} فیلتر و ` : ""}نتایج
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterToggle({ label, active, onChange }: { label: string; active: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[13px] text-[#3d4152] font-medium">{label}</span>
      <button 
        onClick={() => onChange(!active)}
        className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-[#ef4056]' : 'bg-[#e0e0e2]'}`}
      >
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'right-6' : 'right-1'}`} />
      </button>
    </div>
  );
}

function FilterAccordion({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-[#f0f0f1] cursor-pointer">
      <span className="text-[14px] text-[#3d4152] font-bold">{label}</span>
      <ChevronDown className="w-5 h-5 text-[#81858b]" />
    </div>
  );
}
