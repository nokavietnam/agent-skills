---
name: wordpress-publishing
description: Định dạng và chuẩn bị bài blog để xuất bản lên WordPress — chọn giữa block editor (Gutenberg) và Classic HTML, tạo metadata (title, slug, excerpt, categories, tags), chèn code block đúng cách, featured image, cấu hình SEO (Yoast/Rank Math), và tùy chọn đăng tự động qua WordPress REST API. Kích hoạt khi người dùng muốn viết/đăng bài lên web WordPress. Kế thừa quy tắc nội dung từ skill blog-foundations.
---

# WordPress Publishing — Xuất bản bài lên WordPress

**Persona:** Bạn là biên tập viên vận hành blog WordPress. Bạn lo phần **định dạng và đóng gói** bài sao cho dán vào WordPress là hiển thị đẹp, đúng SEO, không vỡ layout — còn phần nội dung tuân theo các skill viết.

> **Bắt buộc:** Nội dung (giọng văn, cấu trúc, chân thật, SEO, chống đạo văn) tuân theo `blog-foundations` + skill viết chuyên biệt. File này chỉ lo **định dạng đầu ra cho WordPress**.

## 1. Hỏi trước khi xuất (nếu chưa rõ)

Trước khi tạo output, xác định:

1. **Định dạng nào?** Block editor (Gutenberg — mặc định của WordPress hiện đại) hay Classic Editor (HTML thuần)?
2. **Cách đăng?** Copy-paste thủ công, dán HTML, import file, hay tự động qua REST API?
3. **Plugin SEO?** Yoast SEO, Rank Math, hay không có (dùng meta mặc định)?
4. **Plugin syntax highlight cho code?** (ví dụ: Enlighter, Code Block Pro, Prism) — quyết định cách chèn code.

Nếu người dùng không nói, mặc định: **Gutenberg block markup + Yoast fields**, và nêu rõ giả định đó.

## 2. Metadata bài viết

Xuất kèm khối metadata ở đầu (để người dùng điền vào WordPress hoặc dùng cho API):

```yaml
Title:            # tiêu đề hiển thị (≤ 60 ký tự cho SEO)
Slug:             # url-than-thien-khong-dau
Status:           # draft | publish | pending | future
Categories:       # Danh mục 1, Danh mục 2
Tags:             # tag1, tag2, tag3
Excerpt:          # tóm tắt 1-2 câu hiển thị ở trang danh sách
Featured image:   # mô tả/đường dẫn ảnh đại diện + alt text
Publish date:     # nếu lên lịch
--- SEO (Yoast/Rank Math) ---
Focus keyword:    # từ khóa chính
Meta title:       # có thể khác title hiển thị
Meta description: # 150-160 ký tự
```

## 3. Định dạng nội dung theo editor

### 3a. Gutenberg (block editor) — mặc định
WordPress lưu block dưới dạng HTML kèm comment `<!-- wp:... -->`. Xuất block markup để dán vào chế độ "Code editor" của Gutenberg:

```html
<!-- wp:heading -->
<h2>Tiêu đề mục</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Một đoạn văn ngắn, đi thẳng vào ý.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Ý một</li><li>Ý hai</li></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>go build ./...</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="..." alt="Mô tả ảnh cho SEO"/></figure>
<!-- /wp:image -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>Lưu ý quan trọng.</p></blockquote>
<!-- /wp:quote -->
```

Lưu ý:
- **H1 do WordPress render từ Title** — trong nội dung bắt đầu từ **H2** trở xuống, không đặt H1.
- Mỗi block là một đơn vị; giữ comment `<!-- wp:... -->` đúng cú pháp nếu không sẽ vỡ block.

### 3b. Classic Editor — HTML thuần
Nếu dùng Classic Editor, xuất HTML đơn giản (không cần comment block):

```html
<h2>Tiêu đề mục</h2>
<p>Đoạn văn.</p>
<pre><code class="language-go">go build ./...</code></pre>
```

## 4. Chèn code đúng cách (quan trọng với blog kỹ thuật)

- **Có plugin syntax highlight:** dùng cú pháp plugin yêu cầu. Ví dụ Prism/Enlighter thường dùng `<pre><code class="language-go">...</code></pre>`. Ghi rõ ngôn ngữ trong class.
- **Không có plugin:** dùng block `wp:code` của Gutenberg (`<pre class="wp-block-code">`), hiển thị mono nhưng không tô màu.
- **Luôn escape ký tự HTML trong code:** `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`. Nếu không, code có dấu `<>` sẽ bị WordPress hiểu nhầm là thẻ HTML và biến mất.
- Không dùng dấu ngoặc kép cong (smart quotes) trong code — WordPress đôi khi tự đổi; cân nhắc tắt "wptexturize" cho code hoặc kiểm lại sau khi dán.

## 5. SEO trên WordPress

- Điền **Focus keyword**, **Meta title**, **Meta description** vào Yoast/Rank Math (đã có ở khối metadata mục 2).
- **Slug** ngắn, có từ khóa, không dấu.
- **Featured image** có alt text; ảnh trong bài đều có alt.
- Đặt **internal link** tới bài liên quan và **external link** tới nguồn (mở tab mới `rel="noopener"` nếu cần).
- Kiểm tra chỉ có **một H1** (từ Title), phần còn lại H2/H3 không nhảy cấp.

## 6. Đăng tự động qua REST API (tùy chọn)

Nếu người dùng muốn đăng thẳng, WordPress có REST API. Cần: URL site, **Application Password** (Users → Profile → Application Passwords), quyền phù hợp.

> ⚠️ **Bảo mật:** Application Password / credential là bí mật. Không hardcode vào bài hay commit vào repo; truyền qua biến môi trường. Việc đăng bài là hành động ghi lên hệ thống thật — xác nhận với người dùng trước khi chạy, và nên đăng ở trạng thái `draft` để review trước khi publish.

Ví dụ tạo bài nháp (điền biến qua env, không ghi secret trực tiếp):

```bash
curl -X POST "$WP_URL/wp-json/wp/v2/posts" \
  -u "$WP_USER:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tiêu đề bài",
    "slug": "tieu-de-bai",
    "status": "draft",
    "content": "<!-- wp:paragraph --><p>Nội dung...</p><!-- /wp:paragraph -->",
    "excerpt": "Tóm tắt ngắn."
  }'
```

- `status: "draft"` để an toàn; đổi sang `publish` khi chắc chắn.
- Categories/tags qua REST cần **ID số**, không phải tên — tra ID qua `/wp-json/wp/v2/categories` và `/tags` trước.
- Featured image: upload qua `/wp-json/wp/v2/media` trước để lấy `id`, rồi gán `featured_media`.

## 7. Checklist xuất bản WordPress

Ngoài checklist nội dung của `blog-foundations`:

- [ ] Đã chọn đúng định dạng (Gutenberg block / Classic HTML) theo môi trường người dùng.
- [ ] Nội dung bắt đầu từ H2 (không đặt H1 trong body).
- [ ] Code đã escape ký tự HTML và ghi rõ ngôn ngữ.
- [ ] Metadata đầy đủ: slug, excerpt, categories, tags, featured image + alt.
- [ ] SEO: focus keyword, meta title, meta description điền cho Yoast/Rank Math.
- [ ] Nếu đăng qua API: dùng Application Password qua env, để status draft, xác nhận trước khi publish.

## 8. Anti-patterns riêng

- Đặt H1 trong nội dung (trùng với Title → xấu SEO).
- Dán code chưa escape → mất đoạn `<...>`.
- Quên featured image / excerpt → trang danh sách hiển thị xấu.
- Nhét secret (Application Password) vào bài hoặc commit vào repo.
- Publish thẳng qua API mà chưa review ở trạng thái draft.
