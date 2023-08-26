import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,b as e}from"./app-6e0de965.js";const p={},o=e(`<h2 id="关系型数据库和非关系型数据库区别" tabindex="-1"><a class="header-anchor" href="#关系型数据库和非关系型数据库区别" aria-hidden="true">#</a> 关系型数据库和非关系型数据库区别</h2><p>关系型数据库和非关系型数据库是两种不同的数据存储和管理方式，它们各有优缺点，适用于不同的场景。</p><p>关系型数据库是指使用关系模型（二维表格模型）来组织数据的数据库，例如Oracle, MySQL, SQL Server等。关系型数据库的优点是：</p><ul><li>易于理解：二维表结构非常贴近逻辑，可以用SQL语言进行查询和操作。</li><li>易于维护：支持事务处理，保证数据的一致性和安全性，减少数据冗余和不一致的问题。</li><li>复杂操作：可以用SQL语句进行多表之间的联合查询，实现复杂的业务逻辑。</li></ul><p>关系型数据库的缺点是：</p><ul><li><p>读写性能差：面对海量数据和高并发访问时，硬盘I/O存在瓶颈，查询速度较慢。</p></li><li><p>可扩展性差：数据之间有耦合关系，不容易进行水平扩展，需要增加硬件成本。</p></li><li><p>数据模型灵活度低：数据结构需要预先定义好，不适合存储非结构化或半结构化的数据。</p><p>非关系型数据库是指非关系型的，分布式的，一般不保证遵守ACID原则的数据存储系统，例如Redis, MongoDB, Neo4j等。 非关系型数据库的优点是：</p></li><li><p>格式灵活：数据存储格式可以是键值对、文档、图形等，适合存储多样化和动态变化的数据。</p></li><li><p>性能优越：数据存储在内存或缓存中，不需要经过SQL层的解析，读写速度非常快。</p></li><li><p>可扩展性强：数据之间没有耦合关系，容易进行水平扩展，成本低廉。</p></li></ul><p>非关系型数据库的缺点是：</p><ul><li>不支持SQL：学习和使用成本较高，需要掌握不同的查询语言和API。</li><li>数据一致性差：没有事务处理机制，无法保证数据的完整性和安全性。</li><li>复杂查询难以实现：没有标准的查询语言，不支持多表联合查询和聚合操作。</li></ul><h2 id="数据库三范式" tabindex="-1"><a class="header-anchor" href="#数据库三范式" aria-hidden="true">#</a> 数据库三范式</h2><p>数据库三范式是关系型数据库设计的一种规范，目的是为了减少数据冗余，提高数据完整性和一致性，优化数据库性能。</p><p>数据库三范式分别是：</p><ul><li>第一范式（1NF）：要求表中的每一列都是不可分解的原子值，也就是说每个字段都只包含一个单一的值，不能再拆分成更小的部分。</li><li>第二范式（2NF）：要求表中的每一列都和主键完全相关，而不是部分相关或无关。也就是说，如果表中有联合主键，那么其他非主键列必须依赖于所有主键列，而不能只依赖于其中的某些主键列。</li><li>第三范式（3NF）：要求表中的每一列都和主键直接相关，而不是间接相关。也就是说，如果表中有非主键列之间存在函数依赖关系，那么就要将这些非主键列拆分到另外的表中，避免传递依赖。</li></ul><p>遵循数据库三范式的好处是：</p><ul><li>可以减少数据冗余，节省存储空间，避免数据重复和不一致。</li><li>可以提高数据完整性和安全性，保证数据的准确性和有效性。</li><li>可以提高查询效率和更新速度，简化数据库维护和管理。</li></ul><p>数据库三范式并不是一定要严格遵守的，有时候为了满足特定的业务需求或性能优化，也可以适当地违反范式原则，进行反范式化设计。</p><h2 id="什么是函数依赖" tabindex="-1"><a class="header-anchor" href="#什么是函数依赖" aria-hidden="true">#</a> 什么是函数依赖</h2><p>函数依赖是指关系数据库中属性之间的一种约束关系，表示一个属性集的值能够唯一确定另一个属性集的值。例如，如果一个学生的学号能够唯一确定他的姓名和年龄，那么就可以说姓名和年龄函数依赖于学号。</p><p>函数依赖有助于分析和设计关系数据库，可以用来消除数据冗余，提高数据完整性和一致性，优化数据库性能。</p><p>函数依赖有不同的类型，例如完全函数依赖、部分函数依赖、传递函数依赖等，它们反映了属性之间的不同程度的依赖关系。</p><h2 id="手写-sql-表中有-user-id-和-price-两个字段-查出-user-id-1-时的最大-price" tabindex="-1"><a class="header-anchor" href="#手写-sql-表中有-user-id-和-price-两个字段-查出-user-id-1-时的最大-price" aria-hidden="true">#</a> 手写 SQL：表中有 user_id 和 price 两个字段，查出 user_id = 1 时的最大 price</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 使用子查询和MAX函数</span>
<span class="token keyword">SELECT</span> <span class="token function">MAX</span><span class="token punctuation">(</span>price<span class="token punctuation">)</span> <span class="token keyword">AS</span> max_price
<span class="token keyword">FROM</span> orders
<span class="token keyword">WHERE</span> user_id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">-- 使用分组和排序</span>
<span class="token keyword">SELECT</span> price <span class="token keyword">AS</span> max_price
<span class="token keyword">FROM</span> orders
<span class="token keyword">WHERE</span> user_id <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> price <span class="token keyword">DESC</span>
<span class="token keyword">LIMIT</span> <span class="token number">1</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="手写-sql-删除表中重复的数据-只保留其中一条记录" tabindex="-1"><a class="header-anchor" href="#手写-sql-删除表中重复的数据-只保留其中一条记录" aria-hidden="true">#</a> 手写 SQL：删除表中重复的数据，只保留其中一条记录</h2><p>删除表中重复的数据是一个常见的数据库操作，有多种方法可以实现。 这里我给您介绍两种常用的方法，分别是使用临时表和使用ROW_NUMBER函数。</p><ul><li>使用临时表：这种方法的思路是先将表中的数据复制到一个临时表中，然后删除原表中的所有数据，最后从临时表中选择不重复的数据插入到原表中。 例如，如果您的表名是<code>students</code>，有两个字段<code>id</code>和<code>name</code>，那么您可以使用以下SQL语句来实现您的需求：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 创建一个临时表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">temp</span> <span class="token keyword">AS</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> students<span class="token punctuation">;</span>

<span class="token comment">-- 删除原表中的所有数据</span>
<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> students<span class="token punctuation">;</span>

<span class="token comment">-- 从临时表中选择不重复的数据插入到原表中</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> students
<span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> id<span class="token punctuation">,</span> name <span class="token keyword">FROM</span> <span class="token keyword">temp</span><span class="token punctuation">;</span>

<span class="token comment">-- 删除临时表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">temp</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用ROW_NUMBER函数：这种方法的思路是先给每一行数据分配一个序号，根据需要去重的字段进行分组，然后只保留每组中序号为1的记录，删除其他记录。 例如，如果您的表名是<code>students</code>，有两个字段<code>id</code>和<code>name</code>，那么您可以使用以下SQL语句来实现您的需求：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 给每一行数据分配一个序号，根据name字段进行分组</span>
<span class="token keyword">WITH</span> cte <span class="token keyword">AS</span> <span class="token punctuation">(</span>
  <span class="token keyword">SELECT</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> ROW_NUMBER<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span> <span class="token punctuation">(</span><span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> name <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> id<span class="token punctuation">)</span> <span class="token keyword">AS</span> rn
  <span class="token keyword">FROM</span> students
<span class="token punctuation">)</span>

<span class="token comment">-- 只保留每组中序号为1的记录，删除其他记录</span>
<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> cte <span class="token keyword">WHERE</span> rn <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两种方法都可以达到删除表中重复数据的目的，但是在性能上可能有所差异。一般来说，使用ROW_NUMBER函数比使用临时表更快，因为临时表需要创建和删除额外的空间，而ROW_NUMBER函数只需要在内存中进行计算。</p><h2 id="手写-sql-查询前七天数据" tabindex="-1"><a class="header-anchor" href="#手写-sql-查询前七天数据" aria-hidden="true">#</a> 手写 SQL：查询前七天数据</h2><p>查询前七天的数据是一个常见的数据库操作，有多种方法可以实现。这里我给您介绍两种常用的方法，分别是使用DATE_SUB函数和使用BETWEEN运算符。</p><ul><li>使用DATE_SUB函数：这种方法的思路是使用DATE_SUB函数从当前日期减去7天，得到前七天的起始日期，然后用大于等于运算符进行筛选。例如，如果您的表名是<code>orders</code>，有一个字段<code>order_date</code>，那么您可以使用以下SQL语句来实现您的需求：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 使用DATE_SUB函数</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> order_info
<span class="token keyword">WHERE</span> create_time <span class="token operator">&gt;=</span> DATE_SUB<span class="token punctuation">(</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">INTERVAL</span> <span class="token number">7</span> <span class="token keyword">DAY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用BETWEEN运算符：这种方法的思路是使用BETWEEN运算符指定前七天的日期范围，然后进行筛选。例如，如果您的表名是<code>orders</code>，有一个字段<code>order_date</code>，那么您可以使用以下SQL语句来实现您的需求：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 使用BETWEEN运算符</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> order_info
<span class="token keyword">WHERE</span> order_date <span class="token operator">BETWEEN</span> DATE_SUB<span class="token punctuation">(</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">INTERVAL</span> <span class="token number">7</span> <span class="token keyword">DAY</span><span class="token punctuation">)</span> <span class="token operator">AND</span> <span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两种方法都可以达到查询前七天数据的目的，但是在性能上可能有所差异。一般来说，使用BETWEEN运算符比使用DATE_SUB函数更快，因为BETWEEN运算符可以利用索引进行优化，而DATE_SUB函数会导致全表扫描。</p><h2 id="手写-sql-查询销量前十的商品信息" tabindex="-1"><a class="header-anchor" href="#手写-sql-查询销量前十的商品信息" aria-hidden="true">#</a> 手写 SQL：查询销量前十的商品信息</h2><p>查询销量前十的商品信息是一个常见的数据库操作，有多种方法可以实现。这里我给您介绍两种常用的方法，分别是使用LIMIT子句和使用RANK函数。</p><ul><li>使用LIMIT子句：这种方法的思路是先按照销量降序排序，然后使用LIMIT子句限制返回的记录数为10。例如，如果您的表名是<code>products</code>，有两个字段<code>product_name</code>和<code>sales</code>，那么您可以使用以下SQL语句来实现您的需求：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 使用LIMIT子句</span>
<span class="token keyword">SELECT</span> product_name<span class="token punctuation">,</span> sales <span class="token keyword">FROM</span> products
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> sales <span class="token keyword">DESC</span>
<span class="token keyword">LIMIT</span> <span class="token number">10</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用RANK函数：这种方法的思路是先使用RANK函数给每个商品分配一个销量排名，然后只选择排名小于等于10的记录。例如，如果您的表名是<code>products</code>，有两个字段<code>product_name</code>和<code>sales</code>，那么您可以使用以下SQL语句来实现您的需求：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 使用RANK函数</span>
<span class="token keyword">WITH</span> cte <span class="token keyword">AS</span> <span class="token punctuation">(</span>
  <span class="token keyword">SELECT</span> product_name<span class="token punctuation">,</span> sales<span class="token punctuation">,</span> RANK<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span> <span class="token punctuation">(</span><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> sales <span class="token keyword">DESC</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> rank
  <span class="token keyword">FROM</span> products
<span class="token punctuation">)</span>

<span class="token keyword">SELECT</span> product_name<span class="token punctuation">,</span> sales <span class="token keyword">FROM</span> cte
<span class="token keyword">WHERE</span> rank <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两种方法都可以达到查询销量前十的商品信息的目的，但是在性能上可能有所差异。一般来说，使用LIMIT子句比使用RANK函数更快，因为LIMIT子句只需要扫描前10条记录，而RANK函数需要扫描所有记录。</p><p>根据订单表查：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token function">count</span><span class="token punctuation">(</span>order_id<span class="token punctuation">)</span> <span class="token keyword">AS</span> count <span class="token keyword">FROM</span> orders <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> order_id <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> count <span class="token keyword">DESC</span> <span class="token keyword">LIMIT</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="手写-sql-有一张订单表-status-字段表示某个订单的状态-如何查询出各个状态的百分比" tabindex="-1"><a class="header-anchor" href="#手写-sql-有一张订单表-status-字段表示某个订单的状态-如何查询出各个状态的百分比" aria-hidden="true">#</a> 手写 SQL：有一张订单表，status 字段表示某个订单的状态，如何查询出各个状态的百分比</h2><p>查询订单表中各个状态的百分比是一个常见的数据库操作，有多种方法可以实现。这里我给您介绍一种常用的方法，使用GROUP BY子句和COUNT函数。</p><ul><li>使用GROUP BY子句和COUNT函数：这种方法的思路是先按照status字段进行分组，然后使用COUNT函数统计每个分组的记录数，再除以总记录数，得到每个状态的百分比。例如，如果您的表名是<code>orders</code>，有一个字段<code>status</code>，那么您可以使用以下SQL语句来实现您的需求：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 使用GROUP BY子句和COUNT函数</span>
<span class="token keyword">SELECT</span> <span class="token keyword">status</span><span class="token punctuation">,</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token keyword">status</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token keyword">status</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> order_info<span class="token punctuation">)</span> a <span class="token keyword">FROM</span> order_info <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> <span class="token keyword">status</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法可以得到订单表中各个状态的百分比，但是在性能上可能有所差异。一般来说，使用GROUP BY子句和COUNT函数比较快，因为只需要扫描一次表，而不需要进行多次查询。</p><h2 id="手写-sql-有学生表和成绩表-请分别查询没考试的学生信息、参加了两门考试的学生" tabindex="-1"><a class="header-anchor" href="#手写-sql-有学生表和成绩表-请分别查询没考试的学生信息、参加了两门考试的学生" aria-hidden="true">#</a> 手写 SQL：有学生表和成绩表，请分别查询没考试的学生信息、参加了两门考试的学生</h2><p>查询学生表和成绩表中的相关信息是一个常见的数据库操作，需要使用连接查询和聚合函数等技巧。这里我给您介绍一种常用的方法，使用LEFT JOIN子句和COUNT函数。</p><ul><li>查询没考试的学生信息：这种方法的思路是先使用LEFT JOIN子句将学生表和成绩表按照学号进行左连接，然后使用WHERE子句筛选出成绩表中没有记录的学生，即没考试的学生。例如，如果您的学生表名是<code>students</code>，有两个字段<code>student_id</code>和<code>student_name</code>，您的成绩表名是<code>scores</code>，有三个字段<code>student_id</code>，<code>course_id</code>和<code>score</code>，那么您可以使用以下SQL语句来实现您的需求：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查询没考试的学生信息</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>student_id<span class="token punctuation">,</span> s<span class="token punctuation">.</span>student_name
<span class="token keyword">FROM</span> students s
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> scores sc
<span class="token keyword">ON</span> s<span class="token punctuation">.</span>student_id <span class="token operator">=</span> sc<span class="token punctuation">.</span>student_id
<span class="token keyword">WHERE</span> sc<span class="token punctuation">.</span>student_id <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查询参加了两门考试的学生：这种方法的思路是先使用GROUP BY子句和COUNT函数将成绩表按照学号进行分组，并统计每个分组的记录数，即参加了多少门考试，然后使用HAVING子句筛选出记录数为2的分组，即参加了两门考试的学生。例如，如果您的成绩表名是<code>scores</code>，有三个字段<code>student_id</code>，<code>course_id</code>和<code>score</code>，那么您可以使用以下SQL语句来实现您的需求：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查询参加了两门考试的学生</span>
<span class="token keyword">SELECT</span> student_id<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> exam_count
<span class="token keyword">FROM</span> scores
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> student_id
<span class="token keyword">HAVING</span> exam_count <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法可以得到学生表和成绩表中的相关信息，但是在性能上可能有所差异。一般来说，使用LEFT JOIN子句和COUNT函数比较快，因为它们可以利用索引进行优化，而不需要进行多次查询。</p><h2 id="手写-sql-计算新用户首日留存率" tabindex="-1"><a class="header-anchor" href="#手写-sql-计算新用户首日留存率" aria-hidden="true">#</a> 手写 SQL：计算新用户首日留存率</h2><p>新用户首日留存率是指在某一天注册或首次访问的用户中，有多少在第二天再次访问的用户占比。它是衡量产品吸引力和用户粘性的重要指标之一。</p><p>要计算新用户首日留存率，我们需要以下几个步骤：</p><ul><li>首先，我们需要确定新用户的定义，即注册或首次访问的日期。这可以通过对用户表按照用户ID分组，取最小的日期作为新用户日期来实现。例如，如果我们的用户表名是<code>users</code>，有两个字段<code>user_id</code>和<code>login_date</code>，那么我们可以使用以下SQL语句来获取每个用户的新用户日期：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 获取每个用户的新用户日期</span>
<span class="token keyword">SELECT</span> user_id<span class="token punctuation">,</span> <span class="token function">MIN</span><span class="token punctuation">(</span>login_date<span class="token punctuation">)</span> <span class="token keyword">AS</span> new_user_date
<span class="token keyword">FROM</span> users
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> user_id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后，我们需要确定哪些新用户在第二天再次访问了产品，即次日留存的用户。这可以通过对上一步得到的结果表和原始的用户表进行自连接，按照用户ID匹配，并且筛选出登录日期和新用户日期相差一天的记录来实现。例如，如果我们把上一步得到的结果表命名为<code>new_users</code>，那么我们可以使用以下SQL语句来获取次日留存的用户：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 获取次日留存的用户</span>
<span class="token keyword">SELECT</span> n<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span> n<span class="token punctuation">.</span>new_user_date<span class="token punctuation">,</span> u<span class="token punctuation">.</span>login_date <span class="token keyword">AS</span> next_day_login_date
<span class="token keyword">FROM</span> new_users n
<span class="token keyword">JOIN</span> users u
<span class="token keyword">ON</span> n<span class="token punctuation">.</span>user_id <span class="token operator">=</span> u<span class="token punctuation">.</span>user_id
<span class="token operator">AND</span> DATEDIFF<span class="token punctuation">(</span>u<span class="token punctuation">.</span>login_date<span class="token punctuation">,</span> n<span class="token punctuation">.</span>new_user_date<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>最后，我们需要根据某一天的新用户数和次日留存的用户数来计算新用户首日留存率。这可以通过对上一步得到的结果表按照新用户日期分组，统计每组的记录数，并除以每天的新用户数来实现。例如，如果我们把上一步得到的结果表命名为<code>next_day_retention_users</code>，那么我们可以使用以下SQL语句来计算每天的新用户首日留存率：</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 计算每天的新用户首日留存率</span>
<span class="token keyword">SELECT</span> n<span class="token punctuation">.</span>new_user_date<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>user_id<span class="token punctuation">)</span> <span class="token keyword">AS</span> next_day_retention_count<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>user_id<span class="token punctuation">)</span> <span class="token operator">/</span> u<span class="token punctuation">.</span>new_user_count <span class="token keyword">AS</span> next_day_retention_rate
<span class="token keyword">FROM</span> next_day_retention_users n
<span class="token keyword">JOIN</span> <span class="token punctuation">(</span>
  <span class="token comment">-- 计算每天的新用户数</span>
  <span class="token keyword">SELECT</span> new_user_date<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>user_id<span class="token punctuation">)</span> <span class="token keyword">AS</span> new_user_count
  <span class="token keyword">FROM</span> new_users
  <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> new_user_date
<span class="token punctuation">)</span> u
<span class="token keyword">ON</span> n<span class="token punctuation">.</span>new_user_date <span class="token operator">=</span> u<span class="token punctuation">.</span>new_user_date
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> n<span class="token punctuation">.</span>new_user_date<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上就是手写SQL语句计算新用户首日留存率的方法</p>`,66),l=[o];function t(c,d){return n(),a("div",null,l)}const r=s(p,[["render",t],["__file","MYSQL基础.html.vue"]]);export{r as default};
