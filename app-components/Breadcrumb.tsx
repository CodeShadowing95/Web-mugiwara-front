import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`text-sm text-farm-green mb-6 dark:text-gray-400 ${className}`} aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center space-x-2">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <li aria-hidden="true">
                <ChevronRight size={14} className="mx-1" />
              </li>
            )}
            <li className={idx === items.length - 1 ? "font-medium text-farm-green-dark dark:text-white" : undefined}>
              {item.href && idx !== items.length - 1 ? (
                <Link href={item.href} className="hover:text-farm-green-dark dark:hover:text-white flex items-center">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center">{item.icon && <span className="mr-1">{item.icon}</span>}{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
} 