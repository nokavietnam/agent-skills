---
title: "PostgreSQL vs MySQL: chọn database nào?"
slug: postgresql-vs-mysql-chon-database
date: 2026-09-03
description: "So sánh PostgreSQL và MySQL theo transaction, JSON, full-text, mở rộng, replication và license; chọn database dựa trên workload, vận hành và ràng buộc dự án."
tags: [postgresql, mysql, database, backend, comparison]
categories: [Backend Engineering]
draft: true
---

# PostgreSQL vs MySQL: chọn database nào?

PostgreSQL và MySQL đều có thể là lựa chọn tốt cho một web application. Câu hỏi hữu ích không phải “database nào thắng tuyệt đối?”, mà là workload, schema, đội vận hành và ràng buộc license của bạn đang cần điều gì.

Bài này dùng cùng một bộ tiêu chí cho hai bên, trích tài liệu chính thức và **không đưa benchmark hiệu năng không có điều kiện đo**. Thông tin được đối chiếu ngày 03/09/2026; tính năng và default có thể thay đổi theo major version, nên hãy kiểm tra đúng version mà dự án sẽ chạy.

**TL;DR**

- Chọn PostgreSQL khi cần kiểu dữ liệu phong phú, `jsonb`, extension và full-text search tích hợp trong một hệ thống quan hệ.
- Chọn MySQL khi đội đã chuẩn hóa trên InnoDB/MySQL, cần hệ sinh thái vận hành hiện có hoặc phù hợp với mô hình license của tổ chức.
- Cả hai đều có transaction, JSON, full-text và replication theo tài liệu; khác biệt nằm ở semantics, công cụ, default và trade-off triển khai.
- Không chọn chỉ vì một câu “X nhanh hơn Y”. Hãy benchmark workload thật nếu hiệu năng là tiêu chí quyết định.

## Phạm vi và tiêu chí so sánh

Tôi so sánh các tiêu chí mà một backend team có thể kiểm tra bằng tài liệu và PoC:

1. mô hình license và cách phân phối;
2. transaction isolation mặc định;
3. JSON và kiểu dữ liệu;
4. full-text search;
5. khả năng mở rộng bằng extension/storage engine;
6. replication và vận hành;
7. độ phù hợp theo ngữ cảnh.

Các kết luận “phù hợp hơn cho...” ở cuối là phân tích theo ngữ cảnh, không phải cam kết rằng một database luôn tốt hơn.

## Bảng so sánh nhanh

| Tiêu chí | PostgreSQL | MySQL |
| --- | --- | --- |
| License/phân phối | PostgreSQL License được dự án mô tả là open-source permissive, tương tự BSD/MIT; xem [license chính thức](https://www.postgresql.org/about/licence/). | MySQL server và client libraries được Oracle mô tả theo mô hình GPL và commercial license; xem [trang licensing chính thức](https://www.mysql.com/about/legal/licensing/oem/). Cần đọc điều khoản cho cách phân phối cụ thể. |
| Transaction default | `Read Committed` là default của PostgreSQL; tài liệu cũng mô tả các isolation level còn lại. [Docs](https://www.postgresql.org/docs/current/transaction-iso.html) | `REPEATABLE READ` là default của InnoDB; đây là default của storage engine, không nên suy diễn cho mọi engine. [Docs](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html) |
| JSON | Có `json` và `jsonb`; `jsonb` được lưu dạng phân rã và hỗ trợ indexing. [Docs](https://www.postgresql.org/docs/current/datatype-json.html) | Có native JSON type, validation JSON và format lưu trữ được tối ưu cho truy cập phần tử; JSON column không được index trực tiếp theo cách thông thường, có thể dùng generated column/index phù hợp. [Docs](https://dev.mysql.com/doc/refman/8.4/en/json.html) |
| Kiểu dữ liệu mở rộng | Có arrays và nhiều loại dữ liệu PostgreSQL-specific; arrays được tài liệu hóa cho base type và user-defined type. [Docs](https://www.postgresql.org/docs/current/arrays.html) | Thiết kế nested data thường dựa trên JSON hoặc bảng quan hệ; bài này không gán cho MySQL một “array type” tương đương khi chưa có contract/version cụ thể. [JSON docs](https://dev.mysql.com/doc/refman/8.4/en/json.html) |
| Full-text search | Có một chương riêng cho full-text search trong tài liệu PostgreSQL; cần thiết kế parser, dictionary và index theo ngôn ngữ. [Docs](https://www.postgresql.org/docs/current/textsearch.html) | Có `FULLTEXT` index và `MATCH() AGAINST()`; tài liệu nêu giới hạn engine/cột, trong đó full-text index dùng được với InnoDB hoặc MyISAM và các cột CHAR/VARCHAR/TEXT. [Docs](https://dev.mysql.com/doc/refman/8.4/en/fulltext-search.html) |
| Mở rộng hệ thống | Extension đóng gói các object và được quản lý bằng `CREATE EXTENSION`/`DROP EXTENSION`. [Docs](https://www.postgresql.org/docs/current/extend-extensions.html) | MySQL có kiến trúc pluggable storage engine; InnoDB là default trong tài liệu MySQL 8.4, các engine khác có capability khác nhau. [Docs](https://dev.mysql.com/doc/refman/8.4/en/storage-engines.html) |
| Replication/HA | Tài liệu PostgreSQL có chương riêng về high availability, load balancing và replication; cách triển khai cần chọn theo yêu cầu RPO/RTO. [Docs](https://www.postgresql.org/docs/current/high-availability.html) | MySQL mô tả source/replica, binary log/GTID và asynchronous replication là kiểu built-in truyền thống; có thêm các lựa chọn synchronization tùy cấu hình. [Docs](https://dev.mysql.com/doc/refman/8.4/en/replication.html) |
| Hiệu năng | Không có kết luận chung trong bài này; cần benchmark cùng schema, query, dữ liệu, concurrency và hardware. | Không có kết luận chung trong bài này; cần benchmark cùng schema, query, dữ liệu, concurrency và hardware. |

Bảng cố ý dùng “tài liệu nói gì” thay vì chuyển các khác biệt thành lời hứa hiệu năng. Một feature có trong docs vẫn cần kiểm tra mức hỗ trợ của managed service và version cụ thể.

## 1. Transaction: đừng nhầm isolation level của hai hệ

PostgreSQL mô tả `Read Committed` là isolation level mặc định. Tài liệu cũng nói PostgreSQL nhận bốn mức theo SQL nhưng nội bộ có ba hành vi distinct, trong đó `Read Uncommitted` hoạt động như `Read Committed`. [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)

Với InnoDB, tài liệu MySQL 8.4 ghi `REPEATABLE READ` là default và giải thích snapshot cho consistent reads, locking reads và gap/next-key lock theo điều kiện truy vấn. [MySQL InnoDB transaction isolation](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)

**Ý nghĩa khi chọn:** nếu application phụ thuộc vào behavior khi đọc lặp lại, locking hoặc migration transaction, hãy viết integration test trên database/version thật. Không bê nguyên giả định của PostgreSQL sang InnoDB hoặc ngược lại. Đây là khác biệt semantics, không phải bảng xếp hạng “cái nào mạnh hơn”.

## 2. JSON và schema quan hệ

PostgreSQL có `json` và `jsonb`. Tài liệu giải thích `json` giữ text input, còn `jsonb` dùng dạng phân rã để xử lý nhanh hơn và hỗ trợ indexing; đổi lại `jsonb` không giữ whitespace, thứ tự key hay duplicate key theo cách `json` giữ. [PostgreSQL JSON types](https://www.postgresql.org/docs/current/datatype-json.html)

MySQL có native JSON type, tự validation document và format nội bộ để truy cập phần tử. Tài liệu cũng chỉ ra JSON column không được index trực tiếp như một cột thông thường; generated column là một hướng để tạo index cho giá trị trích xuất. [MySQL JSON](https://dev.mysql.com/doc/refman/8.4/en/json.html)

**Chọn theo ngữ cảnh:**

- Schema chính ổn định nhưng có vài thuộc tính linh hoạt: cả hai đều có thể đáp ứng; so sánh query, index và migration của workload thật.
- Cần query JSON sâu, index nhiều biểu thức và dùng capability đặc trưng PostgreSQL: PostgreSQL có thể phù hợp hơn, nhưng phải kiểm tra kỹ extension/managed service.
- Dữ liệu nested có quan hệ mạnh và cần ràng buộc: đừng dùng JSON chỉ để né thiết kế bảng; cả hai database đều có thể biến JSON thành “bãi chứa” khó kiểm soát.

## 3. Full-text search

PostgreSQL có hệ thống full-text search riêng với parser, dictionary, configuration và index. Điều này cho phép tùy chỉnh theo ngôn ngữ, nhưng cũng tạo thêm quyết định vận hành và kiểm thử relevance. [PostgreSQL full-text search](https://www.postgresql.org/docs/current/textsearch.html)

MySQL cung cấp `FULLTEXT` index và truy vấn bằng `MATCH() AGAINST()`. Tài liệu MySQL 8.4 nêu giới hạn về storage engine và loại cột, đồng thời mô tả natural language, boolean và query expansion search. [MySQL full-text search](https://dev.mysql.com/doc/refman/8.4/en/fulltext-search.html)

Nếu search là tính năng phụ cho catalog nhỏ, search trong database có thể giảm một hệ thống phải vận hành. Nếu yêu cầu relevance, typo tolerance, autocomplete hoặc scale độc lập cao, hãy so sánh cả phương án search engine chuyên dụng; chọn PostgreSQL hay MySQL không tự giải quyết mọi yêu cầu search.

## 4. Extensibility và operational surface

PostgreSQL extension gom nhiều object thành một package và cho phép database quản lý lifecycle bằng `CREATE EXTENSION`. Đây là một điểm mạnh khi team muốn mở rộng database theo cách có cấu trúc, nhưng extension phải tồn tại trong môi trường đích và cần được version hóa trong migration. [PostgreSQL extensions](https://www.postgresql.org/docs/current/extend-extensions.html)

MySQL có pluggable storage engine architecture. InnoDB là engine mặc định trong tài liệu MySQL 8.4 và hỗ trợ transaction, row-level locking, foreign keys; capability không nên được suy diễn sang engine khác. [MySQL storage engines](https://dev.mysql.com/doc/refman/8.4/en/storage-engines.html)

Trong practice, “có feature” chưa đủ. Hãy hỏi managed provider có cho bật extension/engine không, backup restore có giữ object không, monitoring có hiểu metric mới không và upgrade path ra sao.

## 5. Replication và high availability

Cả hai đều có tài liệu chính thức về replication, nhưng topology, semantics và tooling không giống nhau. PostgreSQL có chương về high availability, load balancing và replication. [PostgreSQL HA](https://www.postgresql.org/docs/current/high-availability.html)

MySQL mô tả source/replica, binary log, GTID và các kiểu replication; tài liệu 8.4 ghi asynchronous replication là kiểu mặc định truyền thống, còn semisynchronous có điều kiện cấu hình riêng. [MySQL replication](https://dev.mysql.com/doc/refman/8.4/en/replication.html)

Đừng chọn database chỉ vì từ “replication” xuất hiện trong feature list. Hãy viết runbook cho failover, backup, restore, lag, split-brain, read-after-write và upgrade; sau đó thử diễn tập. Đây là phần phân tích vận hành, không phải một claim rằng một bên tự động HA tốt hơn bên kia.

## Ưu và nhược theo góc nhìn quyết định

### PostgreSQL có thể hợp hơn khi

- Domain cần arrays, `jsonb`, custom type hoặc extension và team sẵn sàng quản lý các capability đó.
- Semantics transaction của `Read Committed`, SQL query phức tạp và full-text search tích hợp là phần quan trọng.
- License permissive của PostgreSQL phù hợp với cách bạn đóng gói/phân phối; vẫn nên đọc license của mọi extension và dependency.

**Trade-off:** nhiều khả năng hơn thường nghĩa là nhiều quyết định schema/index/extension hơn. Một team không có thời gian vận hành hoặc managed service giới hạn extension có thể không tận dụng được lợi thế.

### MySQL có thể hợp hơn khi

- Tổ chức đã có chuẩn InnoDB, tooling, backup/monitoring và kỹ năng MySQL; chi phí chuyển đổi là tiêu chí thật.
- Workload khớp với transaction behavior, JSON và FULLTEXT mà MySQL cung cấp.
- Mô hình GPL/commercial license phù hợp với cách dùng và phân phối; với sản phẩm proprietary, cần legal review thay vì suy đoán từ chữ “open source”.

**Trade-off:** phải hiểu engine đang dùng, vì transaction và capability phụ thuộc engine; JSON indexing và full-text cũng có giới hạn được tài liệu hóa.

## Cây quyết định thực dụng

1. **Có ràng buộc license hoặc managed service bắt buộc không?** Loại các phương án không đáp ứng trước.
2. **Schema/workload có cần feature đặc trưng không?** Viết PoC cho JSON query, full-text, transaction locking hoặc extension thay vì chọn theo danh tiếng.
3. **Team đang vận hành hệ nào tốt hơn?** Runbook và kinh nghiệm on-call thường quan trọng hơn một feature không dùng tới.
4. **Read/write, HA và recovery yêu cầu gì?** Thiết kế topology và test failure trên đúng dịch vụ cloud/on-prem.
5. **Hiệu năng là blocker?** Benchmark cùng dữ liệu, query plan, concurrency, hardware và version; lưu script để người khác tái lập.

## Kết luận

Không có database tốt nhất tuyệt đối. Chọn PostgreSQL nếu bộ kiểu dữ liệu, extension, full-text và semantics của nó giải quyết trực tiếp bài toán của bạn, đồng thời team vận hành được độ phong phú đó. Chọn MySQL nếu InnoDB, stack hiện có, transaction behavior và license của MySQL khớp với hệ thống.

Nếu hai bên đều đáp ứng requirements, hãy chọn phương án có migration dễ hơn, backup/restore đã diễn tập và đội trực production hiểu rõ hơn. Đó là khuyến nghị theo ngữ cảnh, không phải phán quyết cho mọi dự án.

## Key takeaways

- So sánh database bằng cùng tiêu chí: transaction, data type, search, extensibility, replication, license và vận hành.
- `Read Committed` của PostgreSQL và `REPEATABLE READ` mặc định của InnoDB là khác biệt cần test, không nên đoán.
- Cả hai đều hỗ trợ JSON và full-text, nhưng API, giới hạn và cách index khác nhau.
- Không bịa benchmark: nếu performance quyết định, benchmark workload thật và ghi rõ điều kiện.

## Nguồn tham khảo

- [PostgreSQL License](https://www.postgresql.org/about/licence/)
- [PostgreSQL Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [PostgreSQL JSON Types](https://www.postgresql.org/docs/current/datatype-json.html)
- [PostgreSQL Arrays](https://www.postgresql.org/docs/current/arrays.html)
- [PostgreSQL Full Text Search](https://www.postgresql.org/docs/current/textsearch.html)
- [PostgreSQL Extensions](https://www.postgresql.org/docs/current/extend-extensions.html)
- [PostgreSQL High Availability](https://www.postgresql.org/docs/current/high-availability.html)
- [MySQL Licensing](https://www.mysql.com/about/legal/licensing/oem/)
- [MySQL 8.4 InnoDB Transaction Isolation](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)
- [MySQL 8.4 JSON](https://dev.mysql.com/doc/refman/8.4/en/json.html)
- [MySQL 8.4 Full-Text Search](https://dev.mysql.com/doc/refman/8.4/en/fulltext-search.html)
- [MySQL 8.4 Storage Engines](https://dev.mysql.com/doc/refman/8.4/en/storage-engines.html)
- [MySQL 8.4 Replication](https://dev.mysql.com/doc/refman/8.4/en/replication.html)

---

*Meta description (150–160 ký tự):* So sánh PostgreSQL và MySQL theo transaction, JSON, full-text, mở rộng, replication và license; chọn database dựa trên workload, vận hành và ràng buộc dự án.
