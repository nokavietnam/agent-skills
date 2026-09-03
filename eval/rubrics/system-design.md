# Rubric loại bài — System Design (từ `system-design-writing`)

Mỗi tiêu chí: **0 / 0.5 / 1**. Tổng 8 mục → quy về thang 10 (nhân 10/8).

| # | Tiêu chí | Blocker? |
|---|----------|:--------:|
| S1 | Bắt đầu từ **yêu cầu (functional + non-functional)**, không nhảy vào giải pháp. | |
| S2 | Có **ước lượng quy mô** với **giả định nêu rõ** và phép tính trình bày. | |
| S3 | Ước lượng đánh dấu là **bậc độ lớn**, không bịa số như đo thật. | 🔴 (nếu bịa số như thật) |
| S4 | **Số liệu trình bày rõ:** đơn vị đầy đủ, dấu phân cách không nhập nhằng. | |
| S5 | Có **sơ đồ kiến trúc** khớp mô tả (+ alt text nếu là ảnh). | |
| S6 | Có **API/data model** và lý do chọn (SQL/NoSQL...). | |
| S7 | **Đào sâu trade-off** cho các quyết định (mỗi quyết định nêu phương án thay thế). | |
| S8 | Khái niệm lý thuyết (CAP, consistency...) **phát biểu chính xác**. | 🔴 (nếu sai khái niệm) |

## Điểm trượt điển hình của model yếu
- Liệt kê công nghệ ("dùng Kafka, Redis, Cassandra") trước khi rõ yêu cầu (S1).
- Ước lượng không có giả định hoặc bịa QPS như đo được (S2, S3 🔴).
- Số liệu nhập nhằng dấu phân cách / thiếu đơn vị (S4).
- Trade-off hời hợt "cái nào cũng được" (S7); phát biểu sai CAP (S8 🔴).

## Cách quy điểm
`điểm loại bài = (tổng 8 mục) × 10 / 8`. Ghi rõ mục 🔴 vi phạm để áp trần 4/10.
