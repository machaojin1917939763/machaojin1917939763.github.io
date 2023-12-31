const e=JSON.parse('{"key":"v-4296005a","path":"/blog/MYSQL%E6%95%B0%E6%8D%AE%E5%BA%93/MYSQL%E9%94%81%E6%9C%BA%E5%88%B6.html","title":"MYSQL锁机制","lang":"zh-CN","frontmatter":{"title":"MYSQL锁机制","order":2,"category":["MYSQL"],"tag":["MYSQL"],"description":"说一下 MySQL 的事务（ACID 特性） MySQL 的事务（ACID 特性） MySQL 的事务是一系列的操作，要么全部执行，要么全部不执行，确保数据的完整性和一致性。事务的核心是 ACID 特性，以下是详细解释： 1. 原子性 (Atomicity) 原子性确保事务作为一个单独的单位被执行。也就是说，要么全部操作执行，要么全部操作都不执行。; ...","head":[["meta",{"property":"og:url","content":"https://machaojin.cn/blog/MYSQL%E6%95%B0%E6%8D%AE%E5%BA%93/MYSQL%E9%94%81%E6%9C%BA%E5%88%B6.html"}],["meta",{"property":"og:site_name","content":"JavaBlog"}],["meta",{"property":"og:title","content":"MYSQL锁机制"}],["meta",{"property":"og:description","content":"说一下 MySQL 的事务（ACID 特性） MySQL 的事务（ACID 特性） MySQL 的事务是一系列的操作，要么全部执行，要么全部不执行，确保数据的完整性和一致性。事务的核心是 ACID 特性，以下是详细解释： 1. 原子性 (Atomicity) 原子性确保事务作为一个单独的单位被执行。也就是说，要么全部操作执行，要么全部操作都不执行。; ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-31T06:15:54.000Z"}],["meta",{"property":"article:author","content":"Mr.Chaojin"}],["meta",{"property":"article:tag","content":"MYSQL"}],["meta",{"property":"article:modified_time","content":"2023-08-31T06:15:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MYSQL锁机制\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-08-31T06:15:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Chaojin\\",\\"url\\":\\"https://machaojin.cn\\",\\"email\\":\\"ma@machaojin.cn\\"}]}"]]},"headers":[{"level":2,"title":"说一下 MySQL 的事务（ACID 特性）","slug":"说一下-mysql-的事务-acid-特性","link":"#说一下-mysql-的事务-acid-特性","children":[{"level":3,"title":"MySQL 的事务（ACID 特性）","slug":"mysql-的事务-acid-特性","link":"#mysql-的事务-acid-特性","children":[]}]},{"level":2,"title":"MySQL 具体有哪些锁、粒度和开销","slug":"mysql-具体有哪些锁、粒度和开销","link":"#mysql-具体有哪些锁、粒度和开销","children":[{"level":3,"title":"MySQL 的锁、粒度和开销","slug":"mysql-的锁、粒度和开销","link":"#mysql-的锁、粒度和开销","children":[]}]},{"level":2,"title":"InnoDB 有哪几种行锁？","slug":"innodb-有哪几种行锁","link":"#innodb-有哪几种行锁","children":[{"level":3,"title":"InnoDB 的行锁","slug":"innodb-的行锁","link":"#innodb-的行锁","children":[]}]},{"level":2,"title":"InnoDB 行锁的内部实现原理是什么","slug":"innodb-行锁的内部实现原理是什么","link":"#innodb-行锁的内部实现原理是什么","children":[{"level":3,"title":"InnoDB 行锁的内部实现原理","slug":"innodb-行锁的内部实现原理","link":"#innodb-行锁的内部实现原理","children":[]}]},{"level":2,"title":"锁是如何加载索引上的？","slug":"锁是如何加载索引上的","link":"#锁是如何加载索引上的","children":[{"level":3,"title":"锁在索引上的加载方式","slug":"锁在索引上的加载方式","link":"#锁在索引上的加载方式","children":[]}]},{"level":2,"title":"如果一张表有五个索引，一个加锁语句进来，会不会同时对五个索引加锁？","slug":"如果一张表有五个索引-一个加锁语句进来-会不会同时对五个索引加锁","link":"#如果一张表有五个索引-一个加锁语句进来-会不会同时对五个索引加锁","children":[{"level":3,"title":"对多索引表的锁定行为","slug":"对多索引表的锁定行为","link":"#对多索引表的锁定行为","children":[]}]}],"git":{"createdTime":1692959738000,"updatedTime":1693462554000,"contributors":[{"name":"machaojin","email":"1917939763@qq.com","commits":4}]},"readingTime":{"minutes":9.83,"words":2948},"filePathRelative":"blog/MYSQL数据库/MYSQL锁机制.md","localizedDate":"2023年8月25日","autoDesc":true}');export{e as data};
