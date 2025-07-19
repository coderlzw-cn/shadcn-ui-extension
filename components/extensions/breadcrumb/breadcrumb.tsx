"use client";

import React, { useMemo } from "react";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  onClick?: (item: BreadcrumbItem) => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]; // 面包屑项
  separator?: React.ReactNode; // 分隔符
  maxItems?: number; // 最大项数
  showHomeIcon?: boolean; // 是否显示首页图标
  homeLabel?: string; // 首页标签
  className?: string; // 容器样式
  itemClassName?: string; // 项样式
  linkClassName?: string; // 链接样式
  separatorClassName?: string; // 分隔符样式
  responsive?: boolean; // 是否响应式
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="h-4 w-4" />,
  maxItems = 5,
  showHomeIcon = true,
  homeLabel = "首页",
  className,
  itemClassName,
  linkClassName,
  separatorClassName,
  responsive = true
}) => {
  // 处理空数据情况
  if (!items || items.length === 0) {
    return null;
  }
  const processedItems = useMemo(() => {
    let processed = [...items];

    // 添加首页项
    if (showHomeIcon) {
      processed.unshift({
        label: homeLabel,
        path: "/",
        icon: <Home className="h-4 w-4" />
      });
    }

    return processed;
  }, [items, showHomeIcon, homeLabel]);

  // 处理最大项目数限制，使用下拉菜单显示中间项
  const visibleItems = useMemo(() => {
    if (processedItems.length <= maxItems) {
      return {
        start: processedItems,
        middle: [],
        dropdown: [],
        end: [],
        hasDropdown: false
      };
    }

    // 确保至少显示首页和最后一个项目
    const start = processedItems.slice(0, 1); // 首页
    const end = processedItems.slice(-1); // 最后一个项目
    const middle = processedItems.slice(1, -1); // 中间的项目

    // 计算需要显示的项目数量
    const availableSlots = maxItems - 2; // 减去首页和最后一个项目
    const visibleMiddleCount = Math.max(0, availableSlots - 1); // 留一个位置给下拉菜单

    // 分割中间项目
    const visibleMiddle = middle.slice(0, visibleMiddleCount);
    const dropdownMiddle = middle.slice(visibleMiddleCount);

    return {
      start,
      middle: visibleMiddle,
      dropdown: dropdownMiddle,
      end,
      hasDropdown: dropdownMiddle.length > 0
    };
  }, [processedItems, maxItems]);

  // 渲染面包屑项
  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const isCurrentPage = isLast && !item.path;

    if (isCurrentPage) {
      return (
        <span className={cn("text-foreground font-medium flex items-center min-w-0", itemClassName)} aria-current="page">
          {item.icon && <span className="mr-1 flex-shrink-0">{item.icon}</span>}
          <span className="truncate min-w-0">{item.label}</span>
        </span>
      );
    }

    const content = (
      <>
        {item.icon && <span className="mr-1 flex-shrink-0">{item.icon}</span>}
        <span className="truncate min-w-0">{item.label}</span>
      </>
    );

    if (item.onClick) {
      return (
        <button 
          onClick={() => item.onClick!(item)} 
          className={cn("hover:text-foreground transition-colors text-muted-foreground flex items-center min-w-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm", linkClassName)}
          aria-label={`导航到 ${item.label}`}
        >
          {content}
        </button>
      );
    }

    if (item.path) {
      return (
        <Link 
          href={item.path} 
          className={cn("hover:text-foreground transition-colors text-muted-foreground flex items-center min-w-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm", linkClassName)}
          aria-label={`导航到 ${item.label}`}
        >
          {content}
        </Link>
      );
    }

    return <span className={cn("text-muted-foreground flex items-center min-w-0", itemClassName)}>{content}</span>;
  };

  // 渲染下拉菜单项
  const renderDropdownItem = (item: BreadcrumbItem) => {
    const content = (
      <>
        {item.icon && <span className="mr-2 flex-shrink-0">{item.icon}</span>}
        <span className="truncate">{item.label}</span>
      </>
    );

    if (item.onClick) {
      return (
        <DropdownMenuItem key={item.label} onClick={item.onClick.bind(null, item)}>
          {content}
        </DropdownMenuItem>
      );
    }

    if (item.path) {
      return (
        <DropdownMenuItem key={item.label} asChild>
          <Link href={item.path}>
            {content}
          </Link>
        </DropdownMenuItem>
      );
    }

    return (
      <DropdownMenuItem key={item.label} disabled>
        {content}
      </DropdownMenuItem>
    );
  };

  // 渲染分隔符
  const renderSeparator = (index: number) => (
    <span key={`separator-${index}`} className={cn("text-muted-foreground mx-2 flex-shrink-0", separatorClassName)} aria-hidden="true">
      {separator}
    </span>
  );

  return (
    <nav aria-label="面包屑导航" className={cn("flex items-center text-sm overflow-hidden", responsive && "flex-wrap", className)}>
      <ol className="flex items-center min-w-0 w-full overflow-hidden flex-nowrap">
        {/* 开始项（首页） */}
        {visibleItems.start.map((item, index) => (
          <li key={`start-${index}`} className="flex items-center min-w-0">
            {renderItem(item, index, false)}
            {renderSeparator(index)}
          </li>
        ))}

        {/* 可见的中间项 */}
        {visibleItems.middle.map((item, index) => {
          const globalIndex = visibleItems.start.length + index;
          return (
            <li key={`middle-${index}`} className="flex items-center min-w-0">
              {renderItem(item, globalIndex, false)}
              {renderSeparator(globalIndex)}
            </li>
          );
        })}

        {/* 中间项下拉菜单 */}
        {visibleItems.hasDropdown && (
          <li className="flex items-center min-w-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={cn("hover:text-foreground transition-colors text-muted-foreground flex items-center min-w-0 p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", linkClassName)}
                  aria-label="显示更多导航选项"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">更多页面</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-w-xs">
                {visibleItems.dropdown.map(renderDropdownItem)}
              </DropdownMenuContent>
            </DropdownMenu>
            {renderSeparator(visibleItems.start.length + visibleItems.middle.length)}
          </li>
        )}

        {/* 结束项（当前页） */}
        {visibleItems.end.map((item, index) => {
          const globalIndex = visibleItems.start.length + visibleItems.middle.length + (visibleItems.hasDropdown ? 1 : 0) + index;
          const isLast = globalIndex === processedItems.length - 1;
          
          return (
            <li key={`end-${index}`} className="flex items-center min-w-0">
              {renderItem(item, globalIndex, isLast)}
              {!isLast && renderSeparator(globalIndex)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
