import TgIcon from "@/assets/icons/tg-icon.svg";
import XIcon from "@/assets/icons/x-icon.svg";
import HarriProfileImage from "@/assets/harri-profile-image.svg";
import YukiProfileImage from "@/assets/yuki-profile-image.svg";
interface socialItem {
  name: string;
  url: string;
  iconPath: string;
  alt: string;
}

interface Reviews {
  avatar: string;
  name: string;
  handle: string;
  content: string;
  verified: boolean;
}

export const Socials: socialItem[] = [
  {
    name: "X",
    url: "https://x.com/infusewallet",
    iconPath: XIcon,
    alt: "𝕏",
  },
  {
    name: "TG",
    url: "https://t.me/infusewallet",
    iconPath: TgIcon,
    alt: "Telegram",
  },
];

export const reviews: Reviews[] = [
  {
    avatar: YukiProfileImage,
    name: "Yuki @SOON Mainnet is LIVE",
    handle: "@frosmian88",
    content:
      "Just finishing talking with @4hmmadou_5 and i really like the idea of first TG mini app wallet. @InFuseWallet is already deployed to @soon_svm devnet. Encouraging everyone to check this out.",
    verified: true,
  },
  {
    avatar: HarriProfileImage,
    name: "Harri",
    handle: "@Harri_obi",
    content:
      "Two @SuperteamNG projects (@InFuseWallet and @verxioprotocol) got a win in the Light Protocol ZK Compression Hackathon. That makes it 5 internal wins in the Solana Radar Hackathon sidetrack 🔥",
    verified: true,
  },
];
