import { motion } from "framer-motion";
import Link from "next/link";

export function SignalDot() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75"></span>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-live"></span>
    </span>
  );
}
