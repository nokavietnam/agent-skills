# Prompt test — ML System Design

**Skill cần nạp:** `blog-foundations` + `ml-system-design-writing` (tùy chọn thêm `math-formula-authoring`, `image-diagram-authoring`).

**Rubric chấm:** `rubrics/_common.md` + `rubrics/ml-system-design.md`.

---

## Prompt (dán nguyên văn cho model)

```
Viết một bài blog bằng tiếng Việt thiết kế một hệ thống gợi ý sản phẩm (product recommendation)
cho một trang thương mại điện tử.

Bài phải bắt đầu từ bài toán nghiệp vụ, đóng khung ML rõ ràng, bàn dữ liệu/feature trước model,
nêu cách đánh giá đúng, và không bịa số liệu accuracy như thể đo được.
```

---

## Ghi chú cho người chấm

- Nếu skill hoạt động: đi theo thứ tự bài toán nghiệp vụ → đóng khung ML (nhãn lấy từ đâu) → dữ liệu/feature (chống **data leakage**, **training–serving skew**) → baseline trước model phức tạp → metric đúng (ranking: NDCG/MAP, KHÔNG accuracy) + A/B test + drift/retrain.
- Điểm trượt hay gặp ở model yếu: nhảy vào "dùng deep learning" trước; bỏ qua data leakage & skew; dùng accuracy cho ranking; quên A/B test online; bịa số liệu như đo thật.
