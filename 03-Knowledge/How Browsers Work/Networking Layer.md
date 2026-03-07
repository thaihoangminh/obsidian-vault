---
tags:
  - browser
  - networking
  - http
  - caching
date: 2026-03-06
aliases:
  - HTTP
  - Browser Network
  - Caching
---

# 🌐 Networking Layer

> *Cách browser giao tiếp với server — từ HTTP versions đến caching strategy.*

Quay lại: [[How Browsers Work MOC]] | Liên quan: [[Navigation Flow]]

---

## HTTP/1.1 vs HTTP/2 vs HTTP/3

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| **Protocol** | TCP | TCP | **QUIC (UDP)** |
| **Multiplexing** | ❌ (1 request/connection) | ✅ Streams | ✅ Streams |
| **Head-of-line blocking** | ✅ Có (TCP level) | ⚠️ Vẫn có ở TCP | ❌ Không |
| **Header compression** | ❌ | ✅ HPACK | ✅ QPACK |
| **Server Push** | ❌ | ✅ | ✅ |
| **Connection setup** | TCP + TLS = 3 RTT | TCP + TLS = 2-3 RTT | **1 RTT** (0-RTT resumption) |

---

## Resource Loading Priority

Browser ưu tiên tải resource theo thứ tự:

```
1. 🔴 Highest:  Main HTML document
2. 🟠 High:     CSS trong <head>, Fonts (@font-face), Preload
3. 🟡 Medium:   Synchronous <script> trong <head>
4. 🟢 Low:      Images trong viewport, async scripts
5. 🔵 Lowest:   Images ngoài viewport, prefetch, defer scripts
```

---

## Resource Hints — Kiểm soát tải trước

```html
<!-- DNS resolution sớm -->
<link rel="dns-prefetch" href="//api.example.com">

<!-- Kết nối sớm (DNS + TCP + TLS) -->
<link rel="preconnect" href="https://cdn.example.com">

<!-- Tải resource với độ ưu tiên cao -->
<link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin>

<!-- Tải trước trang tiếp theo trong lúc idle -->
<link rel="prefetch" href="/next-page.html">

<!-- Render trước toàn bộ trang (Chrome) -->
<link rel="prerender" href="/likely-next-page.html">
```

---

## Caching — Hệ thống cache đa tầng

```
Request → Service Worker Cache
       → Memory Cache (nhanh nhất, bị xóa khi đóng tab)
       → Disk Cache (HTTP Cache, theo Cache-Control headers)
       → Push Cache (HTTP/2 Server Push, tồn tại trong session)
       → Network Request (nếu tất cả đều miss)
```

### Cache-Control headers quan trọng

```
Cache-Control: max-age=31536000, immutable   → Cache 1 năm, không revalidate
Cache-Control: no-cache                       → Luôn revalidate với server (dùng ETag)
Cache-Control: no-store                       → Không cache gì cả
Cache-Control: stale-while-revalidate=60      → Dùng cache cũ, revalidate ngầm
```

---

## Liên kết

- Flow: [[Navigation Flow]] — DNS, TCP, TLS, HTTP trong context navigation
- Storage: [[Browser Storage]] — Cache API và các storage khác
- Tối ưu: [[Web Performance Optimization]] — Preload, prefetch strategies
