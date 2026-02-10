"use client";
import Link from "next/link";

const SidebarButton = ({ icon: Icon, label, href, active, onClick }) => {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
          transition font-medium
          ${
            active
              ? "bg-sky-600 text-white shadow"
              : "text-slate-300 hover:bg-sky-600 hover:text-white"
          }`}
      >
        {Icon && <Icon size={20} />}
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
};

export default SidebarButton;
