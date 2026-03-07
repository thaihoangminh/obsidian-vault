---
tags:
  - browser
  - learning
  - methodology
  - spaced-repetition
date: 2026-03-06
aliases:
  - Browser Learning Guide
  - Phương pháp ghi nhớ
---

# 🧠 Phương Pháp Học Browser Internals

> *Biến kiến thức thành "của mình" = **Hiểu sâu + Nhớ lâu + Áp dụng được***

Quay lại: [[How Browsers Work MOC]]

---

## Nguyên tắc cốt lõi

```
Đọc xong → quên 90% sau 1 tuần
Đọc + ghi chú → quên 70%
Đọc + giải thích lại → quên 40%
Đọc + thực hành + dạy lại → nhớ 90%+
```

> [!important]
> Không cố nhớ tất cả cùng lúc. Chia nhỏ, học theo layer, lặp lại có khoảng cách.

---

## Bước 1: Xây Mental Model Map

Vẽ **bằng tay trên giấy** (không dùng tool) — hành động viết tay giúp não encode sâu hơn.

### Vẽ 3 bản đồ chính

**Map 1 — "Hành trình của 1 URL"** → xem [[Navigation Flow]]

```
URL → DNS → TCP → TLS → HTTP → HTML bytes
                                    ↓
                          Rendering Pipeline
                                    ↓
                              Pixels on screen
```

**Map 2 — "Rendering Pipeline"** → xem [[Rendering Pipeline]]

```
HTML → DOM ─────┐
                 ├→ Render Tree → Layout → Paint → Composite → Display
CSS  → CSSOM ───┘
```

**Map 3 — "Event Loop"** → xem [[JavaScript Engine]]

```
Call Stack → [hết việc] → Microtask Queue (drain hết)
                        → requestAnimationFrame
                        → Render
                        → 1 Macrotask
                        → lặp lại
```

> [!tip]
> **Ngày 1**: Vẽ Map 1. **Ngày 2**: Vẽ lại Map 1 không nhìn, rồi vẽ Map 2. **Ngày 3**: Vẽ lại Map 1+2, rồi vẽ Map 3.

---

## Bước 2: Active Recall — Flashcard tự hỏi

Tự trả lời **không nhìn tài liệu**. Đánh dấu câu chưa trả lời được để ôn lại.

### Navigation & Network → [[Navigation Flow]], [[Networking Layer]]

| # | Câu hỏi | ✓ |
|---|---|---|
| 1 | Khi nhập URL, browser kiểm tra gì đầu tiên? | ☐ |
| 2 | DNS resolution đi qua bao nhiêu tầng cache? Kể tên? | ☐ |
| 3 | TCP handshake cần mấy bước? TLS 1.3 cần mấy RTT? | ☐ |
| 4 | HTTP/2 khác HTTP/1.1 ở những điểm gì? HTTP/3 dùng gì thay TCP? | ☐ |
| 5 | `dns-prefetch`, `preconnect`, `preload`, `prefetch` khác nhau thế nào? | ☐ |

### Rendering Pipeline → [[Rendering Pipeline]]

| # | Câu hỏi | ✓ |
|---|---|---|
| 6 | 6 bước của Rendering Pipeline là gì? Theo thứ tự? | ☐ |
| 7 | CSS là render-blocking hay parser-blocking? Script thường thì sao? | ☐ |
| 8 | Preload Scanner là gì, hoạt động khi nào? | ☐ |
| 9 | Thay đổi `width` trigger những bước nào? `color`? `transform`? | ☐ |
| 10 | Tại sao animation bằng `transform` mượt hơn `left`? | ☐ |

### JavaScript Engine → [[JavaScript Engine]]

| # | Câu hỏi | ✓ |
|---|---|---|
| 11 | V8 gồm 2 thành phần chính nào? Vai trò? | ☐ |
| 12 | Microtask vs Macrotask: cái nào ưu tiên hơn? Cho ví dụ mỗi loại? | ☐ |
| 13 | `async` vs `defer`: khác nhau thế nào? Khi nào dùng cái nào? | ☐ |
| 14 | Cho đoạn code: `console.log, setTimeout, Promise.then` — output gì? | ☐ |

### Security → [[Browser Security]]

| # | Câu hỏi | ✓ |
|---|---|---|
| 15 | Same-Origin Policy là gì? "Origin" gồm những thành phần nào? | ☐ |
| 16 | CORS hoạt động thế nào? Preflight request là gì? | ☐ |
| 17 | XSS, CSRF là gì và phòng chống bằng cách nào? | ☐ |

> **Spaced Repetition**: Ngày 1 → Ngày 2 → Ngày 4 → Ngày 7 → Ngày 14 → Ngày 30

---

## Bước 3: Thực hành Hands-on

### Lab 1: Quan sát Navigation Flow
```
1. Mở Chrome DevTools → Network tab
2. Bật "Disable cache"
3. Truy cập 1 trang bất kỳ
4. Click vào main document request
5. Xem Timing tab → Stalled, DNS, TCP, TLS, TTFB, Content Download
6. TỰ GHI CHÚ mỗi phase tương ứng với bước nào trong [[Navigation Flow]]
```

### Lab 2: Quan sát Rendering Pipeline
```
1. DevTools → Performance tab → Record
2. Reload trang
3. Xem flamechart: Parse HTML → Recalculate Style → Layout → Paint → Composite
4. Thử đổi CSS (width vs transform) và so sánh
5. Đối chiếu với [[Rendering Pipeline#Tổng kết: Chi phí của mỗi thay đổi CSS]]
```

### Lab 3: Event Loop trực quan
```javascript
// Paste vào Console, đoán output trước khi chạy
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
requestAnimationFrame(() => console.log('D'));
console.log('E');
// Đáp án: A, E, C, D, B (D có thể trước hoặc sau B tùy browser)
// Xem giải thích: [[JavaScript Engine#Thứ tự ưu tiên trong Event Loop]]
```

### Lab 4: Trải nghiệm CORS
```javascript
// Mở Console ở bất kỳ trang nào
fetch('https://api.github.com/users/octocat')
  .then(r => r.json()).then(console.log);  // ✅ GitHub cho phép CORS

fetch('https://www.google.com')
  .then(r => r.text()).then(console.log);  // ❌ CORS error
// Xem giải thích: [[Browser Security#CORS (Cross-Origin Resource Sharing)]]
```

### Lab 5: Đo Layout vs Composite animation
```html
<div id="box" style="width:100px;height:100px;background:red;position:absolute"></div>
<script>
  // Test 1: Layout thrashing (chậm)
  // setInterval(() => box.style.left = Math.random()*500 + 'px', 16);

  // Test 2: Composite only (mượt)
  // setInterval(() => box.style.transform = `translateX(${Math.random()*500}px)`, 16);
</script>
```

---

## Bước 4: Kỹ thuật Feynman

> *"Nếu bạn không thể giải thích đơn giản, bạn chưa hiểu đủ sâu."*

Viết lại bằng lời của mình cho 4 chủ đề (mỗi cái 3-5 câu):

- [ ] "Chuyện gì xảy ra khi nhập URL vào browser?" → [[Navigation Flow]]
- [ ] "Tại sao CSS nên ở `<head>` còn JS nên dùng `defer`?" → [[Web Performance Optimization]]
- [ ] "Event Loop hoạt động như thế nào?" → [[JavaScript Engine]]
- [ ] "Tại sao animation bằng `transform` mượt hơn `left/top`?" → [[Rendering Pipeline]]

---

## Bước 5: Lộ Trình 4 Tuần

| Tuần | Focus | Hành động |
|---|---|---|
| **Tuần 1** | [[Navigation Flow]] + [[Rendering Pipeline]] | Vẽ Map 1+2, Labs 1+2, Flashcards #1-10 |
| **Tuần 2** | [[JavaScript Engine]] + Event Loop | Vẽ Map 3, Labs 3+5, Flashcards #11-14, Feynman Event Loop |
| **Tuần 3** | [[Networking Layer]] + [[Browser Storage]] + [[Browser Security]] | Lab 4, Flashcards #5, #15-17, Feynman CORS |
| **Tuần 4** | Tổng ôn + Dạy lại | Vẽ lại tất cả Maps từ trí nhớ, giải thích cho đồng nghiệp hoặc viết blog |

### Spaced Repetition Schedule

```
Học xong → Ôn sau 1 ngày → 3 ngày → 7 ngày → 14 ngày → 30 ngày
   📖         🔁            🔁        🔁         🔁          🔁
```

---

## 5 Quy tắc vàng

| # | Quy tắc | Tại sao hiệu quả |
|---|---|---|
| 1 | **Vẽ tay, không dùng tool** | Viết tay kích hoạt encoding sâu hơn gõ |
| 2 | **Tự nhớ lại trước, rồi mới kiểm tra** | Active recall > passive reading gấp 3x |
| 3 | **Ôn theo khoảng cách tăng dần** | Spaced repetition chống quên hiệu quả nhất |
| 4 | **Thực hành trên DevTools** | Kinh nghiệm > lý thuyết |
| 5 | **Giải thích cho người khác** | Feynman technique bộc lộ lỗ hổng hiểu biết |

> [!caution] Anti-pattern phổ biến
> Đọc đi đọc lại tài liệu = ảo tưởng "tôi nhớ rồi". Phải **tự recall** (không nhìn) mới biết mình thực sự nhớ hay không.
