import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, EllipsisIcon} from "lucide-react";

export interface PaginationProps {
  /** 当前页码，从1开始 */
  currentPage: number;
  /** 总条数 */
  total?: number;
  /** 每页条数选项 */
  pageSizeOptions?: number[];
  /** 当前每页条数 */
  pageSize: number;
  /** 页码改变回调 */
  onPageChange: (page: number) => void;
  /** 每页条数改变回调 */
  onPageSizeChange: (pageSize: number) => void;
  /** 分页格式：simple | full | compact */
  variant?: "simple" | "full" | "compact";
  /** 是否显示每页条数选择器 */
  showPageSize?: boolean;
  /** 是否显示跳页输入框 */
  showJumpTo?: boolean;
  /** 是否显示总数信息 */
  showTotal?: boolean;
  /** 是否显示快速跳转按钮 */
  showQuickJump?: boolean;
  /** 自定义文本 */
  texts?: {
    total?: string;
    pageSize?: string;
    jumpTo?: string;
    page?: string;
    of?: string;
    items?: string;
    previous?: string;
    next?: string;
    first?: string;
    last?: string;
    ellipsis?: string;
  };
  /** 自定义类名 */
  className?: string;
  /** 按钮大小 */
  size?: "sm" | "md" | "lg";
  /** 是否禁用 */
  disabled?: boolean;
}

export function Pagination({
  currentPage,
  total,
  pageSizeOptions = [10, 20, 30, 40, 50, 70],
  pageSize,
  onPageChange,
  onPageSizeChange,
  variant = "full",
  showPageSize = true,
  showJumpTo = true,
  showTotal = false,
  showQuickJump = false,
  texts = {},
  className,
  size = "md",
  disabled = false,
}: PaginationProps) {
  // 默认文本配置
  const defaultTexts = {
    total: "共",
    pageSize: "每页行数",
    jumpTo: "前往",
    page: "页",
    of: "共",
    items: "条",
    previous: "上一页",
    next: "下一页",
    first: "第一页",
    last: "最后一页",
    ellipsis: "更多页面",
    ...texts
  };

  // 尺寸配置 - 使用主题感知的样式
  const sizeConfig = {
    sm: {
      button: "h-7 w-7",
      input: "h-7 w-14",
      text: "text-xs",
      icon: "h-3 w-3"
    },
    md: {
      button: "h-8 w-8",
      input: "h-8 w-16",
      text: "text-sm",
      icon: "h-4 w-4"
    },
    lg: {
      button: "h-10 w-10",
      input: "h-10 w-20",
      text: "text-base",
      icon: "h-5 w-5"
    }
  };

  /** 动态生成页码数组，带省略号 */
  type PageItem = number | { type: "ellipsis"; direction: "left" | "right" };

  // 动态生成页码数组，带省略号
  function getPageNumbers(current: number, total: number, delta = 1): PageItem[] {
    const pages: PageItem[] = [];

    let left = current - delta;
    let right = current + delta;

    // 保证最左侧至少显示到4（排除第一页）
    if (left <= 2) {
      left = 2;
      right = Math.min(4, total - 1);
    }

    // 保证最右侧至少显示到total-3
    if (right >= total - 1) {
      right = total - 1;
      left = Math.max(total - 3, 2);
    }

    pages.push(1);

    if (left > 2) pages.push({ type: "ellipsis", direction: "left" });

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < total - 1) pages.push({ type: "ellipsis", direction: "right" });

    if (total > 1) pages.push(total);

    return pages;
  }

  const totalPages = Math.ceil((total ?? 0)  / pageSize);

  const pageNumbers = totalPages <= 7 ? Array.from({ length: totalPages }, (_, i) => i + 1) : getPageNumbers(currentPage, totalPages);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      return;
    }
    onPageChange(page <= 0 ? 1 : totalPages);
  };

  // 处理键盘事件
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  // 生成分页按钮
  const generatePaginationLinks = () => (
    <div className="flex items-center space-x-1" role="group" aria-label="页码导航">
      {pageNumbers.map((item, index) =>
        typeof item === "number" ? (
          <Button
            key={index}
            variant={currentPage === item ? "default" : "outline"}
            className={cn(
              sizeConfig[size].button,
              "p-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              currentPage === item ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-accent hover:text-accent-foreground border-border"
            )}
            onClick={() => goToPage(item)}
            onKeyDown={(e) => handleKeyDown(e, () => goToPage(item))}
            disabled={disabled}
            aria-current={currentPage === item ? "page" : undefined}
            aria-label={`第 ${item} 页`}
          >
            {item}
          </Button>
        ) : (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              sizeConfig[size].button,
              "relative p-0 text-muted-foreground hover:text-foreground transition-all duration-200 group/pagination-ellipsis overflow-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            onClick={() => goToPage(item.direction === "left" ? currentPage - 5 : currentPage + 5)}
            onKeyDown={(e) => handleKeyDown(e, () => goToPage(item.direction === "left" ? currentPage - 5 : currentPage + 5))}
            disabled={disabled}
            aria-label={`${item.direction === "left" ? "向前" : "向后"}跳转5页`}
          >
            <EllipsisIcon
              className={cn(sizeConfig[size].icon, "absolute transition-all duration-200 ease-in-out group-hover/pagination-ellipsis:opacity-0")}
              aria-hidden="true"
            />

            {item.direction === "left" ? (
              <ChevronsLeft
                className={cn(
                  sizeConfig[size].icon,
                  "absolute opacity-0 translate-x-1 transition-all duration-200 ease-in-out group-hover/pagination-ellipsis:opacity-100 group-hover/pagination-ellipsis:translate-x-0"
                )}
                aria-hidden="true"
              />
            ) : (
              <ChevronsRight
                className={cn(
                  sizeConfig[size].icon,
                  "absolute opacity-0 translate-x-1 transition-all duration-200 ease-in-out group-hover/pagination-ellipsis:opacity-100 group-hover/pagination-ellipsis:translate-x-0"
                )}
                aria-hidden="true"
              />
            )}
          </Button>
        )
      )}
    </div>
  );

  // 渲染简单分页
  const renderSimplePagination = () => (
    <nav className="flex items-center space-x-2" aria-label="分页导航">
      <Button
        variant="outline"
        className={cn(
          sizeConfig[size].button,
          "p-0 group/pagination-prev transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground border-border"
        )}
        onClick={() => goToPage(currentPage - 1)}
        onKeyDown={(e) => handleKeyDown(e, () => goToPage(currentPage - 1))}
        disabled={currentPage <= 1 || disabled}
        aria-label={defaultTexts.previous}
      >
        <ChevronLeft className={cn(sizeConfig[size].icon, "group-hover/pagination-prev:-translate-x-1 transition-transform duration-200")} aria-hidden="true" />
      </Button>

      <span className={cn("text-muted-foreground", sizeConfig[size].text)} aria-live="polite">
        第 {currentPage} 页，共 {totalPages} 页
      </span>

      <Button
        variant="outline"
        className={cn(
          sizeConfig[size].button,
          "p-0 group/pagination-next transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground border-border"
        )}
        onClick={() => goToPage(currentPage + 1)}
        onKeyDown={(e) => handleKeyDown(e, () => goToPage(currentPage + 1))}
        disabled={currentPage >= totalPages || disabled}
        aria-label={defaultTexts.next}
      >
        <ChevronRight className={cn(sizeConfig[size].icon, "group-hover/pagination-next:translate-x-1 transition-transform duration-200")} aria-hidden="true" />
      </Button>
    </nav>
  );

  // 渲染紧凑分页
  const renderCompactPagination = () => (
    <nav className="flex items-center space-x-1" aria-label="分页导航">
      <Button
        variant="outline"
        className={cn(
          sizeConfig[size].button,
          "p-0 group/pagination-prev transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground border-border"
        )}
        onClick={() => goToPage(currentPage - 1)}
        onKeyDown={(e) => handleKeyDown(e, () => goToPage(currentPage - 1))}
        disabled={currentPage <= 1 || disabled}
        aria-label={defaultTexts.previous}
      >
        <ChevronLeft className={cn(sizeConfig[size].icon, "group-hover/pagination-prev:-translate-x-1 transition-transform duration-200")} aria-hidden="true" />
      </Button>

      {generatePaginationLinks()}

      <Button
        variant="outline"
        className={cn(
          sizeConfig[size].button,
          "p-0 group/pagination-next transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground border-border"
        )}
        onClick={() => goToPage(currentPage + 1)}
        onKeyDown={(e) => handleKeyDown(e, () => goToPage(currentPage + 1))}
        disabled={currentPage >= totalPages || disabled}
        aria-label={defaultTexts.next}
      >
        <ChevronRight className={cn(sizeConfig[size].icon, "group-hover/pagination-next:translate-x-1 transition-transform duration-200")} aria-hidden="true" />
      </Button>
    </nav>
  );

  // 根据分页格式渲染不同的内容
  const renderPaginationContent = () => {
    switch (variant) {
      case "simple":
        return renderSimplePagination();
      case "compact":
        return renderCompactPagination();
      case "full":
      default:
        return (
          <nav className="flex items-center space-x-3 lg:space-x-5" aria-label="分页导航">
            {/* 总数信息 */}
            {showTotal && total && (
              <div className={cn("text-muted-foreground", sizeConfig[size].text)} aria-live="polite">
                {defaultTexts.total} {total} {defaultTexts.items}
              </div>
            )}

            {/* 每页行数 */}
            {showPageSize && (
              <div className="flex items-center space-x-2">
                <label htmlFor="page-size-select" className={cn("font-medium text-foreground", sizeConfig[size].text)}>
                  {defaultTexts.pageSize}
                </label>
                <Select value={`${pageSize}`} onValueChange={(value) => onPageSizeChange(Number(value))} disabled={disabled}>
                  <SelectTrigger
                    id="page-size-select"
                    className={cn(
                      "w-[80px] border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      size === "sm" ? "h-7!" : size === "lg" ? "h-10!" : "h-8!"
                    )}
                    aria-label={`选择每页显示 ${defaultTexts.items} 数量`}
                  >
                    <SelectValue placeholder={pageSize} />
                  </SelectTrigger>
                  <SelectContent className="min-w-[80px] bg-popover border-border">
                    {pageSizeOptions.map((size) => (
                      <SelectItem key={size} value={`${size}`} className="text-foreground">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* 跳页 */}
            {showJumpTo && (
              <div className="flex items-center space-x-2">
                <label htmlFor="jump-to-page" className={cn("font-medium text-foreground", sizeConfig[size].text)}>
                  {defaultTexts.jumpTo}
                </label>
                <Input
                  id="jump-to-page"
                  type="number"
                  className={cn(
                    sizeConfig[size].input,
                    "bg-background border-border text-foreground placeholder:text-muted-foreground",
                    "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                  min={1}
                  max={totalPages}
                  disabled={disabled}
                  aria-label={`跳转到第几页，共 ${totalPages} 页`}
                  onBlur={(e) => {
                    const page = Number(e.currentTarget.value);
                    if (!isNaN(page)) {
                      goToPage(page);
                    }
                    e.currentTarget.value = "";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const page = Number(e.currentTarget.value);
                      if (!isNaN(page)) {
                        goToPage(page);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
                <span className={cn("font-medium text-foreground", sizeConfig[size].text)}>{defaultTexts.page}</span>
              </div>
            )}

            {/* 快速跳转按钮 */}
            {showQuickJump && (
              <div className="flex items-center space-x-1" role="group" aria-label="快速跳转">
                <Button
                  variant="outline"
                  size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
                  onClick={() => goToPage(1)}
                  onKeyDown={(e) => handleKeyDown(e, () => goToPage(1))}
                  disabled={currentPage <= 1 || disabled}
                  className="group/pagination-first border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={defaultTexts.first}
                >
                  <ChevronsLeft
                    className={cn(sizeConfig[size].icon, "group-hover/pagination-first:-translate-x-1 transition-transform duration-200")}
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  variant="outline"
                  size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
                  onClick={() => goToPage(totalPages)}
                  onKeyDown={(e) => handleKeyDown(e, () => goToPage(totalPages))}
                  disabled={currentPage >= totalPages || disabled}
                  className="group/pagination-last border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={defaultTexts.last}
                >
                  <ChevronsRight
                    className={cn(sizeConfig[size].icon, "group-hover/pagination-last:translate-x-1 transition-transform duration-200")}
                    aria-hidden="true"
                  />
                </Button>
              </div>
            )}

            {/* 分页按钮 */}
            <div className="flex items-center space-x-1" role="group" aria-label="分页导航">
              <Button
                variant="outline"
                className={cn(
                  sizeConfig[size].button,
                  "p-0 group/pagination-prev transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground border-border"
                )}
                onClick={() => goToPage(currentPage - 1)}
                onKeyDown={(e) => handleKeyDown(e, () => goToPage(currentPage - 1))}
                disabled={currentPage <= 1 || disabled}
                aria-label={defaultTexts.previous}
              >
                <ChevronLeft
                  className={cn(sizeConfig[size].icon, "group-hover/pagination-prev:-translate-x-1 transition-transform duration-200")}
                  aria-hidden="true"
                />
              </Button>

              {generatePaginationLinks()}

              <Button
                variant="outline"
                className={cn(
                  sizeConfig[size].button,
                  "p-0 group/pagination-next transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground border-border"
                )}
                onClick={() => goToPage(currentPage + 1)}
                onKeyDown={(e) => handleKeyDown(e, () => goToPage(currentPage + 1))}
                disabled={currentPage >= totalPages || disabled}
                aria-label={defaultTexts.next}
              >
                <ChevronRight
                  className={cn(sizeConfig[size].icon, "group-hover/pagination-next:translate-x-1 transition-transform duration-200")}
                  aria-hidden="true"
                />
              </Button>
            </div>
          </nav>
        );
    }
  };

  return (
    <div className={cn("flex items-center justify-end px-2", className)} role="navigation" aria-label="分页导航">
      {renderPaginationContent()}
    </div>
  );
}
