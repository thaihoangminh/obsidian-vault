---
tags:
  - browser
  - storage
  - cookies
  - indexeddb
date: 2026-03-06
aliases:
  - Web Storage
  - Client-side Storage
---

# 💾 Browser Storage

> *Các cơ chế lưu trữ dữ liệu phía client — khi nào dùng gì?*

Quay lại: [[How Browsers Work MOC]]

---

## So sánh các loại Storage

| Storage | Dung lượng | Lifetime | Scope | Accessible from |
|---|---|---|---|---|
| **Cookies** | ~4KB / cookie | Có expiry | Per domain + path | Server + Client |
| **localStorage** | ~5-10MB | Vĩnh viễn | Per origin | Client only |
| **sessionStorage** | ~5-10MB | Đóng tab | Per origin + tab | Client only |
| **IndexedDB** | Hàng trăm MB+ | Vĩnh viễn | Per origin | Client only |
| **Cache API** | Hàng trăm MB+ | Vĩnh viễn | Per origin | Client (Service Worker) |

> [!note] Origin là gì?
> **Origin** = `scheme + domain + port`. Ví dụ: `https://example.com:443` và `http://example.com:80` là hai origin khác nhau, không thể truy cập storage lẫn nhau.
> Xem thêm: [[Browser Security#Same-Origin Policy (SOP)]]

---

## Khi nào dùng gì?

| Use case | Storage phù hợp |
|---|---|
| Auth tokens (cần gửi lên server) | **Cookies** (HttpOnly, Secure, SameSite) |
| User preferences (theme, language) | **localStorage** |
| Form data tạm (chưa submit) | **sessionStorage** |
| Offline data, large datasets | **IndexedDB** |
| Cache API responses, assets | **Cache API** (Service Worker) |

---

## Liên kết

- Bảo mật storage: [[Browser Security]] — SOP, cookie security attributes
- Caching network: [[Networking Layer#Caching — Hệ thống cache đa tầng]]
