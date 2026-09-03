# Rubric loại bài — Low-Level Design (từ `low-level-design-writing`)

Mỗi tiêu chí: **0 / 0.5 / 1**. Tổng 7 mục → quy về thang 10 (nhân 10/7).

| # | Tiêu chí | Blocker? |
|---|----------|:--------:|
| L1 | Bắt đầu từ **yêu cầu & use case**, không vẽ class trước. | |
| L2 | **Chia trách nhiệm rõ, không God class** (SRP). | |
| L3 | Có **class diagram** khớp với code minh họa. | |
| L4 | Dùng **design pattern đúng chỗ, có lý do** (không nhồi cho "trông pro"). | |
| L5 | **Tên pattern chính xác** (Factory vs Abstract Factory, Strategy vs State...). | 🔴 (nếu gọi sai tên/khái niệm pattern) |
| L6 | Code minh họa **chạy được** và thể hiện quan hệ giữa các class. | 🔴 (nếu code sai) |
| L7 | Tuân **SOLID** + có **bài toán mở rộng** kiểm chất lượng thiết kế. | |

## Điểm trượt điển hình của model yếu
- Vẽ class diagram trước khi rõ yêu cầu (L1).
- God class ôm hết logic (L2).
- Nhồi pattern không lý do, hoặc gọi sai tên pattern (L4, L5 🔴).
- Thiếu bài toán mở rộng (L7).

## Cách quy điểm
`điểm loại bài = (tổng 7 mục) × 10 / 7`. Ghi rõ mục 🔴 vi phạm để áp trần 4/10.
