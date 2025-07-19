"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";

interface ImageCompareProps {
  beforeImage: string; // 原始图片
  afterImage: string; // 处理后图片
  beforeLabel?: string; // 原始图片标签
  afterLabel?: string; // 处理后图片标签
  className?: string; // 样式
  defaultPosition?: number; // 0-100 默认位置
  showLabels?: boolean; // 是否显示标签
  showPositionIndicator?: boolean; // 是否显示位置指示器
  orientation?: "horizontal" | "vertical"; // 方向
  showDragArea?: boolean; // 默认显示托拽线，还是鼠标悬停显示
}

export const ImageCompare: React.FC<ImageCompareProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  defaultPosition = 50,
  showLabels = true,
  showPositionIndicator = true,
  orientation = "horizontal",
  showDragArea = true,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const isHorizontal = orientation === "horizontal";

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    e.stopPropagation();
  }, []);

  const updatePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const value = isHorizontal ? ((clientX - rect.left) / rect.width) * 100 : ((clientY - rect.top) / rect.height) * 100;

      const clampedValue = Math.max(0, Math.min(100, value));

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setPosition(clampedValue);
      });
    },
    [isHorizontal]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX, e.clientY);
    },
    [isDragging, updatePosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault(); // 防止页面滚动
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseup", handleMouseUp, { passive: true });
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // 清理动画帧
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // 点击图片
  // const handleClick = useCallback(
  //   (e: React.MouseEvent) => {
  //     // 如果点击的是滑块，不处理容器点击
  //     if (e.target === sliderRef.current || sliderRef.current?.contains(e.target as Node)) {
  //       return;
  //     }

  //     if (!containerRef.current) return;

  //     const rect = containerRef.current.getBoundingClientRect();
  //     const value = isHorizontal ? ((e.clientX - rect.left) / rect.width) * 100 : ((e.clientY - rect.top) / rect.height) * 100;

  //     setPosition(Math.max(0, Math.min(100, value)));
  //   },
  //   [isHorizontal]
  // );

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-96 select-none overflow-hidden rounded-lg group/image-compare", className)}
      //  onClick={handleClick}
    >
      {/* 处理后图片 */}
      <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />

      {/* 原始图片 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: isHorizontal ? `inset(0 ${100 - position}% 0 0)` : `inset(0 0 ${100 - position}% 0)`
        }}
      >
        <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
      </div>

      {/* 拖拽线 */}
      <div
        className={cn(
          "absolute shadow-lg border border-white border-dashed transition-opacity duration-300",
          showDragArea ? "opacity-100" : "opacity-0 group-hover/image-compare:opacity-100",
          isHorizontal ? "top-0 bottom-0 w-0.5" : "left-0 right-0 h-0.5",
          isDragging ? "border-solid" : "border-dashed",
        )}
        style={{
          [isHorizontal ? "left" : "top"]: `${position}%`,
          transform: isHorizontal ? "translateX(-50%)" : "translateY(-50%)"
        }}
      ></div>

      {/* Invisible Drag Area - 扩大可拖拽区域 */}
      <div
        className={cn(
          "absolute bg-transparent",
          isHorizontal ? "top-0 bottom-0 w-2.5" : "left-0 right-0 h-8",
          isDragging ? (isHorizontal ? "cursor-col-resize" : "cursor-row-resize") : isHorizontal ? "cursor-col-resize" : "cursor-row-resize"
        )}
        style={{
          [isHorizontal ? "left" : "top"]: `${position}%`,
          transform: isHorizontal ? "translateX(-50%)" : "translateY(-50%)"
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />

      {/* Labels */}
      {showLabels && (
        <>
          <div className={cn(
            "absolute bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-white/20",
            isHorizontal
              ? "top-4 left-4"
              : "top-4 left-4"
          )}>
            {beforeLabel}
          </div>
          <div className={cn(
            "absolute bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-white/20",
            isHorizontal
              ? "top-4 right-4"
              : "bottom-4 right-4"
          )}>
            {afterLabel}
          </div>
        </>
      )}

      {/* 位置指示器 */}
      {showPositionIndicator && (
        <div className={cn(
          "absolute bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-white/20",
          isHorizontal
            ? "bottom-4 left-1/2 transform -translate-x-1/2"
            : "bottom-4 left-4"
        )}>
          {Math.round(position)}%
        </div>
      )}
    </div>
  );
};
