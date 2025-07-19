"use client";

import React from "react";
import { Folder, FileText, Settings, Users, Database, Code, BookOpen, Badge, Home, ChevronRight } from "lucide-react";
import { Breadcrumb, BreadcrumbItem } from "./breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { size } from "zod";
import { Pagination } from "../pagination/pagination";

// 基础面包屑示例
export const BasicBreadcrumbExample: React.FC<{ className?: string }> = ({ className }) => {
  const basicItems: BreadcrumbItem[] = [
    { label: "文档", path: "/docs" },
    { label: "组件", path: "/docs/components" },
    { label: "按钮", path: "/docs/components/button" }
  ];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className
      )}
      role="region"
      aria-labelledby="basic-breadcrumb-title"
      aria-describedby="basic-breadcrumb-description"
    >
      <CardHeader className="pb-4">
        <CardTitle id="basic-breadcrumb-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">基础面包屑</span>
          </div>
        </CardTitle>
        <CardDescription id="basic-breadcrumb-description" className="text-muted-foreground leading-relaxed">
          基础面包屑组件，支持图标、点击事件、下拉菜单等功能
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Breadcrumb items={basicItems} />
      </CardContent>
    </Card>
  );
};

// 带图标的面包屑示例
export const IconBreadcrumbExample: React.FC<{ className?: string }> = ({ className }) => {
  const iconItems: BreadcrumbItem[] = [
    { label: "项目", path: "/projects", icon: <Folder className="h-4 w-4" /> },
    { label: "用户管理", path: "/projects/users", icon: <Users className="h-4 w-4" /> },
    { label: "设置", path: "/projects/users/settings", icon: <Settings className="h-4 w-4" /> }
  ];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className
      )}
      role="region"
      aria-labelledby="icon-breadcrumb-title"
      aria-describedby="icon-breadcrumb-description"
    >
      <CardHeader className="pb-4">
        <CardTitle id="icon-breadcrumb-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">带图标的面包屑</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Breadcrumb items={iconItems} />
      </CardContent>
    </Card>
  );
};

// 长路径面包屑示例（会触发下拉菜单）
export const LongPathBreadcrumbExample: React.FC<{ className?: string }> = ({ className }) => {
  const longPathItems: BreadcrumbItem[] = [
    { label: "文档", path: "/docs", icon: <BookOpen className="h-4 w-4" /> },
    { label: "前端开发", path: "/docs/frontend", icon: <Code className="h-4 w-4" /> },
    { label: "React", path: "/docs/frontend/react", icon: <Code className="h-4 w-4" /> },
    { label: "组件库", path: "/docs/frontend/react/components", icon: <FileText className="h-4 w-4" /> },
    { label: "UI组件", path: "/docs/frontend/react/components/ui", icon: <FileText className="h-4 w-4" /> },
    { label: "表单组件", path: "/docs/frontend/react/components/ui/form", icon: <FileText className="h-4 w-4" /> },
    { label: "输入框", path: "/docs/frontend/react/components/ui/form/input", icon: <FileText className="h-4 w-4" /> }
  ];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle id="long-path-breadcrumb-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">长路径面包屑（下拉菜单）</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Breadcrumb items={longPathItems} maxItems={4} />
      </CardContent>
    </Card>
  );
};

// 超长路径面包屑示例（展示部分下拉菜单）
export const VeryLongPathBreadcrumbExample: React.FC<{ className?: string }> = ({ className }) => {
  const veryLongPathItems: BreadcrumbItem[] = [
    { label: "管理后台", path: "/admin", icon: <Settings className="h-4 w-4" /> },
    { label: "用户管理", path: "/admin/users", icon: <Users className="h-4 w-4" /> },
    { label: "用户列表", path: "/admin/users/list", icon: <FileText className="h-4 w-4" /> },
    { label: "用户详情", path: "/admin/users/123", icon: <FileText className="h-4 w-4" /> },
    { label: "编辑用户", path: "/admin/users/123/edit", icon: <Settings className="h-4 w-4" /> },
    { label: "基本信息", path: "/admin/users/123/edit/basic", icon: <FileText className="h-4 w-4" /> },
    { label: "个人资料", path: "/admin/users/123/edit/basic/profile", icon: <FileText className="h-4 w-4" /> },
    { label: "头像设置", path: "/admin/users/123/edit/basic/profile/avatar", icon: <FileText className="h-4 w-4" /> },
    { label: "裁剪头像", path: "/admin/users/123/edit/basic/profile/avatar/crop", icon: <FileText className="h-4 w-4" /> }
  ];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle id="very-long-path-breadcrumb-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">超长路径面包屑（部分下拉菜单）</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Breadcrumb items={veryLongPathItems} maxItems={5} />
      </CardContent>
    </Card>
  );
};

// 带点击事件的面包屑示例
export const ClickableBreadcrumbExample: React.FC<{ className?: string }> = ({ className }) => {
  const clickableItems: BreadcrumbItem[] = [
    { label: "数据库", path: "/database", icon: <Database className="h-4 w-4" /> },
    {
      label: "用户表",
      onClick: (item) => console.log("点击了:", item.label),
      icon: <Users className="h-4 w-4" />
    },
    {
      label: "配置",
      onClick: (item) => console.log("点击了:", item.label),
      icon: <Settings className="h-4 w-4" />
    }
  ];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle id="clickable-breadcrumb-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">带点击事件的面包屑</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Breadcrumb items={clickableItems} />
      </CardContent>
    </Card>
  );
};

// 自定义分隔符示例
export const CustomSeparatorBreadcrumbExample: React.FC<{ className?: string }> = ({ className }) => {
  const basicItems: BreadcrumbItem[] = [
    { label: "文档", path: "/docs" },
    { label: "组件", path: "/docs/components" },
    { label: "按钮", path: "/docs/components/button" }
  ];

  const customSeparator = <span className="text-muted-foreground mx-2">/</span>;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle id="custom-separator-breadcrumb-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">自定义分隔符</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Breadcrumb items={basicItems} separator={customSeparator} />
      </CardContent>
    </Card>
  );
};

// 不显示首页图标示例
export const NoHomeIconBreadcrumbExample: React.FC<{ className?: string }> = ({ className }) => {
  const basicItems: BreadcrumbItem[] = [
    { label: "文档", path: "/docs" },
    { label: "组件", path: "/docs/components" },
    { label: "按钮", path: "/docs/components/button" }
  ];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle id="no-home-icon-breadcrumb-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">不显示首页图标</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Breadcrumb items={basicItems} showHomeIcon={false} />
      </CardContent>
    </Card>
  );
};

// 自定义样式示例
export const CustomStyleBreadcrumbExample: React.FC<{ className?: string }> = ({ className }) => {
  const basicItems: BreadcrumbItem[] = [
    { label: "文档", path: "/docs" },
    { label: "组件", path: "/docs/components" },
    { label: "按钮", path: "/docs/components/button" }
  ];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle id="custom-style-breadcrumb-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">自定义样式</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Breadcrumb items={basicItems} className="bg-gray-100 p-3 rounded-lg" itemClassName="text-blue-600" linkClassName="text-blue-600 hover:text-blue-800" />
      </CardContent>
    </Card>
  );
};

 
// 响应式示例
export const ResponsiveBreadcrumbExample: React.FC<{ className?: string }> = ({ className }) => {
  const responsiveItems: BreadcrumbItem[] = [
    { label: "管理后台", path: "/admin", icon: <Settings className="h-4 w-4" /> },
    { label: "内容管理", path: "/admin/content", icon: <FileText className="h-4 w-4" /> },
    { label: "文章管理", path: "/admin/content/articles", icon: <FileText className="h-4 w-4" /> },
    { label: "编辑文章", path: "/admin/content/articles/edit", icon: <FileText className="h-4 w-4" /> },
    { label: "预览" }
  ];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "dark:bg-card/30 dark:border-border/30",
        className
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle id="responsive-breadcrumb-title" className="w-full flex items-center justify-between text-foreground">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="font-semibold">响应式设计</span>
          </div>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          在不同屏幕尺寸下自动调整显示策略
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">桌面端 (maxItems=5)</div>
            <Breadcrumb items={responsiveItems} maxItems={5} />
          </div>
          <div>
            <div className="text-sm font-medium mb-2">移动端 (maxItems=3)</div>
            <Breadcrumb items={responsiveItems} maxItems={3} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
