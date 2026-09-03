# Prompt test — DSA

**Skill cần nạp:** `blog-foundations` + `dsa-writing` (tùy chọn thêm `math-formula-authoring`).

**Rubric chấm:** `rubrics/_common.md` + `rubrics/dsa.md`.

---

## Prompt (dán nguyên văn cho model)

```
Viết một bài blog bằng tiếng Việt giải thích lời giải cho bài toán "Two Sum":
cho mảng số nguyên và một target, trả về chỉ số của hai phần tử cộng lại bằng target.

Bài phải đi từ cách ngây thơ tới cách tối ưu, có phân tích độ phức tạp (big-O) chính xác,
và code chạy được.
```

---

## Ghi chú cho người chấm

- Nếu skill hoạt động: có phát biểu bài toán (input/output/constraints/ví dụ), trực giác trước code, brute-force → tối ưu, **dry-run**, phân tích cả thời gian & không gian *có giải thích*, edge cases.
- Điểm trượt hay gặp ở model yếu: nhảy thẳng vào code tối ưu (học vẹt); phân tích big-O sai hoặc chỉ tuyên bố "O(n)" không giải thích; quên dry-run; quên edge case (mảng rỗng, trùng giá trị, số âm); code sai trên edge case.
