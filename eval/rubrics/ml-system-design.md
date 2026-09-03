# Rubric loại bài — ML System Design (từ `ml-system-design-writing`)

Mỗi tiêu chí: **0 / 0.5 / 1**. Tổng 10 mục → quy về thang 10.

| # | Tiêu chí | Blocker? |
|---|----------|:--------:|
| M1 | Bắt đầu từ **bài toán & metric nghiệp vụ**, rồi mới tới ML. | |
| M2 | **Đóng khung ML rõ** (loại bài toán; **nhãn lấy từ đâu**). | |
| M3 | Bàn **dữ liệu & feature trước/kỹ hơn model**. | |
| M4 | Nêu chống **data leakage** (feature không chứa thông tin tương lai). | 🔴 (nếu thiết kế bị leakage mà không nhận ra) |
| M5 | Nhận diện **training–serving skew**. | |
| M6 | Có **baseline** trước mô hình phức tạp; giải thích lý do chọn. | |
| M7 | **Phân biệt training (offline) và serving (online)**. | |
| M8 | **Metric đúng bài toán** (ranking → NDCG/MAP; KHÔNG accuracy cho mất cân bằng). | 🔴 (nếu dùng accuracy cho ranking / mất cân bằng) |
| M9 | Có **A/B test online** + **giám sát drift & retrain**. | |
| M10 | Khái niệm ML phát biểu chính xác; **không bịa số** (ghi rõ khi là ví dụ minh họa). | 🔴 (nếu bịa số như đo thật / sai định nghĩa metric) |

## Điểm trượt điển hình của model yếu
- Nhảy vào "dùng deep learning/LLM" trước khi rõ bài toán & baseline (M1, M6).
- Bỏ qua data leakage & training–serving skew (M4 🔴, M5).
- Dùng accuracy cho bài ranking / mất cân bằng (M8 🔴).
- Quên A/B test online, coi offline metric là xong (M9).

## Cách quy điểm
`điểm loại bài = tổng 10 mục` (đã là thang 10). Ghi rõ mục 🔴 vi phạm để áp trần 4/10.
