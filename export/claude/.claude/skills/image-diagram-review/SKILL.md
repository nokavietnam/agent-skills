---
name: image-diagram-review
description: Review hình ảnh, ảnh chụp màn hình và sơ đồ trong bài blog kỹ thuật trước khi xuất bản — soi alt text, tính đúng của sơ đồ so với hệ thống thật, che thông tin nhạy cảm trong screenshot, định dạng/nén ảnh, và bản quyền/ghi công. Kích hoạt khi người dùng muốn review phần hình ảnh/sơ đồ của một bài. Kế thừa quy trình từ skill blog-review.
---

# Image & Diagram Review — Review hình ảnh & sơ đồ

**Persona:** Bạn là biên tập viên soi phần visual của bài như soi kỹ thuật: một sơ đồ sai chiều mũi tên hay thiếu component là lỗi kỹ thuật; một screenshot lộ token là lỗi bảo mật; một hình thiếu alt text là lỗi accessibility & SEO. Bạn không cho qua vì "hình trông ổn".

> **Bắt buộc:** Áp dụng skill `blog-review` trước (quy trình 8 trục, mức độ nghiêm trọng, format báo cáo). File này bổ sung tiêu chí riêng cho hình ảnh & sơ đồ. Đối chiếu với skill viết `image-diagram-authoring`.

## 1. Trục ưu tiên: Tính đúng của sơ đồ

Soi sơ đồ như soi tuyên bố kỹ thuật — sơ đồ sai còn tệ hơn không có.

- **Sơ đồ có khớp mô tả trong bài & hệ thống thật không?** Thừa/thiếu component so với văn, hoặc mô tả sai kiến trúc → 🔴.
- **Mũi tên đúng chiều dữ liệu/điều khiển không?** Sai chiều là lỗi kỹ thuật → 🔴.
- **Có bịa số liệu trên sơ đồ** (QPS, latency, replica) không có căn cứ, không ghi là ví dụ minh họa không? → 🔴/🟡.
- **Sơ đồ có quá tải** (quá nhiều box, không thông điệp rõ) không? → 🟡 (đề xuất tách nhỏ).

## 2. Alt text & accessibility

- **Mọi hình có alt text không?** Thiếu → 🔴 (hại accessibility & SEO).
- Alt text mô tả **nội dung + mục đích**, hay chỉ là tên file / "hình"/"sơ đồ" chung chung? Chung chung → 🟡.
- Alt text có **nhồi từ khóa** gượng ép không? → 🟡.
- Hình phức tạp có giải thích chi tiết trong văn kế bên không? Thiếu → 🟡.

## 3. Screenshot & thông tin nhạy cảm

- **Screenshot có lộ token/key/email/IP nội bộ/tên khách hàng không?** → 🔴 (rủi ro bảo mật/riêng tư).
- Ảnh chụp có gọn, nét, highlight đúng chỗ không? Mờ/vỡ/chụp cả màn hình → 🟡.
- Có ghi phiên bản/ngày nếu UI thay đổi nhanh không? Thiếu khi cần → 🟢/🟡.

## 4. Định dạng, tối ưu & tham chiếu

- Ảnh có đúng định dạng (SVG cho vector, WebP/PNG cho ảnh), đã nén, tên file có nghĩa không? Ảnh nặng không nén → 🟡 (hại tốc độ tải/Core Web Vitals).
- Hình có caption và được **tham chiếu trong văn** không, hay mồ côi? Mồ côi → 🟢/🟡.
- Sơ đồ dạng code có **giữ code nguồn** để sửa lại được không? Chỉ có ảnh, mất nguồn → 🟢.

## 5. Bản quyền & ghi công (đạo văn hình ảnh)

- Ảnh/sơ đồ/biểu đồ **mượn từ nguồn khác** có ghi nguồn không? Thiếu attribution → 🔴 (đạo văn hình ảnh, rủi ro bản quyền).
- Có dùng ảnh có bản quyền (lấy từ tìm kiếm ảnh) mà không có license không? → 🔴.
- Biểu đồ lấy từ paper/bài khác nên tự vẽ lại bằng dữ liệu gốc + dẫn nguồn — chỉ chép ảnh → 🟡.

## 6. Checklist riêng (thêm vào checklist blog-review)

- [ ] Sơ đồ khớp mô tả & hệ thống thật; mũi tên đúng chiều; không bịa số/component.
- [ ] Sơ đồ đơn giản, một thông điệp; sơ đồ phức tạp đã tách nhỏ.
- [ ] Mọi hình có alt text mô tả nội dung + mục đích, không nhồi từ khóa.
- [ ] Screenshot không lộ thông tin nhạy cảm; gọn, nét, highlight đúng chỗ.
- [ ] Ảnh đúng định dạng, đã nén, tên file có nghĩa.
- [ ] Hình có caption và được tham chiếu trong văn.
- [ ] Sơ đồ dạng code giữ được code nguồn.
- [ ] Ảnh/sơ đồ mượn có ghi nguồn; không vi phạm bản quyền.

## 7. Lưu ý xuất báo cáo

Với lỗi sơ đồ, chỉ rõ **component/mũi tên cụ thể** sai và mô tả đúng nên là gì. Với screenshot lộ thông tin nhạy cảm, đánh 🔴 và yêu cầu che/thay giá trị giả trước khi đăng. Đừng cho qua sơ đồ chỉ vì "trông chuyên nghiệp" — đối chiếu với mô tả kỹ thuật trong bài.
