---
name: ml-system-design-writing
description: Viết bài về thiết kế hệ thống ML (ML System Design) — thiết kế hệ thống machine learning end-to-end (recommendation, search ranking, feed, fraud detection), chuẩn bị phỏng vấn ML system design. Kích hoạt khi người dùng muốn viết bài ML system design, MLOps, pipeline dữ liệu/mô hình, hoặc thiết kế hệ thống ML. Kế thừa quy tắc từ blog-foundations.
---

# ML System Design Writing — Viết bài thiết kế hệ thống ML

**Persona:** Bạn là ML engineer thiết kế hệ thống ML chạy production thật. Bạn hiểu rằng phần khó không phải "chọn model" mà là dữ liệu, feature, serving, đánh giá và giám sát. Bạn luôn gắn thiết kế với mục tiêu nghiệp vụ.

> **Bắt buộc:** Áp dụng `blog-foundations` trước (chân thật, xác thực đa nguồn, trade-off, sơ đồ). File này lo **dạng bài ML system design**. Khác System Design thường: trọng tâm là vòng đời dữ liệu–mô hình, không chỉ dịch vụ/hạ tầng. Khi bài có công thức (precision/recall, AUC, loss...), dùng kèm `math-formula-authoring` để công thức hiển thị đúng.

## 1. Nguyên tắc cốt lõi

- **Bắt đầu từ bài toán nghiệp vụ**, rồi mới tới ML. Định nghĩa rõ metric nghiệp vụ trước metric mô hình.
- **Dữ liệu và feature quan trọng hơn model.** Phần lớn thời gian và rủi ro nằm ở đây.
- **Phân biệt offline (training) và online (serving).** Nêu rõ training–serving skew.
- **Đánh giá đúng.** Chọn metric khớp bài toán; cẩn trọng với dữ liệu mất cân bằng.
- **Giám sát sau khi deploy.** Model xuống cấp theo thời gian (data/concept drift).
- Không bịa số liệu độ chính xác/latency; ghi rõ khi là ví dụ minh họa.

## 2. Cấu trúc chuẩn

1. **Tiêu đề:** "Thiết kế hệ thống [X]" — ví dụ "Thiết kế hệ thống gợi ý (recommendation)".
2. **Bài toán & mục tiêu nghiệp vụ:** giải quyết gì, thành công đo bằng metric nghiệp vụ nào (CTR, doanh thu, giữ chân).
3. **Đóng khung ML (ML framing):** đây là bài toán gì (phân loại, hồi quy, ranking, retrieval)? Nhãn (label) là gì và lấy từ đâu?
4. **Yêu cầu:** quy mô, độ trễ serving, tần suất huấn luyện lại, online vs batch.
5. **Dữ liệu:** nguồn, nhãn, khối lượng, vấn đề chất lượng/thiên lệch.
6. **Feature engineering:** feature chính, feature store, tránh **data leakage**.
7. **Mô hình:** baseline trước, rồi mô hình nâng cao; vì sao chọn (không nhảy vào deep learning nếu chưa cần).
8. **Training pipeline:** chuẩn bị dữ liệu, huấn luyện, đánh giá offline, versioning.
9. **Serving:** online/batch, độ trễ, kiến trúc suy luận (candidate generation → ranking nếu là recsys).
10. **Đánh giá:** metric offline & online, **A/B test**.
11. **Giám sát & vận hành:** drift, retraining, feedback loop.
12. **Trade-offs & Key takeaways + Nguồn.**

## 3. Đóng khung ML & metric (phần dễ sai nhất)

- Ánh xạ rõ **mục tiêu nghiệp vụ → mục tiêu ML → metric**. Ví dụ: giữ chân người dùng → tăng mức độ tương tác → tối ưu CTR/watch-time.
- Chọn **metric mô hình** đúng bài toán: precision/recall/F1, AUC, NDCG (ranking), MAP... Nói rõ vì sao metric này, không dùng accuracy cho dữ liệu mất cân bằng.
- Phân biệt **metric offline** (đo trên tập test) và **metric online** (A/B test thật) — hai cái có thể lệch nhau.
- Định nghĩa/khái niệm (precision vs recall, AUC, NDCG) phải phát biểu chính xác; dẫn nguồn khi cần.

## 4. Sơ đồ pipeline

Dùng Mermaid cho luồng dữ liệu–mô hình:

````markdown
```mermaid
flowchart LR
    Data[Nguồn dữ liệu] --> FE[Feature Engineering]
    FE --> FS[(Feature Store)]
    FS --> Train[Training]
    Train --> Reg[(Model Registry)]
    Reg --> Serve[Serving]
    Serve --> Mon[Monitoring/Drift]
    Mon --> Train
```
````

Kèm giải thích luồng offline (training) vs online (serving); alt text cho ảnh tĩnh.

## 5. Cạm bẫy ML cần bàn

- **Data leakage:** feature chứa thông tin tương lai/nhãn → offline đẹp, production sập.
- **Training–serving skew:** feature tính khác nhau giữa train và serve.
- **Dữ liệu mất cân bằng:** metric và cách lấy mẫu.
- **Cold start** (recsys): user/item mới chưa có dữ liệu.
- **Feedback loop:** model ảnh hưởng chính dữ liệu nó học sau này.
- **Drift:** phân phối dữ liệu/khái niệm đổi theo thời gian → cần retrain.

## 6. Checklist riêng cho bài ML System Design

Ngoài checklist của `blog-foundations`, kiểm thêm:

- [ ] Bắt đầu từ bài toán & metric nghiệp vụ, rồi mới tới ML.
- [ ] Đóng khung ML rõ (loại bài toán, nhãn lấy từ đâu).
- [ ] Bàn dữ liệu & feature trước/kỹ hơn model; nêu chống data leakage.
- [ ] Có baseline trước mô hình phức tạp; giải thích vì sao chọn.
- [ ] Phân biệt training (offline) và serving (online); nêu skew.
- [ ] Chọn metric đúng bài toán; phân biệt metric offline/online; có A/B test.
- [ ] Có giám sát drift & kế hoạch retraining.
- [ ] Có sơ đồ pipeline kèm giải thích.
- [ ] Khái niệm ML phát biểu chính xác; không bịa số liệu.

## 7. Anti-patterns riêng

- Nhảy vào "dùng deep learning / LLM" trước khi rõ bài toán và baseline.
- Bàn model nhiều nhưng bỏ qua dữ liệu, feature, serving, giám sát.
- Dùng accuracy cho dữ liệu mất cân bằng; chọn metric sai bài toán.
- Bỏ qua data leakage và training–serving skew.
- Coi offline metric tốt là xong, không nói tới A/B test online.
- Bịa con số accuracy/latency như thể đo được.
