const e=JSON.parse('{"key":"v-48560a73","path":"/blog/%E9%A1%B9%E7%9B%AE/12306/%E5%B9%82%E7%AD%89%E7%BB%84%E4%BB%B6%E6%89%A7%E8%A1%8C%E9%80%BB%E8%BE%91.html","title":"幂等组件","lang":"zh-CN","frontmatter":{"title":"幂等组件","order":2,"description":"幂等组件执行流程 在项目中实现了一个幂等注解的类 该注解通过AOP的形式使用在需要增强的方法上面，然后通过Aspect动态代理拿到注解上面的值 需要注意的是，不同的参数组合适用于不同的场景，比如： key只有在幂等类型为spEl的时候才生效，通常使用的话代表着SpEl表达式 防重令牌是在redis存储中，用于存放key的前缀 keyTimeout加锁的...","head":[["meta",{"property":"og:url","content":"https://machaojin.cn/blog/%E9%A1%B9%E7%9B%AE/12306/%E5%B9%82%E7%AD%89%E7%BB%84%E4%BB%B6%E6%89%A7%E8%A1%8C%E9%80%BB%E8%BE%91.html"}],["meta",{"property":"og:site_name","content":"JavaBlog"}],["meta",{"property":"og:title","content":"幂等组件"}],["meta",{"property":"og:description","content":"幂等组件执行流程 在项目中实现了一个幂等注解的类 该注解通过AOP的形式使用在需要增强的方法上面，然后通过Aspect动态代理拿到注解上面的值 需要注意的是，不同的参数组合适用于不同的场景，比如： key只有在幂等类型为spEl的时候才生效，通常使用的话代表着SpEl表达式 防重令牌是在redis存储中，用于存放key的前缀 keyTimeout加锁的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-01T04:52:11.000Z"}],["meta",{"property":"article:author","content":"Mr.Chaojin"}],["meta",{"property":"article:modified_time","content":"2023-09-01T04:52:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"幂等组件\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-01T04:52:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Chaojin\\",\\"url\\":\\"https://machaojin.cn\\",\\"email\\":\\"ma@machaojin.cn\\"}]}"]]},"headers":[{"level":2,"title":"幂等组件执行流程","slug":"幂等组件执行流程","link":"#幂等组件执行流程","children":[{"level":3,"title":"第一步：获取方法上的幂等注解","slug":"第一步-获取方法上的幂等注解","link":"#第一步-获取方法上的幂等注解","children":[]},{"level":3,"title":"第二步：对添加有注解的方法进行环绕增强","slug":"第二步-对添加有注解的方法进行环绕增强","link":"#第二步-对添加有注解的方法进行环绕增强","children":[]},{"level":3,"title":"第三步：执行增强逻辑","slug":"第三步-执行增强逻辑","link":"#第三步-执行增强逻辑","children":[]}]}],"git":{"createdTime":1693543553000,"updatedTime":1693543931000,"contributors":[{"name":"machaojin","email":"1917939763@qq.com","commits":2}]},"readingTime":{"minutes":8.69,"words":2607},"filePathRelative":"blog/项目/12306/幂等组件执行逻辑.md","localizedDate":"2023年9月1日","autoDesc":true}');export{e as data};
