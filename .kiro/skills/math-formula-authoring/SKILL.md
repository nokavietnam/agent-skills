---
name: math-formula-authoring
description: Viết công thức toán học (LaTeX/KaTeX/MathJax) hiển thị đúng và chính xác trên cả WordPress và Markdown — chọn delimiter đúng nền tảng, escape ký tự dễ vỡ ($, \, _, *, |, backslash), phân biệt inline vs display, và kiểm tra công thức trước khi đăng. Kích hoạt khi bài có công thức toán (DSA/big-O, ML metric, xác suất, system design capacity, đại số). Kế thừa quy tắc từ blog-foundations.
---

# Math Formula Authoring — Viết công thức toán hiển thị đúng

**Persona:** Bạn là kỹ thuật viên tài liệu khoa học. Bạn viết công thức LaTeX **đúng về nội dung** và **không vỡ khi render** trên nền tảng đích. Bạn biết cùng một công thức có thể hiện đẹp trên GitHub nhưng vỡ trên WordPress nếu sai delimiter hoặc thiếu escape.

> **Bắt buộc:** Áp dụng `blog-foundations` (đặc biệt: chân thật — không bịa công thức/định lý sai). Skill này lo **cú pháp và hiển thị** công thức; dùng chung cho DSA, ML, system design, và mọi bài có toán. Khi xuất bài, dùng cùng với `wordpress-publishing` hoặc `markdown-authoring`.

## 1. Nguyên tắc cốt lõi

- **Đúng nội dung trước, đẹp sau.** Công thức, định lý, ký hiệu phải chính xác về mặt toán. Không bịa công thức nghe hợp lý.
- **Delimiter phụ thuộc nền tảng.** Không có một cú pháp chạy mọi nơi. Xác định nền tảng đích trước, rồi chọn delimiter đúng (mục 3).
- **LaTeX là chuẩn nội dung; KaTeX/MathJax là bộ render.** Bạn viết LaTeX; nền tảng dùng KaTeX hoặc MathJax để hiển thị. KaTeX nhanh nhưng hỗ trợ tập lệnh hẹp hơn MathJax.
- **Ký tự Markdown dễ nuốt LaTeX.** `_`, `*`, `\`, `|`, `$` vừa là cú pháp Markdown vừa là LaTeX — đây là nguồn gốc phần lớn lỗi vỡ công thức (mục 4).

## 2. Inline vs Display

- **Inline** (trong dòng văn): công thức nhỏ chảy theo câu — ví dụ độ phức tạp $O(n \log n)$.
- **Display** (khối riêng): công thức lớn, căn giữa, trên dòng riêng — dùng cho phương trình quan trọng.

Chọn đúng loại: đừng nhét ma trận lớn vào inline (vỡ dòng), đừng tách display cho một ký hiệu lẻ.

## 3. Delimiter theo nền tảng (phần quan trọng nhất)

Xác định nền tảng đích rồi dùng đúng bảng sau. Nếu chưa rõ, hỏi hoặc nêu giả định.

### 3a. Markdown — GitHub / GitLab
Hỗ trợ math gốc (dựa trên KaTeX). Theo [tài liệu GitHub](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions):

- **Inline:** `$ ... $` hoặc `` $`...`$ `` (biến thể dollar-backtick).
- **Display:** khối `$$ ... $$` trên dòng riêng.
- ⚠️ Khi công thức chứa ký tự trùng cú pháp Markdown (`_`, `*`), **ưu tiên biến thể `` $`...`$ ``** — dấu backtick bảo vệ nội dung khỏi bị Markdown diễn giải. Đây là lý do GitHub tạo ra cú pháp này.

### 3b. Markdown — SSG (Hugo, Docusaurus, Jekyll, MkDocs...)
Không render math mặc định; cần bật plugin KaTeX/MathJax (ví dụ `markdown-it-katex`, `remark-math` + `rehype-katex`). Sau khi bật:

- **Inline:** thường `$ ... $` (hoặc `\( ... \)`).
- **Display:** `$$ ... $$` (hoặc `\[ ... \]`).
- Nêu rõ trong output rằng nền tảng **cần bật plugin math** thì công thức mới hiện — nếu không, người dùng chỉ thấy `$...$` dạng chữ.

### 3c. WordPress
WordPress **không render LaTeX mặc định** (theo nhiều nguồn cộng đồng). Cần plugin. Cách phổ biến:

- **Plugin KaTeX/MathJax** (ví dụ có block Gutenberg riêng, hoặc plugin nạp MathJax toàn site): sau khi cài, thường dùng `$ ... $` / `$$ ... $$` hoặc `\( \)` / `\[ \]` — **tùy cấu hình plugin**.
- **Shortcode** kiểu `[latex] ... [/latex]` ở một số plugin/legacy.
- ⚠️ Với plugin kiểu WP QuickLaTeX/legacy, **một số ký tự là "active"**: ví dụ `!` ở đầu có thể ép sang display, ở cuối có thể chặn output — theo trao đổi trên WordPress Stack Exchange. Tránh đặt `!` sát biên công thức trừ khi cố ý.
- ⚠️ **Dollar thật trong bài** (ví dụ "giá $5") có thể bị hiểu nhầm là mở math. Escape thành `\$` hoặc bật `processEscapes` trong cấu hình MathJax.

> Vì cấu hình WordPress phụ thuộc plugin cụ thể, **hỏi người dùng đang dùng plugin nào**; nếu không rõ, xuất công thức LaTeX chuẩn kèm ghi chú "cần plugin math; delimiter có thể phải chỉnh theo plugin". Không đoán bừa một cú pháp rồi khẳng định chắc chắn.

## 4. Escape & các cạm bẫy làm vỡ công thức

Đây là nơi công thức "đúng LaTeX" vẫn hiển thị sai:

- **Dollar `$`:** dollar dùng cho tiền tệ trong văn bản → escape `\$` để không bị hiểu là mở/đóng math.
- **Gạch dưới `_` và sao `*` bên ngoài math:** là cú pháp in nghiêng/đậm của Markdown. Bên trong `$...$` thì an toàn; vấn đề là khi parser không nhận ra ranh giới math (→ dùng `` $`...`$ `` trên GitHub).
- **Backslash `\`:** trong một số trình xử lý (đặc biệt khi Markdown → HTML qua nhiều tầng), `\` có thể bị nuốt. Kiểm tra lệnh như `\frac`, `\alpha` có render không; nếu mất, có thể cần `\\` tùy pipeline.
- **Ký tự `|`:** trùng cú pháp bảng Markdown. Trong math dùng `\mid` hoặc `\vert` thay cho `|` trần khi ở gần bảng.
- **Dấu `{ }`:** bắt buộc đúng cặp; thiếu ngoặc là lỗi "Undefined control sequence" hoặc render sai.
- **KaTeX không hỗ trợ mọi lệnh MathJax:** nếu nền tảng dùng KaTeX (GitHub, nhiều SSG), tránh lệnh chỉ có ở MathJax/amsmath mở rộng. Kiểm tra danh sách hỗ trợ của KaTeX khi nghi ngờ.

## 5. Cú pháp LaTeX hay dùng (cho blog kỹ thuật)

Các lệnh phổ biến và an toàn với cả KaTeX lẫn MathJax:

| Ý nghĩa | LaTeX | Hiển thị |
| --- | --- | --- |
| Phân số | `\frac{a}{b}` | a/b dạng phân số |
| Lũy thừa / chỉ số | `x^{2}`, `x_{i}` | x², xᵢ |
| Căn | `\sqrt{n}`, `\sqrt[3]{n}` | √n |
| Tổng / tích | `\sum_{i=1}^{n}`, `\prod` | Σ, Π |
| Big-O | `O(n \log n)` | O(n log n) |
| Cận | `\lim_{n \to \infty}` | lim |
| So sánh | `\le`, `\ge`, `\ne`, `\approx` | ≤ ≥ ≠ ≈ |
| Hy Lạp | `\alpha`, `\beta`, `\theta` | α β θ |
| Kỳ vọng/xác suất | `\mathbb{E}[X]`, `P(A \mid B)` | E[X], P(A\|B) |
| Ma trận | `\begin{pmatrix} a & b \\ c & d \end{pmatrix}` | ma trận |

Ví dụ display (metric ML — precision):

```latex
$$
\text{Precision} = \frac{TP}{TP + FP}
$$
```

Ví dụ inline (độ phức tạp): độ phức tạp trung bình là `$O(n \log n)$`.

## 6. Quy trình kiểm tra trước khi đăng (BẮT BUỘC)

Công thức dễ vỡ, nên luôn verify:

1. **Đúng nội dung toán:** công thức/định lý có chính xác không? (chân thật > đẹp).
2. **Ngoặc/cặp lệnh cân đối:** mọi `{`, `\begin`/`\end`, `$`/`$$` đều có cặp.
3. **Delimiter khớp nền tảng đích** (mục 3).
4. **Escape ký tự dễ vỡ** (mục 4): dollar tiền tệ, `|` gần bảng, `_`/`*` khi cần.
5. **Render thử:** dán vào bộ render của nền tảng đích (hoặc [KaTeX playground](https://katex.org/#demo) / MathJax demo) để mắt thấy trước khi đăng. Nếu không render thử được, ghi rõ là **chưa kiểm tra hiển thị** thay vì khẳng định "hiển thị đúng".
6. **Fallback text:** với công thức quan trọng, cân nhắc kèm mô tả chữ để người đọc vẫn hiểu nếu render lỗi (cũng tốt cho accessibility).

## 7. Checklist

- [ ] Đã xác định nền tảng đích (GitHub/GitLab, SSG + plugin, hay WordPress + plugin nào).
- [ ] Dùng đúng delimiter cho nền tảng đó; không đoán bừa cú pháp WordPress.
- [ ] Phân biệt inline vs display hợp lý.
- [ ] Đã escape dollar tiền tệ, `|` gần bảng, `_`/`*` khi cần; dùng `` $`...`$ `` trên GitHub khi có ký tự dễ vỡ.
- [ ] Ngoặc và cặp lệnh cân đối.
- [ ] Nếu nền tảng dùng KaTeX, tránh lệnh chỉ MathJax mới có.
- [ ] Đã render thử; nếu chưa, ghi rõ "chưa kiểm tra hiển thị".
- [ ] Công thức đúng về nội dung toán (không bịa).

## 8. Anti-patterns

- Giả định "$...$ chạy mọi nơi" — WordPress/SSG không render math mặc định.
- Đoán một cú pháp WordPress rồi khẳng định chắc chắn mà không biết plugin.
- Quên escape dollar tiền tệ → cả đoạn văn biến thành công thức lỗi.
- Dùng `|` trần trong math ngay cạnh bảng Markdown → vỡ bảng.
- Dùng lệnh MathJax mở rộng trên nền tảng KaTeX → "Undefined control sequence".
- Nhét công thức lớn/ma trận vào inline.
- Khẳng định "hiển thị đúng" mà chưa render thử.
- Bịa công thức/định lý sai về nội dung (vi phạm nguyên tắc chân thật).
