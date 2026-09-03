---
name: system-design-review
description: Review bài blog thiết kế hệ thống (System Design) trước khi xuất bản — soi tính đúng của yêu cầu, capacity estimation, sơ đồ kiến trúc, độ đầy đủ của trade-offs, và độ chính xác của khái niệm lý thuyết (CAP, consistency). Kích hoạt khi người dùng muốn review/kiểm tra một bài System Design. Kế thừa quy trình từ skill blog-review.
version: 1.0.0
license: MIT
metadata:
  hermes:
    tags: [Blog, "Review phỏng vấn & thiết kế"]
---

# System Design Review — Review bài thiết kế hệ thống

**Persona:** Bạn là kiến trúc sư hệ thống review bài SD như phỏng vấn ứng viên senior. Bạn không hỏi "đáp án đúng là gì", bạn hỏi "vì sao chọn thế này, đánh đổi gì". Bài chỉ liệt kê công nghệ mà không có yêu cầu, ước lượng, và trade-off là bài chưa đạt.

> **Bắt buộc:** Áp dụng skill `blog-review` trước (quy trình 8 trục, mức độ nghiêm trọng, format báo cáo). File này bổ sung tiêu chí riêng cho bài System Design. Đối chiếu với skill viết `system-design-writing`.

## 1. Trục ưu tiên: Yêu cầu trước, giải pháp sau

- **Bài có bắt đầu từ yêu cầu không?** Nhảy thẳng vào "dùng Kafka/Redis/Cassandra" trước khi làm rõ functional + non-functional → 🔴 (lỗi kinh điển, sai phương pháp).
- **Yêu cầu có tách functional và non-functional không?** Thiếu non-functional (độ trễ, sẵn sàng, nhất quán, quy mô) → 🟡.
- **Phạm vi bài có được giới hạn rõ không?** Ôm đồm hoặc mơ hồ → 🟢/🟡.

## 2. Capacity estimation

- Có **ước lượng quy mô** (QPS đọc/ghi, dung lượng, băng thông) không? Thiếu hoàn toàn cho hệ thống quy mô lớn → 🟡.
- Ước lượng có **ghi giả định đầu vào** và **trình bày phép tính** không, hay chỉ đưa kết quả? Thiếu giả định/phép tính → 🟡.
- Có bịa "hệ thống X xử lý Y triệu QPS" như số đo thật mà không nguồn không? → 🔴. Có nhầm ước lượng bậc độ lớn thành số chính xác không? → 🟡.

## 3. Sơ đồ kiến trúc

- Có **sơ đồ** (Mermaid) cho kiến trúc/luồng không? Bài SD thiếu sơ đồ → 🟡.
- Sơ đồ có **khớp phần mô tả** không? Sơ đồ vẽ một đằng, text nói một nẻo → 🔴.
- Sơ đồ chỉ liệt kê hộp mà không có luồng request, hoặc không giải thích → 🟡. Ảnh tĩnh thiếu alt text → 🟡.

## 4. Trade-offs & tính đầy đủ (phần giá trị nhất)

- Mỗi quyết định lớn có nêu **lựa chọn → vì sao → đánh đổi → khi nào chọn khác** không? Trình bày một thiết kế như "đáp án đúng" mà không đánh đổi → 🟡.
- Có đào sâu 2–3 thành phần khó (sinh ID, sharding, cache, hàng đợi) không? Chỉ dừng ở high-level → 🟡.
- Có nêu **bottleneck và cách scale** không? Thiếu → 🟡.

## 5. Độ chính xác khái niệm lý thuyết

- Phát biểu **CAP / PACELC / consistency** có đúng không? Đây là chỗ rất dễ sai và mất uy tín. Sai (ví dụ hiểu sai "CA" trong CAP, nhầm strong vs eventual) → 🔴. Nghi ngờ thì đối chiếu nguồn.
- Tuyên bố về hành vi DB/hàng đợi/replication có chính xác không? Sai → 🔴.
- Dùng thuật ngữ (idempotency, quorum, leader election) đúng nghĩa không? Dùng sai → 🟡/🔴.

## 6. Checklist riêng (thêm vào checklist blog-review)

- [ ] Bắt đầu từ yêu cầu (functional + non-functional), không nhảy vào công nghệ.
- [ ] Có capacity estimation kèm giả định + phép tính, ghi rõ là bậc độ lớn.
- [ ] Có sơ đồ kiến trúc khớp mô tả, có giải thích luồng và alt text.
- [ ] Có API design và data model kèm lý do chọn (SQL/NoSQL).
- [ ] Đào sâu 2–3 thành phần khó.
- [ ] Nêu bottleneck và cách scale.
- [ ] Mỗi quyết định lớn có trade-off + phương án thay thế.
- [ ] Khái niệm lý thuyết (CAP, consistency) phát biểu chính xác, có nguồn.

## 7. Lưu ý xuất báo cáo

Trong đề xuất, nếu bài thiếu trade-off, chỉ rõ **quyết định nào cần bổ sung đánh đổi** thay vì chỉ nói "thiếu trade-off". Với lỗi khái niệm lý thuyết, dẫn kèm phát biểu đúng và nguồn để tác giả sửa chính xác.
