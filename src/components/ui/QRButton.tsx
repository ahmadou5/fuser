import React, { useState, useEffect, useRef } from "react";
import { QrCodeIcon, ChevronDown, X, Download } from "lucide-react";
import { useMediaQuery } from "@/hook/useMediaQuery";
import StyledQRCode from "./QrCode";
import { useToast } from "@/providers/ToastProvider"; // <-- Import the Toast Hook

// Types
interface DownloadLink {
  label: string;
  url: string;
  icon?: React.ReactNode;
}

interface QRButtonProps {
  buttonText?: string;
  qrTitle?: string;
  qrSubtitle?: string;
  qrCodeUrl: string;

  onButtonClick?: () => void;
  buttonClassName?: string;
  position?: "top" | "bottom" | "left" | "right";
  shine?: boolean;
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
  downloadLinks?: DownloadLink[];
  mobileBreakpoint?: number;
}

// Component
const QRButton: React.FC<QRButtonProps> = ({
  buttonText = "Download app",
  qrTitle = "Scan to download APK",
  qrSubtitle = "Download APK",
  qrCodeUrl,
  onButtonClick,
  buttonClassName = "",
  position = "top",
  shine = false,
  variant = "default",
  downloadLinks = [],
  mobileBreakpoint = 768,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const { addToast, updateToast } = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isQRModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isQRModalOpen]);

  const handleApkDownload = async (apkUrl: string) => {
    const toastId = addToast("Starting APK download...");

    //const urlParts = apkUrl.split("/");
    const filename = "InFuseWallet.apk";

    try {
      // Strategy 1: Try direct download first (works if CORS headers are present)
      try {
        const response = await fetch(apkUrl, {
          mode: "cors",
          credentials: "omit", // Don't send credentials for cross-origin
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentLength = response.headers.get("content-length");
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        if (!response.body) {
          throw new Error("ReadableStream not supported");
        }

        // Stream with progress
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let loaded = 0;

        updateToast(toastId, { message: `Downloading ${filename}...` });

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          loaded += value.length;

          // Update progress (or indeterminate if total unknown)
          if (total > 0) {
            const progress = Math.round((loaded / total) * 100);
            updateToast(toastId, {
              progress,
              message: `Downloading ${filename} (${progress}%)`,
            });
          } else {
            // Indeterminate progress (no content-length header)
            updateToast(toastId, {
              message: `Downloading ${filename} (${(
                loaded /
                1024 /
                1024
              ).toFixed(1)}MB)`,
            });
          }
        }

        // ===== MERGE CHUNKS (Browser-compatible way) =====
        const totalLength = chunks.reduce(
          (acc, chunk) => acc + chunk.length,
          0
        );
        const mergedArray = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
          mergedArray.set(chunk, offset);
          offset += chunk.length;
        }

        // Create blob and download
        const blob = new Blob([mergedArray], {
          type: "application/vnd.android.package-archive",
        });

        const downloadUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(downloadUrl);

        updateToast(toastId, {
          status: "success",
          message: `${filename} downloaded successfully!`,
        });
      } catch (fetchError) {
        console.warn(
          "Direct fetch failed, trying fallback method...",
          fetchError
        );

        // Strategy 2: Fallback to simple link click (browser handles download)
        // This works even with CORS issues because browser handles it directly
        updateToast(toastId, {
          message: `Initiating download via browser...`,
        });

        const a = document.createElement("a");
        a.href = apkUrl;
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Can't track progress with this method, so just show success after initiating
        setTimeout(() => {
          updateToast(toastId, {
            status: "success",
            message: `Download initiated for ${filename}`,
          });
        }, 500);
      }
    } catch (error) {
      console.error("Download failed:", error);
      updateToast(toastId, {
        status: "error",
        message: `Download failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }

    setIsDropdownOpen(false);
    setIsQRModalOpen(false);
  };
  const handleButtonClick = () => {
    if (isMobile) {
      setIsDropdownOpen(!isDropdownOpen);
    }
    if (onButtonClick) {
      onButtonClick();
    }
  };

  const handleLinkClick = (url: string, isApk: boolean) => {
    if (isApk) {
      // Assume the first link is the main APK download if using this logic
      handleApkDownload(url);
    } else {
      // Existing behavior for non-APK links (e.g., App Store, Play Store)
      window.open(url, "_blank");
      setIsDropdownOpen(false);
    }
  };

  const handleShowQR = () => {
    setIsQRModalOpen(true);
    setIsDropdownOpen(false);
  };

  // Position styles for the QR card
  const positionStyles = {
    top: "bottom-full mb-4 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-4 left-1/2 -translate-x-1/2",
    left: "right-full mr-4 top-1/2 -translate-y-1/2",
    right: "left-full ml-4 top-1/2 -translate-y-1/2",
  };

  // Variant styles
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  // Shine effect colors based on variant
  const getShineColor = () => {
    switch (variant) {
      case "primary":
        return "via-primary-foreground/80";
      case "secondary":
        return "via-secondary-foreground/80";
      case "outline":
        return "via-accent-foreground/80";
      case "ghost":
        return "via-accent-foreground/80";
      default:
        return "via-primary-foreground/80";
    }
  };

  return (
    <>
      <div
        ref={dropdownRef}
        className="relative inline-block"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {/* Button */}
        <button
          onClick={handleButtonClick}
          className={`
          group relative overflow-hidden
          flex items-center gap-2 px-8 py-3 
          ${variantStyles[variant]}
          rounded-lg 
          transition-all duration-100 
          text-sm font-medium
          active:scale-95
          ${buttonClassName}
        `}
        >
          {buttonText}
          {isMobile ? (
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          ) : (
            <QrCodeIcon size={18} />
          )}

          {/* Shine Effect */}
          {shine && (
            <span
              className={`
              hidden group-hover:block 
              absolute w-[100px] h-full 
              bg-gradient-to-r from-transparent to-transparent
              ${getShineColor()}
              top-0 left-[-100px] 
              opacity-60 animate-shine
            `}
            />
          )}
        </button>

        {/* Desktop: QR Code Hover Tooltip */}
        {!isMobile && isHovered && (
          <div
            className={`
            absolute ${positionStyles[position]} 
            z-50 w-64 bg-popover rounded-lg shadow-2xl 
            p-6 border border-border
            animate-fade-in
          `}
          >
            {/* Arrow/Pointer */}
            <div
              className={`
              absolute w-4 h-4 bg-popover border-border rotate-45
              ${
                position === "top"
                  ? "bottom-[-8px] left-1/2 -translate-x-1/2 border-b border-r"
                  : ""
              }
              ${
                position === "bottom"
                  ? "top-[-8px] left-1/2 -translate-x-1/2 border-t border-l"
                  : ""
              }
              ${
                position === "left"
                  ? "right-[-8px] top-1/2 -translate-y-1/2 border-t border-r"
                  : ""
              }
              ${
                position === "right"
                  ? "left-[-8px] top-1/2 -translate-y-1/2 border-b border-l"
                  : ""
              }
            `}
            />

            {/* Title */}
            <h3 className="text-foreground text-sm font-medium text-center mb-3">
              {qrTitle}
            </h3>

            {/* QR Code */}
            <div className="bg-white/5 p-4 rounded-lg mb-3">
              <StyledQRCode data={qrCodeUrl} size={170} />
            </div>

            {/* Subtitle */}
            <p className="text-muted-foreground text-xs text-center">
              {qrSubtitle}
            </p>
          </div>
        )}

        {/* Mobile: Dropdown Menu */}
        {isMobile && isDropdownOpen && (
          <div
            className="absolute top-full mt-2 left-0 w-full min-w-[200px] bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden animate-dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Show QR Option */}
            <button
              onClick={handleShowQR}
              className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center gap-3 text-sm"
            >
              <QrCodeIcon size={18} />
              <span>Show QR Code</span>
            </button>

            {/* Divider if there are download links */}
            {downloadLinks.length > 0 && (
              <div className="border-t border-border" />
            )}

            {/* Download Links */}
            {downloadLinks.map((link, index) => (
              <button
                key={index}
                onClick={() =>
                  handleLinkClick(
                    link.url,
                    link.label.toLowerCase().includes("apk") ||
                      link.icon === <Download size={18} />
                  )
                }
                className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center gap-3 text-sm"
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile: QR Code Modal */}
      {isMobile && isQRModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in">
          <div className="relative bg-popover rounded-2xl p-8 max-w-sm w-[90%] mx-4 animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setIsQRModalOpen(false)}
              className="absolute top-4 right-4 p-2 py-4 px-3 hover:bg-accent rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            {/* Title */}
            <h3 className="text-foreground text-lg font-semibold text-center mb-6">
              {qrTitle}
            </h3>

            {/* QR Code */}
            <div className="bg-white/5 p-6 rounded-xl mb-4">
              <StyledQRCode data={qrCodeUrl} size={240} />
            </div>

            {/* Subtitle */}
            <p className="text-muted-foreground text-sm text-center">
              {qrSubtitle}
            </p>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes shine {
          0% {
            left: -100px;
          }
          100% {
            left: 100%;
          }
        }
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
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-shine {
          animation: shine 0.6s ease-in-out;
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default QRButton;
