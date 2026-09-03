# Rubric loại bài — Backend (từ `backend-engineering-writing`)

Mỗi tiêu chí: **0 / 0.5 / 1**. Tổng 7 mục → quy về thang 10 (nhân 10/7).

| # | Tiêu chí | Blocker? |
|---|----------|:--------:|
| B1 | Mọi code block **chạy được / gần chạy được** và **khai báo ngôn ngữ**. | 🔴 (nếu sai/không chạy) |
| B2 | Code **không chứa anti-pattern bảo mật** (nối chuỗi SQL, hardcode secret, thiếu validate input). | 🔴 |
| B3 | **Xử lý lỗi hợp lý**, không nuốt lỗi trong ví dụ dạy học. | |
| B4 | **Tuyên bố kỹ thuật chính xác** (hành vi DB/thư viện/ngôn ngữ đúng); ghi rõ phiên bản khi cần. | 🔴 (nếu sai sự thật kỹ thuật) |
| B5 | Có nêu **trade-off** và **khi nào KHÔNG nên dùng**. | |
| B6 | Số liệu performance (nếu có) **kèm điều kiện đo** (phần cứng, dữ liệu, công cụ). | |
| B7 | Sơ đồ (nếu có) **khớp mô tả** và có **alt text**. | |

## Điểm trượt điển hình của model yếu
- Mô tả sai hành vi Postgres/`ON CONFLICT` (B4 🔴).
- Code thiếu import/không khai báo ngôn ngữ (B1).
- Quên hoàn toàn phần trade-off / "khi nào không dùng" (B5).
- Hardcode secret trong ví dụ (B2 🔴).

## Cách quy điểm
`điểm loại bài = (tổng 7 mục) × 10 / 7`. Ghi rõ mục 🔴 vi phạm để áp trần 4/10.
