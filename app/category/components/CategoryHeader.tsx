import Link from "next/link";
import { Apple, Carrot } from "lucide-react";
import { Category } from "@/types";
import React from "react";

interface CategoryHeaderProps {
  category: Category | null;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category }) => (
  <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-[#e8e1d4] dark:border-zinc-800 mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-[#3c5a3e] dark:text-zinc-100 mb-2 flex items-center">
      <span className="mr-2 text-[#8fb573] dark:text-emerald-400">
        <Apple size={24} className="inline mr-1" />
        <Carrot size={24} className="inline" />
      </span>
      {category?.name || "..."}
    </h1>
    <p className="text-[#5a7052] dark:text-zinc-500 mb-4">
      {category?.description || "..."}
    </p>
    <div className="flex flex-wrap gap-2">
      {category?.children?.map((child) => (
        <Link
          key={child.id}
          href={`/category?item=${child.id}`}
          className="bg-[#f7f4eb] dark:bg-zinc-800 text-[#5a7052] dark:text-zinc-100 px-3 py-1 rounded-full text-sm font-medium hover:bg-[#e8e1d4] dark:hover:bg-zinc-700 transition-colors"
        >
          {child.name}
        </Link>
      ))}
    </div>
  </div>
);

export default CategoryHeader; 