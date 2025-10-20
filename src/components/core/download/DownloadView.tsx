"use client";
import { useState } from "react";
import {
  Download,
  Star,
  Share2,
  Lock,
  Users,
  Trash2,
  ChevronRight,
  ExternalLink,
  Award,
  Check,
} from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { appData } from "@/utils/itemList";
import { useToast } from "@/providers/ToastProvider";

interface DataSafetyItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string[];
}

interface review {
  name: string;
  rating: number;
  date: string;
  review: string;
  helpful: string;
  developerResponse: string;
}

const DownloadView = () => {
  const [activeTab, setActiveTab] = useState<"about" | "reviews" | "safety">(
    "about"
  );
  const { addToast, updateToast } = useToast();
  //const [showAllScreenshots, setShowAllScreenshots] = useState(false);

  const dataSafety: DataSafetyItem[] = [
    {
      icon: <Share2 className="w-5 h-5" />,
      title: "This app may share these data types with third parties",
      description: "Photos and videos and App info and performance",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "This app may collect these data types",
      description: "Personal info, Photos and videos and 4 others",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Data is encrypted in transit",
      description: "Your data is transferred over a secure connection",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      title: "Account deletion available",
      description: "You can request to delete collected data",
    },
  ];

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
  };

  const reviews: review[] = [
    {
      name: "4kmira",
      rating: 3,
      date: "September 25, 2025",
      review:
        "This app is the best. As a 16-17 year old,I can create an account. It's fast and reliable, no delays. A phone number can also be used as an account number, no stress, just ease made available at Ur fingertips. I'll definitely be using Moniepoint Personal Banking as long as it gets. The Savings account is cool and strict, made to control overspending. Online transactions are faster too. Keep up the gud work DEVS 😁😍",
      helpful: "2,202",
      developerResponse:
        "Hi Kelvin, We're thrilled to hear that you've had a seamless experience with Moniepoint. Thanks for the kind words and for trusting us.",
    },
    {
      name: "aaliyahJunaid",
      rating: 2,
      date: "September 17, 2025",
      review:
        "This app is the best. As a 16-17 year old,I can create an account. It's fast and reliable, no delays. A phone number can also be used as an account number, no stress, just ease made available at Ur fingertips. I'll definitely be using Moniepoint Personal Banking as long as it gets. The Savings account is cool and strict, made to control overspending. Online transactions are faster too. Keep up the gud work DEVS 😁😍",
      helpful: "2,202",
      developerResponse:
        "Hi aaliyah, We're thrilled to hear that you've had a seamless experience with inFuse Wallet. Thanks for the kind words and for trusting us.",
    },
  ];

  return (
    <div className="min-h-screen py-16 lg:py-28 text-white">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 " />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container px-4 mx-auto relative z-10"
        >
          {/* App Header - Mobile & Desktop */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* App Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 rounded-3xl  flex items-center justify-center text-4xl lg:hidden md:hidden font-bold shadow-2xl shadow-blue-600/30"
              >
                <Image
                  width={90}
                  height={90}
                  src={appData.icon}
                  alt={`${appData.name}-logo`}
                  className="w-[90%] h-[90%] "
                />
              </motion.div>

              {/* App Info */}
              <div className="flex-1 w-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl font-bold mb-2"
                >
                  <motion.h1>{appData.name}</motion.h1>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-blue-400 text-lg mb-4 hover:underline cursor-pointer"
                >
                  {appData.developer}
                </motion.p>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-4 mb-6 md:mb-8"
                >
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-1 justify-center md:justify-start text-xl md:text-2xl font-bold mb-1">
                      {appData.rating}
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      {appData.reviewCount} reviews
                    </div>
                  </div>
                  <div className="text-center md:text-left border-l border-r border-gray-800 px-4">
                    <div className="text-xl md:text-2xl font-bold mb-1">
                      {appData.downloads}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      Downloads
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-xl md:text-2xl font-bold mb-1">
                      {appData.ageRating}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      Rated for {appData.ageRating}
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={() => handleApkDownload(appData?.downloadLink)}
                    className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                  >
                    <Download className="w-5 h-5" />
                    Install ({appData.size})
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-40 h-40 rounded-3xl  lg:flex items-center justify-center text-4xl  hidden font-bold shadow-2xl shadow-blue-600/30"
              >
                <Image
                  width={90}
                  height={90}
                  src={appData.icon}
                  alt={`${appData.name}-logo`}
                  className="w-[90%] h-[90%] "
                />
              </motion.div>
            </div>

            {/* Category Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {appData.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 border border-gray-700 text-gray-300"
                >
                  {category}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className=" top-0 z-30 ">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-1 overflow-x-auto">
              {["about", "reviews", "safety"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab as "about" | "reviews" | "safety")
                  }
                  className={`px-6 py-4 font-semibold capitalize transition-all relative ${
                    activeTab === tab
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {tab === "safety" ? "Data safety" : tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* About Tab */}
            {activeTab === "about" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* About This App */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">About this app</h3>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {appData.description}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {appData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/50 border border-gray-800"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's New */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-4">What&apos;s new</h3>
                  <p className="text-gray-400 italic">{appData.whatsNew}</p>
                  <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-4 text-sm text-gray-500">
                    <span>Version {appData.version}</span>
                    <span>•</span>
                    <span>Updated {appData.lastUpdated}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Rating Overview */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-6">
                    Ratings and reviews
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center md:text-left">
                      <div className="text-6xl font-bold mb-2">
                        {appData.rating}
                      </div>
                      <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="text-gray-400">
                        {appData.reviewCount} reviews
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm w-4">{stars}</span>
                          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 rounded-full"
                              style={{ width: stars === 5 ? "85%" : "5%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold flex-shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{review.name}</div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          {review.review}
                        </p>
                        <div className="text-sm text-gray-400 mb-4">
                          {review.helpful} people found this review helpful
                        </div>

                        {/* Developer Response */}
                        <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-blue-600">
                          <div className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            {appData.developer}
                          </div>
                          <p className="text-gray-300 text-sm">
                            {review.developerResponse}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Data Safety Tab */}
            {activeTab === "safety" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-4">Data safety</h3>
                  <p className="text-gray-400 mb-6">
                    Safety starts with understanding how developers collect and
                    share your data. Data privacy and security practices may
                    vary based on your use, region and age. The developer
                    provided this information and may update it over time.
                  </p>

                  <div className="space-y-4">
                    {dataSafety.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-800 hover:border-gray-700 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-blue-400 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{item.title}</h4>
                          <p className="text-gray-400 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
                    See details
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadView;
