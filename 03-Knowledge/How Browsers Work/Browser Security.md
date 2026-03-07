---
tags:
  - browser
  - security
  - cors
  - xss
  - csrf
date: 2026-03-06
aliases:
  - Web Security
  - CORS
  - Same-Origin Policy
---

# 🔒 Browser Security

> *Các mô hình bảo mật giúp browser bảo vệ người dùng.*

Quay lại: [[How Browsers Work MOC]]

---

## Same-Origin Policy (SOP)

Nguyên tắc cốt lõi: **Code từ origin A không thể đọc data từ origin B**.

```
✅ https://example.com/page1  →  https://example.com/page2     (same origin)
❌ https://example.com        →  https://api.example.com        (khác subdomain)
❌ https://example.com        →  http://example.com             (khác scheme)
❌ https://example.com        →  https://example.com:8080       (khác port)
```

> [!note]
> **Origin** = `scheme + domain + port`. Xem thêm: [[Browser Storage]] — storage cũng bị giới hạn bởi origin.

---

## CORS (Cross-Origin Resource Sharing)

Cơ chế cho phép server "mở cửa" cho cross-origin requests:

```
Browser                          Server (api.example.com)
  │                                  │
  │─── Preflight (OPTIONS) ─────────→│
  │    Origin: https://app.com       │
  │    Access-Control-Request-Method │
  │                                  │
  │←── 200 OK ──────────────────────│
  │    Access-Control-Allow-Origin   │
  │    Access-Control-Allow-Methods  │
  │                                  │
  │─── Actual Request (GET) ────────→│
  │←── Response + CORS headers ──────│
```

### Khi nào cần Preflight?

- Method **không phải** GET, HEAD, POST
- Có custom headers
- Content-Type **không phải** `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`

---

## Content Security Policy (CSP)

Kiểm soát nguồn resource nào được phép tải:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'unsafe-inline';
  img-src *;
  connect-src 'self' https://api.example.com;
```

---

## Các mối đe dọa chính

| Tấn công | Mô tả | Biện pháp phòng chống |
|---|---|---|
| **XSS** | Inject malicious script | CSP, input sanitization, escape output |
| **CSRF** | Lừa user thực hiện action | CSRF tokens, SameSite cookies |
| **Clickjacking** | Iframe ẩn để lừa click | `X-Frame-Options`, `frame-ancestors` CSP |
| **MITM** | Chặn/sửa traffic | HTTPS, HSTS |

> [!warning] XSS là mối đe dọa #1
> XSS cho phép attacker chạy JS tùy ý trong context của user, có thể đánh cắp cookies, tokens, và thực hiện mọi action thay user. **Luôn escape output** và sử dụng CSP strict.

---

## Liên kết

- Kiến trúc: [[Kiến trúc Browser]] — Site Isolation ngăn Spectre
- Storage: [[Browser Storage]] — Origin-based storage isolation
- Network: [[Networking Layer]] — HTTPS, TLS handshake
