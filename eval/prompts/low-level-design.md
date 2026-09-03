# Prompt test — Low-Level Design (LLD)

**Skill cần nạp:** `blog-foundations` + `low-level-design-writing` (tùy chọn thêm `image-diagram-authoring`, `code-snippet-standards`).

**Rubric chấm:** `rubrics/_common.md` + `rubrics/low-level-design.md`.

---

## Prompt (dán nguyên văn cho model)

```
Viết một bài blog bằng tiếng Việt thiết kế một bãi đỗ xe (parking lot) theo hướng đối tượng (OOP).

Bài phải bắt đầu từ yêu cầu, có class diagram, dùng design pattern đúng chỗ (giải thích lý do,
không nhồi), tuân SOLID, và có bài toán mở rộng để kiểm chất lượng thiết kế.
```

---

## Ghi chú cho người chấm

- Nếu skill hoạt động: bắt đầu từ yêu cầu/use case; chia trách nhiệm rõ (không God class); class diagram khớp code; pattern có *lý do* (không nhồi); code minh họa thể hiện quan hệ class; SOLID + **bài toán mở rộng** (thêm loại xe / đổi biểu phí).
- Điểm trượt hay gặp ở model yếu: vẽ class trước khi rõ yêu cầu; God class ôm hết; nhồi pattern cho "trông pro"; gọi sai tên pattern (Factory vs Abstract Factory, Strategy vs State); thiếu bài toán mở rộng.
