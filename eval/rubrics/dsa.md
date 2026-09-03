# Rubric loại bài — DSA (từ `dsa-writing`)

Mỗi tiêu chí: **0 / 0.5 / 1**. Tổng 8 mục → quy về thang 10 (nhân 10/8).

| # | Tiêu chí | Blocker? |
|---|----------|:--------:|
| D1 | **Phát biểu bài toán rõ:** input / output / constraints + ví dụ. | |
| D2 | Có phần **trực giác** trước khi vào code (không nhảy thẳng vào lời giải tối ưu). | |
| D3 | Đi từ **brute-force đến tối ưu** (nếu bài phù hợp). | |
| D4 | Code **khai báo ngôn ngữ, chạy được, đúng trên ví dụ + edge case**. | 🔴 (nếu code sai) |
| D5 | Có **dry-run** trên một ví dụ (bảng/liệt kê bước). | |
| D6 | Phân tích **cả thời gian & không gian**, **có giải thích**, và **đúng**. | 🔴 (nếu big-O sai) |
| D7 | **Liệt kê edge cases** (rỗng, một phần tử, trùng, số âm, tràn...). | |
| D8 | **Rút ra pattern** áp dụng cho bài khác. | |

## Điểm trượt điển hình của model yếu
- Nhảy thẳng vào code tối ưu, bỏ trực giác/brute-force (D2, D3).
- Tuyên bố "O(n)" không giải thích, hoặc tính sai big-O (D6 🔴).
- Quên dry-run (D5).
- Code sai trên edge case rỗng/trùng (D4 🔴).

## Cách quy điểm
`điểm loại bài = (tổng 8 mục) × 10 / 8`. Ghi rõ mục 🔴 vi phạm để áp trần 4/10.
