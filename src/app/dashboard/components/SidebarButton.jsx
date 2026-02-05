"use client";
import Link from "next/link";

const SidebarButton = ({ icon: Icon, label, href, active, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg
        transition font-medium
        ${
          active
            ? "bg-sky-600 text-white shadow"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`}
    >
      <Icon size={20} />
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export default SidebarButton;
