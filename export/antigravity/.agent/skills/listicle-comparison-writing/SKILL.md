---
name: listicle-comparison-writing
description: Viết bài dạng danh sách (listicle "N cách/công cụ/mẹo...") và bài so sánh (comparison "X vs Y") cho blog kỹ thuật — cấu trúc mỗi mục nhất quán, tiêu chí so sánh khách quan, bảng so sánh, và khuyến nghị theo ngữ cảnh. Kích hoạt khi người dùng muốn viết listicle, roundup, hoặc so sánh công nghệ/công cụ. Kế thừa quy tắc từ blog-foundations.
---

# Listicle & Comparison Writing — Viết danh sách & so sánh

**Persona:** Bạn là người viết review công nghệ khách quan. Bạn giúp người đọc **chọn đúng** dựa trên tiêu chí rõ ràng, không thiên vị và không liệt kê cho đủ số.

> **Bắt buộc:** Áp dụng `blog-foundations` (đặc biệt: chân thật, xác thực đa nguồn, thông tin mới nhất) + skill viết chuyên biệt theo chủ đề. File này lo **dạng listicle và comparison**.

## 1. Vì sao dạng này kéo traffic

- **Listicle** ("N công cụ...", "N mẹo...") dễ đọc lướt, dễ share, hợp intent informational rộng.
- **Comparison** ("X vs Y") bắt intent commercial — người đọc đang cân nhắc chọn, giá trị cao và dễ xếp hạng nếu làm khách quan.

Cả hai chỉ kéo traffic bền khi **thực sự hữu ích và chính xác**; làm ẩu là bài rỗng, bị Google coi là thin content.

---

## PHẦN A — Listicle

## 2. Cấu trúc listicle

1. **Tiêu đề có số:** "9 [danh từ] để [lợi ích]".
2. **Mở bài:** nêu bài dành cho ai, tiêu chí chọn danh sách này (vì sao là 9 cái này chứ không phải khác).
3. **Mỗi mục một H2, format nhất quán:** tên → nó là gì / làm gì → khi nào dùng → ưu/nhược hoặc ví dụ → (link nếu có).
4. **Kết:** tóm tắt, gợi ý mục nào hợp trường hợp nào.

## 3. Nguyên tắc listicle

- **Chất lượng hơn số lượng:** đừng nhồi mục yếu cho đủ con số. Nếu chỉ có 6 mục xứng đáng, để 6.
- **Nhất quán format** giữa các mục — người đọc lướt dễ.
- **Tiêu chí lựa chọn minh bạch:** nói rõ vì sao mục này vào danh sách.
- **Thứ tự có logic:** theo mức độ phổ biến, độ khó, hay use case — không ngẫu nhiên.
- **Mỗi mục có giá trị gốc:** góc nhìn/kinh nghiệm riêng, không chỉ chép mô tả từ trang chủ sản phẩm.

---

## PHẦN B — Comparison (X vs Y)

## 4. Cấu trúc comparison

1. **Tiêu đề:** "X vs Y: [câu hỏi quyết định]".
2. **TL;DR / Verdict nhanh:** ai nên chọn X, ai nên chọn Y (đặt sớm cho người đọc vội).
3. **Bối cảnh:** X là gì, Y là gì, giải quyết vấn đề gì.
4. **Bảng so sánh** theo tiêu chí (mục 5).
5. **Phân tích từng tiêu chí:** đào sâu điểm khác biệt quan trọng.
6. **Khi nào chọn cái nào:** khuyến nghị theo ngữ cảnh cụ thể (không có "cái tốt nhất" tuyệt đối).
7. **Kết + nguồn.**

## 5. Bảng so sánh khách quan

Chọn **tiêu chí thật sự quan trọng với quyết định**, đo được:

```markdown
| Tiêu chí | X | Y |
| --- | --- | --- |
| Hiệu năng (điều kiện đo) | ... | ... |
| Đường cong học | ... | ... |
| Hệ sinh thái / cộng đồng | ... | ... |
| Chi phí / license | ... | ... |
| Phù hợp nhất cho | ... | ... |
```

- **Mọi số liệu kèm nguồn và điều kiện đo** (theo `blog-foundations`). Không bịa benchmark.
- **So sánh công bằng:** cùng điều kiện, cùng phiên bản (ghi rõ, kiểm tra bản mới nhất).
- **Trung lập:** nêu cả điểm mạnh/yếu của mỗi bên; không dìm một bên để tôn bên kia.

## 6. Khuyến nghị theo ngữ cảnh

Kết luận không phải "X thắng" mà là **"chọn X nếu..., chọn Y nếu..."**. Đây là phần giá trị nhất và là thứ người đọc commercial-intent tìm kiếm.

## 7. Checklist

- [ ] (Listicle) Format các mục nhất quán; không nhồi mục yếu cho đủ số.
- [ ] (Listicle) Nêu rõ tiêu chí đưa vào danh sách; thứ tự có logic.
- [ ] (Comparison) Có verdict nhanh ở đầu và bảng so sánh theo tiêu chí đo được.
- [ ] Mọi số liệu/benchmark có nguồn + điều kiện đo; phiên bản đã kiểm tra mới nhất.
- [ ] Trung lập, nêu cả ưu và nhược của mỗi lựa chọn.
- [ ] Kết luận là khuyến nghị theo ngữ cảnh, không phán "tốt nhất" tuyệt đối.
- [ ] Mỗi mục/bên có giá trị gốc, không chép mô tả marketing.

## 8. Anti-patterns

- Nhồi mục cho đủ con số trong tiêu đề → thin content.
- So sánh thiên vị (thường gặp ở bài tiếp thị trá hình).
- Bịa benchmark hoặc so sánh khác phiên bản/điều kiện.
- Kết luận "X là tốt nhất" mà không nêu ngữ cảnh.
- Chép mô tả từ trang chủ sản phẩm thay vì đánh giá thật.
