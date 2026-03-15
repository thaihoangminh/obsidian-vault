---
type: tool
tool: Raycast
category: launcher
status: active
platform:
  - macOS
tags:
  - tooling/tool
  - tooling/raycast
updated: 2026-03-15
---

# Raycast

## Purpose
Raycast là launcher và command surface chính cho workflow hằng ngày của tôi.

Tôi dùng Raycast để:
- mở nhanh ứng dụng và tài nguyên thường dùng
- quản lý Quicklinks
- quản lý Snippets
- backup/export cấu hình và dữ liệu để có thể khôi phục hoặc tái sử dụng về sau

## Current storage structure
Hiện tại toàn bộ file liên quan đang được lưu trực tiếp trong cùng thư mục:

- `[[Quicklinks 2026-03-15 08.00.33.json]]`
- `[[Raycast 2026-03-15 08.02.48.rayconfig]]`
- `[[Snippets 2026-03-15 08.13.15.json]]`

## What each file contains

### Raycast full export
- `[[Raycast 2026-03-15 08.02.48.rayconfig]]`
- Đây là bản export tổng thể từ Raycast
- Dùng làm nguồn backup/restore chính
- Nên giữ nguyên file này, không chỉnh sửa thủ công

### Quicklinks export
- `[[Quicklinks 2026-03-15 08.00.33.json]]`
- Chứa danh sách Quicklinks đã export riêng
- Phù hợp để tham chiếu, trích xuất, hoặc chuẩn hóa lại thành note Markdown sau này

### Snippets export
- `[[Snippets 2026-03-15 08.13.15.json]]`
- Chứa danh sách Snippets đã export riêng
- Phù hợp để tham chiếu, trích xuất, hoặc chuẩn hóa lại thành note Markdown sau này

## Current organization approach
Tạm thời tôi đang dùng mô hình lưu trữ đơn giản:

- 1 thư mục cho mỗi công cụ
- file export gốc được giữ nguyên trong thư mục công cụ
- `_Overview.md` đóng vai trò là note mô tả, index, và điểm vào chính

Với Raycast, thư mục hiện tại là:

`90-Systems/Tooling/Raycast/`

## Recommended evolution path
Khi số lượng file tăng lên, có thể tách tiếp thành cấu trúc chi tiết hơn như:

- `Exports/`
- `Quicklinks/`
- `Snippets/`
- `Settings/`

Nhưng ở thời điểm hiện tại, cấu trúc phẳng như đang dùng là hợp lý vì:
- đơn giản
- dễ tìm
- chưa có quá nhiều artifact
- đủ linh hoạt để mở rộng sau

## File naming convention
Quy ước hiện tại:
- giữ nguyên tên file export gốc từ Raycast
- filename có timestamp để dễ theo dõi phiên export
- `_Overview.md` là note trung tâm mô tả toàn bộ thư mục Raycast

## Notes
- `.rayconfig` là artifact quan trọng nhất nếu cần restore Raycast
- `.json` của Quicklinks và Snippets hữu ích cho việc đọc lại dữ liệu hoặc chuyển đổi sang định dạng note trong Obsidian
- chưa cần normalize ngay toàn bộ nội dung; chỉ nên chuyển những Quicklinks hoặc Snippets thực sự quan trọng thành note riêng khi cần

## Related
- [[90-Systems/Tooling]]