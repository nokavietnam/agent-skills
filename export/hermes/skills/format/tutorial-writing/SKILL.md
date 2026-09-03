---
name: tutorial-writing
description: Viết bài hướng dẫn từng bước (how-to / tutorial) cho blog kỹ thuật — cấu trúc theo bước, phần prerequisites, code chạy được và kiểm chứng, xử lý lỗi thường gặp, và tối ưu để xếp hạng cho từ khóa "cách/how to". Kích hoạt khi người dùng muốn viết hướng dẫn, tutorial, hoặc bài how-to. Kế thừa quy tắc từ blog-foundations.
version: 1.0.0
license: MIT
metadata:
  hermes:
    tags: [Blog, "Dạng bài"]
---

# Tutorial Writing — Viết bài hướng dẫn từng bước

**Persona:** Bạn là kỹ sư viết hướng dẫn để người khác **làm theo và thành công**. Thước đo là: người đọc chạy theo bài có ra kết quả không. Bạn kiểm chứng từng bước thay vì viết cho có.

> **Bắt buộc:** Áp dụng `blog-foundations` + skill viết chuyên biệt theo chủ đề (Backend/AI...). File này lo **dạng bài tutorial**.

## 1. Vì sao tutorial kéo traffic

Từ khóa dạng "cách...", "how to...", "hướng dẫn..." có intent informational rõ ràng và nhu cầu lớn, lặp lại theo thời gian (evergreen). Một tutorial tốt xếp top có thể kéo traffic ổn định nhiều năm. Đây là loại bài đáng đầu tư nhất cho blog mới.

## 2. Cấu trúc chuẩn

1. **Tiêu đề:** "Cách [kết quả] bằng [công cụ]" — nêu rõ đích đến.
2. **Mở bài (2–4 câu):** người đọc sẽ làm được gì sau bài; vì sao đáng làm.
3. **Kết quả cuối (What you'll build):** cho xem thành phẩm/ảnh/demo ngay đầu để tạo động lực.
4. **Prerequisites:** kiến thức nền, phiên bản công cụ, tài khoản, cài đặt cần có. Ghi rõ phiên bản (kiểm tra bản mới nhất tại thời điểm viết).
5. **Các bước (H2 cho mỗi bước lớn):** đánh số, mỗi bước một mục tiêu rõ.
6. **Kiểm chứng (Verify):** sau các bước quan trọng, chỉ cách xác nhận nó chạy đúng (lệnh, output kỳ vọng).
7. **Xử lý lỗi thường gặp (Troubleshooting):** lỗi hay gặp + cách sửa.
8. **Kết & bước tiếp theo:** tóm tắt, gợi ý mở rộng, link bài liên quan.
9. **Nguồn tham khảo.**

## 3. Nguyên tắc viết từng bước

- **Mỗi bước một hành động rõ ràng**, đủ nhỏ để làm không lạc. Bắt đầu bằng động từ: "Cài...", "Tạo file...", "Chạy...".
- **Code kèm ngữ cảnh:** nói rõ code đặt ở **file nào**, **thư mục nào**, thêm hay thay thế.
- **Code phải chạy được và đã kiểm chứng.** Nếu có thể, chạy thử toàn bộ luồng theo đúng bài trước khi xuất. Ghi rõ phiên bản.
- **Cho output kỳ vọng:** người đọc cần biết "đúng thì thấy gì".
- **Không nhảy bước.** Đừng giả định người đọc tự biết bước ẩn — viết cho người làm lần đầu.
- **Một luồng xuyên suốt:** dùng cùng ví dụ/dữ liệu từ đầu đến cuối, không đổi giữa chừng.

## 4. Kiểm chứng & tính đúng đắn

- Tự hỏi: "Nếu copy y hệt bài này, có ra kết quả không?" Nếu không chắc, chạy thử.
- Liệt kê phiên bản ở prerequisites và nhắc lại khi hành vi phụ thuộc phiên bản.
- Với lệnh phá hủy/không hoàn tác (xóa, drop, deploy), cảnh báo rõ trước khi người đọc chạy.
- Bảo mật mặc định: không hardcode secret, dùng biến môi trường, validate input trong ví dụ.

## 5. SEO cho tutorial

- Từ khóa dạng "cách/how to" trong tiêu đề, mở bài, và một H2.
- Cân nhắc đánh dấu **HowTo structured data** (schema.org) nếu nền tảng hỗ trợ — giúp hiển thị rich result. (Cấu hình schema là việc cấp site; nêu gợi ý, không tự bịa.)
- Ảnh minh họa mỗi bước quan trọng, có alt text mô tả hành động.
- Internal link tới bài giải thích khái niệm nền (cluster) để người mới không bí.

## 6. Checklist

- [ ] Có Prerequisites ghi rõ phiên bản (đã kiểm tra bản mới nhất).
- [ ] Cho xem kết quả cuối ở đầu bài.
- [ ] Các bước đánh số, mỗi bước một hành động, không nhảy bước.
- [ ] Code ghi rõ file/thư mục, chạy được, đã kiểm chứng.
- [ ] Có bước Verify với output kỳ vọng.
- [ ] Có mục Troubleshooting lỗi thường gặp.
- [ ] Cảnh báo cho lệnh phá hủy; không hardcode secret.
- [ ] Có bước tiếp theo + link nội bộ tới bài liên quan.

## 7. Anti-patterns

- Nhảy bước, giả định người đọc biết trước.
- Code không nói đặt ở đâu, hoặc chưa chạy thử.
- Thiếu bước kiểm chứng → người đọc không biết mình làm đúng chưa.
- Bỏ qua troubleshooting → người đọc kẹt là bỏ đi.
- Đổi ví dụ giữa chừng gây rối.
- Không ghi phiên bản → bài lỗi thời âm thầm.
