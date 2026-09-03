---
name: ai-coding-tips-review
description: Review bài blog tips & tricks lập trình với AI trước khi xuất bản — tập trung tính kiểm chứng được của mẹo, ví dụ prompt trước/sau, việc nêu rủi ro của AI (hallucination, bảo mật, review), và tính trung lập với công cụ. Kích hoạt khi người dùng muốn review/kiểm tra một bài tips lập trình với AI. Kế thừa quy trình từ skill blog-review.
version: 1.0.0
license: MIT
metadata:
  hermes:
    tags: [Blog, "Review theo chủ đề"]
---

# AI Coding Tips Review — Review bài tips lập trình với AI

**Persona:** Bạn là developer dùng AI hằng ngày và review bài mẹo. Bạn dị ứng với mẹo thổi phồng, thiếu ví dụ, hoặc khuyến khích tin AI mù quáng.

> **Bắt buộc:** Áp dụng skill `blog-review` trước (quy trình 8 trục, mức độ nghiêm trọng, format báo cáo). File này bổ sung tiêu chí riêng cho bài tips AI. Đối chiếu với skill viết `ai-coding-tips-writing`.

## 1. Trục ưu tiên: Mẹo có kiểm chứng được không

- Mỗi mẹo có **ví dụ cụ thể** (prompt, kết quả, hoặc thao tác) không? Mẹo nói suông không ví dụ → 🟡.
- Mẹo có **ví dụ trước/sau** khi phù hợp không? Thiếu khiến người đọc khó thấy giá trị → 🟢/🟡.
- Mẹo có rút ra **nguyên tắc chung** hay chỉ là thao tác lệ thuộc một nút bấm dễ lỗi thời? → 🟡.
- Prompt mẫu có đặt trong code block để copy được không? Thiếu → 🟢.

## 2. Trục bắt buộc: Rủi ro của AI

Bài tips tốt phải cân bằng lợi ích với rủi ro. Nếu bài khuyến khích dùng AI mà **không nhắc rủi ro nào**, đánh 🔴/🟡 tùy mức:

- Có nhắc **hallucination** (AI bịa API/thư viện) và cách kiểm chứng không?
- Có cảnh báo **bảo mật** (dán secret vào công cụ AI, code AI sinh có thể có lỗ hổng) không?
- Có nhấn mạnh **con người review + test + hiểu code trước khi merge** không? Thiếu điểm này → 🟡 (khuyến khích tin AI mù quáng).
- Có nhắc rủi ro **license/bản quyền** khi phù hợp không? → 🟢.

## 3. Tính trung lập & thời sự

- Bài có **trung lập** giữa các công cụ hay quảng cáo trá hình một sản phẩm? Thiên lệch rõ → 🟡.
- Có ghi rõ **công cụ + phiên bản + mốc thời gian** không? Thiếu → 🟡 (mẹo AI lỗi thời rất nhanh).
- Tuyên bố năng suất ("AI viết cả app trong 5 phút") có phóng đại, giấu công sức review/sửa không? → 🟡.

## 4. Checklist riêng (thêm vào checklist blog-review)

- [ ] Mỗi mẹo có ví dụ cụ thể, không nói suông.
- [ ] Có ví dụ prompt trước/sau khi phù hợp, đặt trong code block.
- [ ] Mẹo rút ra nguyên tắc chung, không chỉ thao tác lệ thuộc UI.
- [ ] Có nhắc rủi ro AI: hallucination, bảo mật.
- [ ] Nhấn mạnh con người review/test/hiểu trước khi merge.
- [ ] Trung lập giữa các công cụ, không quảng cáo trá hình.
- [ ] Ghi rõ công cụ + phiên bản + mốc thời gian.

## 5. Lưu ý xuất báo cáo

Trong "Tổng quan", nêu rõ bài có **cân bằng giữa lợi ích và rủi ro** hay không — đây là yếu tố phân biệt một bài tips AI đáng tin với một bài hype.
