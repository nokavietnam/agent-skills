# Rubric loại bài — Tutorial (từ `tutorial-writing`)

Mỗi tiêu chí: **0 / 0.5 / 1**. Tổng 8 mục → quy về thang 10 (nhân 10/8).

| # | Tiêu chí | Blocker? |
|---|----------|:--------:|
| T1 | Nêu **kết quả cuối ở đầu** (đọc xong làm được gì). | |
| T2 | Có **Prerequisites** ghi rõ (kèm cách kiểm / phiên bản). | |
| T3 | Các bước **đánh số**, đi tuần tự, không nhảy bước. | |
| T4 | **Mỗi bước quan trọng có cách kiểm chứng** (lệnh Verify để xác nhận đúng). | |
| T5 | Code/lệnh **chạy được** và giải thích "vì sao", không chỉ "gõ cái này". | 🔴 (nếu code/lệnh sai) |
| T6 | Có phần **xử lý lỗi thường gặp** (troubleshooting). | |
| T7 | **Ghi/ghim phiên bản** (ngôn ngữ, image, CLI); không dùng `latest` mù mờ. | |
| T8 | Có **bước tiếp theo** / link nội bộ liên quan. | |

## Điểm trượt điển hình của model yếu
- Nhảy bước, giả định người đọc biết trước (T3).
- Không có bước kiểm chứng — người đọc không biết mình đúng chưa (T4).
- Dùng `latest` không ghi phiên bản (T7).
- Thiếu troubleshooting (T6); lệnh sai (T5 🔴).

## Cách quy điểm
`điểm loại bài = (tổng 8 mục) × 10 / 8`. Ghi rõ mục 🔴 vi phạm để áp trần 4/10.
