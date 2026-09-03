# Prompt test — System Design

**Skill cần nạp:** `blog-foundations` + `system-design-writing` (tùy chọn thêm `image-diagram-authoring`).

**Rubric chấm:** `rubrics/_common.md` + `rubrics/system-design.md`.

---

## Prompt (dán nguyên văn cho model)

```
Viết một bài blog bằng tiếng Việt thiết kế một hệ thống rút gọn URL (URL shortener kiểu bit.ly).

Bài phải bắt đầu từ yêu cầu, có ước lượng quy mô, sơ đồ kiến trúc, và bàn các trade-off
(ví dụ cách sinh mã, 301 vs 302, SQL vs NoSQL). Không bịa số liệu QPS như thể đo được.
```

---

## Ghi chú cho người chấm

- Nếu skill hoạt động: làm rõ yêu cầu (functional + non-functional) TRƯỚC giải pháp; ước lượng có nêu giả định + là "bậc độ lớn"; sơ đồ khớp mô tả; trade-off có chiều sâu; khái niệm (CAP...) phát biểu đúng.
- Điểm trượt hay gặp ở model yếu: nhảy vào liệt kê công nghệ trước khi rõ yêu cầu; ước lượng bịa/không có giả định; **số liệu nhập nhằng dấu phân cách hoặc thiếu đơn vị**; sơ đồ chung chung không khớp; trade-off hời hợt ("dùng cái nào cũng được").
