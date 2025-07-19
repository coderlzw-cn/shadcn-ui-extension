"use client";

import React, {useState} from "react";
import {Pagination} from "./pagination";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

type Size = "sm" | "md" | "lg";

// 尺寸选择器组件
const SizeSelector: React.FC<{
  size: Size;
  onSizeChange: (size: Size) => void;
  "aria-label"?: string;
}> = ({ size, onSizeChange, "aria-label": ariaLabel }) => {
  const sizeLabels = {
    sm: "小",
    md: "中",
    lg: "大"
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="size-selector" className="text-sm font-medium text-muted-foreground sr-only sm:not-sr-only">
        组件尺寸
      </label>
      <Select value={size} onValueChange={(value) => onSizeChange(value as Size)} aria-label={ariaLabel || "选择组件尺寸"}>
        <SelectTrigger
          id="size-selector"
          size="sm"
          className="w-24 h-8 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <SelectValue placeholder="选择尺寸" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm" className="text-xs">
            小
          </SelectItem>
          <SelectItem value="md" className="text-xs">
            中
          </SelectItem>
          <SelectItem value="lg" className="text-xs">
            大
          </SelectItem>
        </SelectContent>
      </Select>
      <Badge variant="secondary" className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20" aria-label={`当前尺寸：${sizeLabels[size]}`}>
        {sizeLabels[size]}
      </Badge>
    </div>
  );
};

// 当前页、大小，总页数，总条数
const PaginationView: React.FC<{
  currentPage: number;
  size: Size;
  total: number;
  pageSize: number;
}> = ({ currentPage, total, pageSize }) => {
  return (
    <div className="flex items-center gap-x-4">
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">当前页</span>：{currentPage}
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">总页数</span>：{Math.ceil((total ?? 0) / pageSize)}
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">每页条数</span>：{pageSize}
      </div>
    </div>
  );
};

// 完整功能分页示例
export const FullPaginationExample: React.FC<{ className?: string }> = ({ className }) => {
  const [size, setSize] = useState<Size>("md");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = 500;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className,
      )}
      role="region"
      aria-labelledby="full-pagination-title"
      aria-describedby="full-pagination-description"
    >
      <CardHeader className="pb-4">
        <CardTitle id="full-pagination-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">完整功能分页</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
              推荐
            </Badge>
          </div>
          <PaginationView currentPage={currentPage} size={size} total={total} pageSize={pageSize} />
          <SizeSelector size={size} onSizeChange={setSize} aria-label="完整功能分页尺寸设置" />
        </CardTitle>
        <CardDescription id="full-pagination-description" className="text-muted-foreground leading-relaxed">
          包含所有功能的完整分页组件，支持总数显示、页面大小选择、跳转等功能
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Pagination
          currentPage={currentPage}
          total={total}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          variant="full"
          showTotal={true}
          showPageSize={true}
          showJumpTo={true}
          showQuickJump={true}
          size={size}
        />
      </CardContent>
    </Card>
  );
};

// 简单分页示例
export const SimplePaginationExample: React.FC<{ className?: string }> = ({ className }) => {
  const [size, setSize] = useState<Size>("md");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = 500;
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className,
      )}
      role="region"
      aria-labelledby="simple-pagination-title"
      aria-describedby="simple-pagination-description"
    >
      <CardHeader className="pb-4">
        <CardTitle id="simple-pagination-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">简单分页</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
              轻量
            </Badge>
          </div>
          <PaginationView currentPage={currentPage} size={size} total={total} pageSize={pageSize} />
          <SizeSelector size={size} onSizeChange={setSize} aria-label="简单分页尺寸设置" />
        </CardTitle>
        <CardDescription id="simple-pagination-description" className="text-muted-foreground leading-relaxed">
          简洁的分页组件，只显示基本的上一页/下一页功能和当前页信息
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Pagination total={total} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} variant="simple" size={size} />
      </CardContent>
    </Card>
  );
};

// 紧凑分页示例
export const CompactPaginationExample: React.FC<{ className?: string }> = ({ className }) => {
  const [size, setSize] = useState<Size>("md");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = 500;
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className,
      )}
      role="region"
      aria-labelledby="compact-pagination-title"
      aria-describedby="compact-pagination-description"
    >
      <CardHeader className="pb-4">
        <CardTitle id="compact-pagination-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">紧凑分页</span>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800">
              紧凑
            </Badge>
          </div>
          <PaginationView currentPage={currentPage} size={size} total={total} pageSize={pageSize} />
          <SizeSelector size={size} onSizeChange={setSize} aria-label="紧凑分页尺寸设置" />
        </CardTitle>
        <CardDescription id="compact-pagination-description" className="text-muted-foreground leading-relaxed">
          紧凑型分页组件，在有限空间内提供完整的分页功能
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Pagination total={total} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} variant="compact" size={size} />
      </CardContent>
    </Card>
  );
};

// 自定义配置分页示例
export const CustomPaginationExample: React.FC<{ className?: string }> = ({ className }) => {
  const [size, setSize] = useState<Size>("md");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = 500;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className,
      )}
      role="region"
      aria-labelledby="custom-pagination-title"
      aria-describedby="custom-pagination-description"
    >
      <CardHeader className="pb-4">
        <CardTitle id="custom-pagination-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">自定义配置</span>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800">
              高级
            </Badge>
          </div>
          <PaginationView currentPage={currentPage} size={size} total={total} pageSize={pageSize} />
          <SizeSelector size={size} onSizeChange={setSize} aria-label="自定义配置分页尺寸设置" />
        </CardTitle>
        <CardDescription id="custom-pagination-description" className="text-muted-foreground leading-relaxed">
          展示自定义文本、页面大小选项和功能开关的配置
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Pagination
          currentPage={currentPage}
          total={total}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          variant="full"
          showTotal={true}
          showPageSize={true}
          showJumpTo={false}
          showQuickJump={true}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          texts={{
            total: "总计",
            pageSize: "每页显示",
            jumpTo: "跳转到",
            page: "页",
            items: "条记录"
          }}
          size={size}
        />
      </CardContent>
    </Card>
  );
};

// 禁用状态分页示例
export const DisabledPaginationExample: React.FC<{ className?: string }> = ({ className }) => {
  const [size, setSize] = useState<Size>("md");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = 500;
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-gray-500/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className,
      )}
      role="region"
      aria-labelledby="disabled-pagination-title"
      aria-describedby="disabled-pagination-description"
    >
      <CardHeader className="pb-4">
        <CardTitle id="disabled-pagination-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">禁用状态</span>
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
              禁用
            </Badge>
          </div>
          <PaginationView currentPage={currentPage} size={size} total={total} pageSize={pageSize} />
          <SizeSelector size={size} onSizeChange={setSize} aria-label="禁用状态分页尺寸设置" />
        </CardTitle>
        <CardDescription id="disabled-pagination-description" className="text-muted-foreground leading-relaxed">
          展示分页组件在禁用状态下的显示效果
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Pagination
          currentPage={currentPage}
          total={total}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          variant="full"
          disabled={true}
          size={size}
        />
      </CardContent>
    </Card>
  );
};
