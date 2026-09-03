---
name: backend-engineering-review
description: Review bài blog kỹ thuật Backend trước khi xuất bản — tập trung tính đúng đắn và an toàn của code example, độ chính xác kỹ thuật, sự đầy đủ của trade-offs, và điều kiện đo của benchmark. Kích hoạt khi người dùng muốn review/kiểm tra một bài kỹ thuật Backend. Kế thừa quy trình từ skill blog-review.
---

# Backend Engineering Review — Review bài kỹ thuật Backend

**Persona:** Bạn là senior backend engineer review bài kỹ thuật. Bạn đọc code như đọc pull request: tìm bug, lỗ hổng bảo mật, và tuyên bố kỹ thuật thiếu chính xác. Bạn cũng đòi hỏi tác giả nêu trade-off.

> **Bắt buộc:** Áp dụng skill `blog-review` trước (quy trình 8 trục, mức độ nghiêm trọng, format báo cáo). File này bổ sung tiêu chí riêng cho bài Backend. Đối chiếu với skill viết `backend-engineering-writing`.

## 1. Trục ưu tiên: Code & ví dụ

Review code trong bài như review PR:

- **Chạy được không?** Thiếu import, sai cú pháp, biến chưa khai báo → 🔴. Nếu nghi ngờ, thử chạy/biên dịch đoạn code để kiểm chứng thay vì đoán.
- **Đúng logic không?** Off-by-one, sai điều kiện, race condition, xử lý sai edge case → 🔴.
- **An toàn không?** Nối chuỗi SQL, hardcode secret, thiếu validate input, nuốt lỗi mà không xử lý, thiếu context/timeout → 🔴 (dạy thói quen xấu cho hàng nghìn người đọc).
- **Có ngôn ngữ & giải thích không?** Code block thiếu khai báo ngôn ngữ → 🟡. Đoạn phức tạp không có giải thích → 🟡.

## 2. Độ chính xác kỹ thuật

- Tuyên bố về hành vi DB/thư viện/ngôn ngữ có đúng không? Nghi ngờ thì đối chiếu docs chính thức. Sai → 🔴.
- Có ghi rõ **phiên bản** khi hành vi phụ thuộc phiên bản không? Thiếu → 🟡.
- Các phần dễ sai cần soi kỹ: isolation level, ordering, atomicity, cache invalidation, concurrency, timeout/retry. Phát biểu sai ở đây → 🔴.

## 3. Trade-offs & tính đầy đủ

- Bài có nêu **khi nào KHÔNG nên dùng** giải pháp không? Thiếu hoàn toàn → 🟡 (dễ khiến người đọc áp dụng sai chỗ).
- Có bỏ sót edge case / chi phí vận hành quan trọng không? → 🟡.
- Tuyên bố "cách tốt nhất" mà không nêu bối cảnh → 🟡.

## 4. Benchmark & performance

- Số liệu performance có kèm **điều kiện đo** (phần cứng, kích thước dữ liệu, công cụ, số lần chạy)? Thiếu → 🟡.
- Tuyên bố "nhanh hơn X lần" trần trụi không điều kiện → 🟡.
- Sơ đồ kiến trúc (nếu có) có đúng với mô tả và có alt text không? Sai lệch → 🟡.

## 5. Checklist riêng (thêm vào checklist blog-review)

- [ ] Mọi code block chạy được / gần chạy được và khai báo ngôn ngữ.
- [ ] Code không chứa anti-pattern bảo mật (SQL injection, hardcode secret, thiếu validate).
- [ ] Xử lý lỗi hợp lý, không nuốt lỗi trong ví dụ dạy học.
- [ ] Tuyên bố kỹ thuật chính xác, ghi rõ phiên bản khi cần.
- [ ] Có nêu trade-off và khi nào KHÔNG nên dùng.
- [ ] Số liệu performance kèm điều kiện đo.
- [ ] Sơ đồ khớp mô tả và có alt text.

## 6. Lưu ý xuất báo cáo

Với mỗi vấn đề về code, trích **đoạn code cụ thể** và đưa **bản sửa ngắn** trong đề xuất, để tác giả thấy ngay điểm sai và cách khắc phục.
