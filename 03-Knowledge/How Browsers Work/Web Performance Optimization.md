---
tags:
  - browser
  - web-performance
  - core-web-vitals
  - optimization
date: 2026-03-06
aliases:
  - Web Performance
  - Core Web Vitals
  - CRP Optimization
---

# 🚀 Web Performance Optimization

> *Tips và kỹ thuật tối ưu hiệu suất cho developer.*

Quay lại: [[How Browsers Work MOC]]

---

## Critical Rendering Path Optimization

```html
<head>
  <!-- 1. CSS critical inline để render nhanh -->
  <style>
    /* Critical CSS cho above-the-fold content */
    body { margin: 0; font-family: system-ui; }
    .hero { height: 100vh; display: flex; }
  </style>

  <!-- 2. Preload fonts quan trọng -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin>

  <!-- 3. Async/defer cho scripts -->
  <script src="analytics.js" async></script>
  <script src="app.js" defer></script>

  <!-- 4. Non-critical CSS load sau -->
  <link rel="stylesheet" href="full.css" media="print" onload="this.media='all'">
</head>
```

Xem thêm resource hints: [[Networking Layer#Resource Hints — Kiểm soát tải trước]]

---

## Script Loading: `async` vs `defer`

```
Thường:      HTML ──────┤ tải JS ├──┤ chạy JS ├──── HTML ──────
                        ▲ BLOCK!     ▲ BLOCK!

async:       HTML ────────────────────────────── HTML ──────
                  └─ tải JS (song song) ─┤ chạy JS ├
                                          ▲ Block ngắn

defer:       HTML ─────────────────────────────────── HTML ──┤ chạy JS ├
                  └─ tải JS (song song) ──────────────┘
                                                       ▲ Chạy sau DOMContentLoaded
```

| | `<script>` | `async` | `defer` |
|---|---|---|---|
| Block HTML parsing | ✅ Có | ⚠️ Khi execute | ❌ Không |
| Thứ tự thực thi | Theo document order | Không đảm bảo | Theo document order |
| Khi nào chạy | Ngay khi tải xong | Ngay khi tải xong | Sau DOMContentLoaded |
| Dùng khi | Critical script | Independent (analytics) | Script phụ thuộc DOM |

> [!tip]
> Hầu hết scripts nên dùng `defer`. Chỉ dùng `async` cho scripts hoàn toàn độc lập (analytics, ads).
> Xem thêm: [[Rendering Pipeline#Preload Scanner]] — tại sao browser vẫn tải script song song

---

## Core Web Vitals — Metrics cần quan tâm

| Metric | Đo gì | Mục tiêu | Cải thiện bằng |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | Thời gian element lớn nhất hiển thị | < 2.5s | Preload images, inline critical CSS, CDN |
| **INP** (Interaction to Next Paint) | Độ trễ khi tương tác | < 200ms | Break long tasks, `requestIdleCallback` |
| **CLS** (Cumulative Layout Shift) | Mức độ layout bị "nhảy" | < 0.1 | Set width/height cho images, font-display |

---

## Performance Checklist

- [ ] **Minimize Critical Resources**: Giảm CSS/JS blocking render
- [ ] **Optimize Images**: WebP/AVIF, lazy loading, responsive `srcset`
- [ ] **Code Splitting**: Dynamic `import()` để tải code theo nhu cầu
- [ ] **Compress**: Brotli > Gzip cho text resources
- [ ] **Cache**: `Cache-Control` headers phù hợp, Service Worker
- [ ] **Reduce DOM size**: Tránh DOM quá sâu (>1500 nodes gây chậm)
- [ ] **Use `transform`/`opacity`** cho animations thay vì thuộc tính trigger layout
- [ ] **`will-change`**: Dùng tiết kiệm, chỉ cho elements thực sự cần GPU layer
- [ ] **`content-visibility: auto`**: Defer render cho off-screen content
- [ ] **Lazy load**: `loading="lazy"` cho images và iframes ngoài viewport

---

## Công cụ debug hiệu suất

| Tool | Mục đích |
|---|---|
| Chrome DevTools → **Performance** tab | Record rendering pipeline |
| Chrome DevTools → **Layers** panel | Xem composite layers |
| Chrome DevTools → **Network** tab | Phân tích waterfall |
| **Lighthouse** | Audit tổng quát (Performance, SEO, Accessibility) |
| **WebPageTest** | Test từ nhiều locations, so sánh film strips |

---

## Liên kết

- Rendering: [[Rendering Pipeline]] — Layout, Paint, Composite costs
- JS: [[JavaScript Engine]] — Event Loop blocking, long tasks
- Network: [[Networking Layer]] — Caching, resource hints, HTTP/2-3
