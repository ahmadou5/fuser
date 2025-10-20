"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface AppVersion {
  id: string;
  version: string;
  label?: string;
  downloadUrl: string;
  releaseDate?: string;
  isStable?: boolean;
  changelog?: string;
}

interface VersionSwitcherProps {
  versions: AppVersion[];
  defaultVersion?: string;
  onVersionChange?: (version: AppVersion) => void;
  className?: string;
  compact?: boolean;
}
export const VersionSwitcher: React.FC<VersionSwitcherProps> = ({
  versions,
  defaultVersion,
  onVersionChange,
  className = "",
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<AppVersion>(
    versions.find((v) => v.id === defaultVersion) || versions[0]
  );

  //const mobileBreakpoint = 768;
  //const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);

  const handleSelect = (version: AppVersion) => {
    setSelectedVersion(version);
    setIsOpen(false);
    if (onVersionChange) {
      onVersionChange(version);
    }
  };

  const getBadgeColor = (version: AppVersion) => {
    if (version.isStable) return "bg-green-100 text-green-700 border-green-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  const getBadgeLabel = (version: AppVersion) => {
    if (version.label) return version.label;
    if (version.isStable) return "Stable";
    return "Beta";
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between gap-3 
          ${compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"}
          bg-white border border-gray-200 rounded-lg
          hover:bg-gray-50 hover:border-gray-300
          transition-all duration-200
          shadow-sm hover:shadow
          min-w-[140px]
        `}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">
            v{selectedVersion.version}
          </span>
          {!compact && (
            <span
              className={`
              px-2 py-0.5 text-[10px] font-medium rounded-full border
              ${getBadgeColor(selectedVersion)}
            `}
            >
              {getBadgeLabel(selectedVersion)}
            </span>
          )}
        </div>
        <ChevronDown
          size={compact ? 14 : 16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            className="
              absolute top-full mt-2 left-0 
              w-full min-w-[280px] max-w-[320px]
              bg-white border border-gray-200 rounded-lg shadow-xl
              z-50 overflow-hidden
              animate-dropdown
            "
          >
            <div className="py-1 max-h-[300px] overflow-y-auto">
              {versions.map((version) => {
                const isSelected = version.id === selectedVersion.id;
                return (
                  <button
                    key={version.id}
                    onClick={() => handleSelect(version)}
                    className={`
                      w-full px-4 py-3 text-left
                      hover:bg-gray-50 transition-colors
                      flex items-start gap-3
                      ${isSelected ? "bg-blue-50" : ""}
                    `}
                  >
                    {/* Checkmark */}
                    <div className="flex-shrink-0 mt-0.5">
                      {isSelected ? (
                        <Check size={16} className="text-blue-600" />
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                    </div>

                    {/* Version Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          v{version.version}
                        </span>
                        <span
                          className={`
                            px-2 py-0.5 text-[10px] font-medium rounded-full border
                            ${getBadgeColor(version)}
                          `}
                        >
                          {getBadgeLabel(version)}
                        </span>
                      </div>

                      {version.releaseDate && (
                        <p className="text-xs text-gray-500 mb-1">
                          Released: {version.releaseDate}
                        </p>
                      )}

                      {version.changelog && (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {version.changelog}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};
