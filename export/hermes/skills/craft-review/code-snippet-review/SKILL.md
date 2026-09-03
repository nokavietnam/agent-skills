---
name: code-snippet-review
description: Review cách trình bày đoạn code trong bài blog kỹ thuật trước khi xuất bản — soi khai báo ngôn ngữ, code chạy được vs minh họa, độ dài & dòng quá dài, output/diff đúng thực tế, secret hardcode, và ghi công code mượn (license). Kích hoạt khi người dùng muốn review phần code block trình bày của một bài. Kế thừa quy trình từ skill blog-review.
version: 1.0.0
license: MIT
metadata:
  hermes:
    tags: [Blog, "Review trình bày (hình ảnh & code)"]
---

# Code Snippet Review — Review cách trình bày code

**Persona:** Bạn review code block trong bài như review PR trước khi hàng nghìn người copy vào production. Bạn bắt code không khai báo ngôn ngữ, code minh họa bị tưởng chạy được, output bịa, secret hardcode, và code mượn không ghi nguồn. Bạn tách bạch lỗi *trình bày* (skill này) với lỗi *logic/bảo mật* (skill chủ đề).

> **Bắt buộc:** Áp dụng skill `blog-review` trước (quy trình 8 trục, mức độ nghiêm trọng, format báo cáo). File này bổ sung tiêu chí riêng cho cách trình bày code. Đối chiếu với skill viết `code-snippet-standards`. Về độ đúng logic & lỗ hổng bảo mật của code, phối hợp với skill review chủ đề (ví dụ `backend-engineering-review`, `dsa-review`).

## 1. Trục ưu tiên: Rõ ràng & chạy được

- **Code block có khai báo ngôn ngữ không?** Thiếu → 🟡 (mất highlight, khó đọc).
- **Rõ code chạy được đầy đủ hay minh họa/lược không?** Trộn pseudo-code với code thật mà không nói, khiến người đọc paste vào rồi lỗi → 🔴.
- **Phần cắt bớt có đánh dấu** (`// ...`) và chú thích cắt gì không? Cắt ngầm gây hiểu nhầm → 🟡.
- **Code phụ thuộc phiên bản** có ghi rõ ngôn ngữ/thư viện + phiên bản không? Thiếu khi cần → 🟡.

## 2. Độ dài, cắt gọn & ngữ cảnh

- Đoạn code có **gọn, đúng phần đang bàn** không, hay dán cả file? Dán thừa → 🟡.
- Có **dòng quá dài** phải cuộn ngang (khó đọc trên mobile) không? → 🟡.
- Khi code thuộc file cụ thể, có ghi **đường dẫn/cấu trúc dự án** không? Thiếu khi bài đụng nhiều file → 🟢/🟡.
- Comment giải thích **vì sao** hay chỉ lặp lại cái code đã nói? Comment thừa → 🟢.

## 3. Output, lỗi & diff

- **Output hiển thị có khớp code thật không**, hay bịa đẹp hơn thực tế? Bịa output → 🔴.
- Khi minh họa thay đổi, có dùng **diff** cho dễ thấy không? Thiếu khi hữu ích → 🟢.
- Khi nói code "sẽ lỗi", có đưa **thông báo lỗi thật + cách sửa** không? Chỉ nói suông → 🟡.
- Lệnh shell và output có tách rõ không, hay lẫn lộn khiến copy nhầm? Lẫn → 🟡.

## 4. An toàn trong ví dụ (mức trình bày)

- Có **hardcode secret/token/key thật** trong ví dụ không? → 🔴 (dùng placeholder/biến môi trường).
- Có dạy anti-pattern (nối chuỗi SQL, tắt TLS) **mà không cảnh báo** rõ không? → 🔴.
- Có **nuốt lỗi** (`catch {}` rỗng) trong code dạy học không? → 🟡.

> Lỗi logic/bảo mật *sâu* của code do skill review chủ đề soi; ở đây soi mức trình bày và tín hiệu rõ ràng.

## 5. Ghi công code mượn & license

- Đoạn code **dài, đặc thù** giống nguồn công khai (SO/GitHub/docs) có ghi nguồn không? Thiếu → 🔴 (đạo văn code / rủi ro bản quyền).
- Có dùng code có **license ràng buộc** mà không tuân thủ không? → 🔴.
- Nghi code do AI tái tạo nguyên văn từ nguồn có bản quyền → đối chiếu, yêu cầu ghi công hoặc viết lại → 🟡/🔴.

## 6. Checklist riêng (thêm vào checklist blog-review)

- [ ] Mọi code block khai báo ngôn ngữ.
- [ ] Rõ code chạy được đầy đủ hay minh họa/lược; phần cắt được đánh dấu.
- [ ] Ghi phiên bản ngôn ngữ/thư viện khi code phụ thuộc phiên bản.
- [ ] Đoạn code gọn, không dòng quá dài; ghi đường dẫn file khi cần.
- [ ] Output/lỗi đúng thực tế (không bịa); dùng diff khi minh họa thay đổi.
- [ ] Không hardcode secret; không dạy anti-pattern mà không cảnh báo; không nuốt lỗi.
- [ ] Code mượn có ghi nguồn/kiểm license; đoạn đặc thù không đạo văn.

## 7. Lưu ý xuất báo cáo

Với mỗi vấn đề, trích **đoạn code cụ thể** và đưa bản sửa ngắn (thêm khai báo ngôn ngữ, đánh dấu phần lược, thay secret bằng placeholder, ghi nguồn). Phân biệt rõ lỗi *trình bày* (skill này) và lỗi *logic/bảo mật* (chuyển sang skill review chủ đề) để tác giả biết sửa ở đâu.
