import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as e,b as n}from"./app-6e0de965.js";const a={},o=n('<h2 id="一条-sql-查询语句怎么执行的" tabindex="-1"><a class="header-anchor" href="#一条-sql-查询语句怎么执行的" aria-hidden="true">#</a> 一条 SQL 查询语句怎么执行的</h2><p>一条SQL查询语句的执行过程，可以分为以下几个步骤：</p><ul><li><p>连接器：负责与客户端建立连接，获取权限，维持和管理连接。连接器会根据客户端提供的用户名和密码，进行身份验证，并分配相应的权限。连接器还会维护一个连接池，用于复用已经建立的连接，避免频繁地创建和销毁连接。</p></li><li><p>查询缓存：负责缓存执行过的SQL语句及其结果集，如果命中缓存，直接返回结果，否则继续执行后续步骤。（注意：MySQL 8.0已经移除了查询缓存功能）查询缓存会根据SQL语句的文本内容进行匹配，如果有任何字符不同，就会视为不同的SQL语句。查询缓存也会根据表的更新情况进行失效，如果表发生了任何变化，那么与该表相关的所有缓存都会被清除。</p></li><li><p>分析器：负责对SQL语句进行词法分析和语法分析，识别出SQL语句的组成部分，如关键字，表名，字段名，条件等，并检查是否符合MySQL的语法规则。词法分析是将SQL语句拆分成一个个单词或符号，例如select, from, where等。语法分析是将词法分析得到的单词或符号组合成一棵语法树，用于表示SQL语句的结构和逻辑。</p></li><li><p>预处理：我们先来说说预处理阶段做了什么事情。</p><ul><li>检查 SQL 查询语句中的表或者字段是否存在；</li><li>将 <code>select *</code> 中的 <code>*</code> 符号，扩展为表上的所有列；</li></ul><p>我下面这条查询语句，test 这张表是不存在的，这时 MySQL 就会在执行 SQL 查询语句的 prepare 阶段中报错。</p></li><li><p>优化器：负责对SQL语句进行优化，选择最合适的执行计划，如选择索引，确定连接顺序等。优化器会根据表的统计信息和系统参数等因素，比较不同的执行计划，并选择成本最低的一个。优化器也会根据一些规则和策略，对SQL语句进行重写或简化，以提高执行效率。</p></li><li><p>执行器：负责根据优化器的执行计划，调用存储引擎的接口，执行SQL语句，并返回结果。执行器会先检查用户是否有权限访问相应的表和字段，如果没有权限，则返回错误信息；如果有权限，则按照执行计划依次执行每个操作，并从存储引擎获取数据；最后将数据进行处理和格式化，并返回给客户端。</p></li><li><figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/mysql/sql执行过程/mysql查询流程.png" alt="查询语句执行流程" tabindex="0" loading="lazy"><figcaption>查询语句执行流程</figcaption></figure></li></ul><h2 id="还知道有什么存储引擎么-myisam-这些存储引擎的区别" tabindex="-1"><a class="header-anchor" href="#还知道有什么存储引擎么-myisam-这些存储引擎的区别" aria-hidden="true">#</a> 还知道有什么存储引擎么(MyISAM)，这些存储引擎的区别</h2><p>MySQL支持多种存储引擎，每种存储引擎都有自己的特点和适用场景。除了InnoDB、MyISAM和Memory之外，还有以下一些常见的存储引擎：</p><ul><li><p>Archive：用于存储大量的归档数据，如日志或历史记录。它只支持插入和查询操作，不支持更新和删除操作。它使用行级锁和压缩技术，可以节省存储空间和提高查询速度。</p><p>[Blackhole：用于丢弃所有插入的数据，只保留表的结构。它可以用于复制或测试等场景，不占用任何存储空间。</p></li><li><p>CSV：用于将数据以逗号分隔的文本格式存储在文件中。它可以方便地与其他应用程序进行数据交换，但不支持索引和事务。</p></li><li><p>Federated：用于访问远程数据库中的表，就像它们是本地表一样。它可以实现跨数据库的查询和操作，但不支持外键和事务。</p></li><li><p>NDB Cluster：用于实现分布式的高可用性和高性能的数据库集群。它支持事务、行级锁、外键和分区等功能，但不支持全文索引和保存点等功能。</p></li></ul><p>与MyISAM相比，这些存储引擎有以下一些区别：</p><ul><li><p>MyISAM支持全文索引、压缩表、空间函数等功能，而其他存储引擎不支持或有限制。</p></li><li><p>MyISAM不支持事务、外键、行级锁等功能，而其他存储引擎支持或部分支持。</p><p>MyISAM将数据和索引分开存储在文件中，而其他存储引擎有不同的存储方式，如Archive使用压缩文件，CSV使用文本文件，NDB Cluster使用内存和磁盘等。</p></li><li><p>MyISAM适合于读多写少、数据量小、不需要事务保证的场景，而其他存储引擎适合于不同的场景，如Archive适合于归档数据，Blackhole适合于复制或测试，CSV适合于数据交换，Federated适合于跨数据库访问，NDB Cluster适合于高可用性和高性能的集群等。</p></li></ul><h2 id="innodb和myisam的区别" tabindex="-1"><a class="header-anchor" href="#innodb和myisam的区别" aria-hidden="true">#</a> InnoDB和MyISAM的区别</h2><p>InnoDB和MyISAM的区别主要有以下几点：</p><ul><li>InnoDB支持事务，外键，行级锁等功能，而MyISAM不支持。这使得InnoDB更适合于需要高并发和数据一致性的场景。</li><li>InnoDB是聚集索引，也就是说，表中的数据按照主键的顺序存储在B+树中，而MyISAM是非聚集索引，也就是说，表中的数据和索引是分开存储的。这使得InnoDB在主键查询方面更快，而MyISAM在非主键查询方面更快。</li><li>InnoDB不保存表的具体行数，执行select count(*) from table时需要全表扫描。而MyISAM用一个变量保存了整个表的行数，执行上述语句时只需要读出该变量即可。这使得MyISAM在统计数据方面更快。</li><li>InnoDB不支持全文索引（MySQL 5.7以后支持），而MyISAM支持全文索引。这使得MyISAM在全文搜索方面更快。</li><li>InnoDB占用更多的存储空间，而MyISAM占用更少的存储空间。这是因为InnoDB需要额外的空间来存储事务日志，回滚段等信息。</li><li>InnoDB可以自动恢复数据，而MyISAM需要手动修复数据。这是因为InnoDB有事务日志和检查点等机制来保证数据的完整性。</li></ul><h2 id="innodb-存储引擎的数据组织形式" tabindex="-1"><a class="header-anchor" href="#innodb-存储引擎的数据组织形式" aria-hidden="true">#</a> InnoDB 存储引擎的数据组织形式</h2><p>InnoDB存储引擎是MySQL中最常用的存储引擎之一，它支持事务、外键、行级锁等功能，适合于高并发和数据一致性的场景。</p><p>InnoDB存储引擎的数据组织形式，可以分为以下几个层次：</p><ul><li>表空间：是InnoDB存储引擎的最高层次，它包含了所有的数据和索引信息。表空间可以由一个或多个文件组成，可以是共享的或独立的。段：是表空间中的逻辑分区，用于存储不同类型的数据，如数据段、索引段、回滚段等。每个段都由一个或多个区组成。</li><li>区：是表空间中的物理分区，每个区固定为1MB大小，由连续的页组成。每个区都有一个位图来记录哪些页已经分配和使用。</li><li>页：是InnoDB存储引擎的基本单位，每个页固定为16KB大小，由若干行记录组成。每个页都有一个页头和页尾来存储一些元数据信息，如页类型、页号、校验和等。</li><li>行：是InnoDB存储引擎的最小单位，每行记录包含了真实的数据和一些额外的信息，如行头、变长字段长度列表、NULL值列表等。每行记录都有一个唯一的行ID来标识它在表中的位置。</li></ul><h2 id="mysql-是怎么存储-null-的" tabindex="-1"><a class="header-anchor" href="#mysql-是怎么存储-null-的" aria-hidden="true">#</a> MySQL 是怎么存储 NULL 的？</h2><p>MySQL 是一种关系型数据库管理系统，它使用 SQL 语言来操作数据。SQL 语言中有一个特殊的值，叫做 NULL，表示缺失或未知的数据。NULL 值在 MySQL 中是怎么存储的呢？这取决于 MySQL 使用的存储引擎和行格式。</p><p>MySQL 支持多种存储引擎，不同的存储引擎有不同的存储结构和性能特点。其中，InnoDB 是 MySQL 的默认存储引擎，它是一种事务型的存储引擎，支持行级锁和外键约束。InnoDB 的数据是按照表空间（tablespace）来组织的，表空间由段（segment）、区（extent）、页（page）和行（row）组成。每个页的大小为 16KB，是 InnoDB 磁盘管理的最小单元。每个页可以存放多个行记录，每个行记录由事务 ID、回滚指针、列信息等组成。</p><p>InnoDB 提供了四种行格式（row format），分别是 Redundant、Compact、Dynamic 和 Compressed。Redundant 是最早的行格式，已经很少使用了。Compact 是一种紧凑的行格式，从 MySQL 5.1 版本开始，默认使用 Compact 行格式。Dynamic 和 Compressed 是两种新的行格式，从 MySQL 5.5 版本开始支持，它们可以更好地处理变长字段和大对象字段。Compressed 行格式还可以对数据进行压缩，节省空间。</p><p>不同的行格式在存储 NULL 值时有不同的方式。Compact 行格式是最常用的一种，它把 NULL 值存储在一个叫做 NULL 值列表（NULL value list）的地方，而不是放在真实数据中。NULL 值列表占用一个字节的空间，用一个位图（bitmap）来表示哪些列是 NULL 值。如果有 n 个列，那么需要 (n+7)/8 个字节来存储 NULL 值列表。如果表中所有列都定义为 NOT NULL，那么就不需要 NULL 值列表了。</p><p>Dynamic 和 Compressed 行格式也是类似的，它们也把 NULL 值存储在 NULL 值列表中，但是它们还会对变长字段和大对象字段进行特殊处理。如果一个变长字段或者大对象字段的值超过了 40 字节（或者 20 字节），那么它们会把这个值放到一个叫做溢出页（overflow page）中，而不是放在数据页中。数据页中只会保存这个值的前 20 字节和一个指向溢出页的指针。这样可以让数据页中存放更多的行记录，提高空间利用率。</p><p>Redundant 行格式是最旧的一种，它没有使用 NULL 值列表来存储 NULL 值，而是直接把 NULL 值放在真实数据中。这样会占用更多的空间，而且还会影响索引效率。因此，Redundant 行格式已经很少使用了。</p><p>MySQL 中不同的存储引擎和行格式会影响 NULL 值的存储方式和性能。一般来说，在设计表结构时，应该尽量避免使用 NULL 值，因为它会增加额外的空间开销和查询复杂度。如果必须使用 NULL 值，那么应该选择合适的存储引擎和行格式来优化空间利用率和查询效率。</p><h2 id="mysql-建表需要注意什么" tabindex="-1"><a class="header-anchor" href="#mysql-建表需要注意什么" aria-hidden="true">#</a> MySQL 建表需要注意什么</h2><p>MySQL 建表是一个重要的数据库设计过程，需要注意以下几个方面：</p><ul><li>库名、表名、字段名的命名规范。一般建议使用小写字母和下划线分隔，见名知意，不超过 30 个字符，避免使用 MySQL 的关键字和保留字</li><li>字段类型的选择。根据字段的实际数据类型和长度，选择合适的字段类型，避免浪费空间或者溢出。例如，对于整数类型，可以根据数值范围选择 tinyint、smallint、int、bigint 等；对于字符串类型，可以根据长度和是否固定选择 char、varchar、text 等；对于时间类型，可以根据精度和时区选择 date、datetime、timestamp 等</li><li>字段属性的设置。根据字段的业务含义和约束条件，设置合适的字段属性，例如 not null、default、auto_increment、zerofill 等。例如，对于主键字段，可以设置为 not null 和 auto_increment；对于状态字段，可以设置为 not null 和 default；对于金额字段，可以设置为 zerofill 等索引的创建。根据查询需求和性能优化，创建合适的索引，例如主键索引、唯一索引、普通索引、联合索引等。索引可以提高查询效率，但也会增加插入和更新的开销，所以要权衡利弊。一般建议为经常作为查询条件或者排序依据的字段创建索引，尤其是主键和外键。索引的命名也要遵循一定的规范，例如主键索引可以命名为 pk_字段名；唯一索引可以命名为 ux_字段名；普通索引或者联合索引可以命名为 ix_字段名等</li><li>表结构的优化。根据数据量和业务逻辑，优化表结构，避免出现冗余或者不一致的数据。例如，可以使用范式化（normalization）的方法，将一个大表拆分成多个小表，并通过主外键关联；也可以使用反范式化（denormalization）的方法，将多个小表合并成一个大表，并通过冗余字段减少关联查询。</li></ul><h2 id="zerofill是什么" tabindex="-1"><a class="header-anchor" href="#zerofill是什么" aria-hidden="true">#</a> zerofill是什么？</h2><p>zerofill 是 MySQL 中的一个属性，用于在数字类型的字段中填充前导零。例如，如果你定义一个 int(4) zerofill 的字段，那么当你插入一个值为 5 的数据时，它会显示为 0005。这样可以让数字的显示更加规范和美观。</p><p>zerofill 属性只是一个显示效果，并不影响数据的实际存储和计算。它也不会改变数据的类型和范围。zerofill 属性只有在字段定义为 unsigned 时才有效，也就是说，不能存储负数的字段。如果你试图插入一个负数或者超过字段范围的数值，MySQL 会报错或者截断。</p><p>zerofill 属性有一些注意事项和限制，例如：</p><ul><li>zerofill 属性会被忽略，如果字段参与了表达式或者联合查询。</li><li>zerofill 属性会影响排序和比较的结果，因为它会把数字转换为字符串进行操作。</li><li>zerofill 属性可能会导致一些不兼容的问题，如果你使用了其他的数据库系统或者客户端程序。</li></ul>',31),r=[o];function t(p,L){return i(),e("div",null,r)}const c=l(a,[["render",t],["__file","MYSQL的组成.html.vue"]]);export{c as default};
