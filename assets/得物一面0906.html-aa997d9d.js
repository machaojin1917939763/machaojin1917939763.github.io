import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,b as d}from"./app-9d2aacf5.js";const r={},o=d(`<h2 id="类加载机制" tabindex="-1"><a class="header-anchor" href="#类加载机制" aria-hidden="true">#</a> 类加载机制</h2><p>类加载机制默认的是双亲委派机制，JDK提供的类加载器一共有三个</p><p>BootstrapClassLoader：启动类加载器，主要加载rt.jar resourse.jar等核心类</p><p>ExtentionClassLoader：拓展类加载器，主要加载/lib/ext目录下的bao</p><p>AppClassLoader：应用加载器，加载项目根目录下的类</p><p>双亲委派加载：当一个类需要加载的时候，会自底向上进行查寻，然后加载的时候会自顶向下进行加载，通过类的class文件中的getClassLoader方法可以看到类的加载器，如果是null，就是根加载器，因为根加载器是c++写的，所以是null</p><p>还可以自定义加载器，自定义加载器需要继承ClassLoader抽象类，并且只需要重写findClass就可以了，如果需要打破双亲委派机制，还需要重写loadClass</p><p><code>ClassLoader</code> 类使用委托模型来搜索类和资源。</p><p>双亲委派模型要求除了顶层的启动类加载器外，其余的类加载器都应有自己的父类加载器。</p><p><code>ClassLoader</code> 实例会在试图亲自查找类或资源之前，将搜索类或资源的任务委托给其父类加载器。</p><h3 id="知道如何打破双亲委派机制吗" tabindex="-1"><a class="header-anchor" href="#知道如何打破双亲委派机制吗" aria-hidden="true">#</a> 知道如何打破双亲委派机制吗</h3><p>自定义加载器的话，需要继承 <code>ClassLoader</code> 。如果我们不想打破双亲委派模型，就重写 <code>ClassLoader</code> 类中的 <code>findClass()</code> 方法即可，无法被父类加载器加载的类最终会通过这个方法被加载。但是，如果想打破双亲委派模型则需要重写 <code>loadClass()</code> 方法。</p><p>为什么是重写 <code>loadClass()</code> 方法打破双亲委派模型呢？双亲委派模型的执行流程已经解释了：</p><blockquote><p>类加载器在进行类加载的时候，它首先不会自己去尝试加载这个类，而是把这个请求委派给父类加载器去完成（调用父加载器 <code>loadClass()</code>方法来加载类）。</p></blockquote><p>重写 <code>loadClass()</code>方法之后，我们就可以改变传统双亲委派模型的执行流程。例如，子类加载器可以在委派给父类加载器之前，先自己尝试加载这个类，或者在父类加载器返回之后，再尝试从其他地方加载这个类。具体的规则由我们自己实现，根据项目需求定制化。</p><h3 id="aqs" tabindex="-1"><a class="header-anchor" href="#aqs" aria-hidden="true">#</a> AQS</h3><p>AQS全称是AbstractQueuedSynchronizier，是一个模板方法类，是常见的锁类的底层，使用CLH锁和LookSupport锁来实现加锁和解锁，CLH是自旋锁的优化，底层维护了一个state状态，是volatile修饰的变量，然后维护了一个双向的链表，当第一个线程进来通过CAS将state状态修改为1，后续再有线程进来的时候，会去尝试修改state的状态，如果修改失败，就会将线程包装成一个node节点，然后封装三个状态，将线程加入到双向链表中，并且通知上一个节点，将上一个节点的single状态修改为1，表示上一个线程释放锁的时候会尝试去唤醒这个这个线程，通过LockSupport的park和unpark来对线程进行唤醒和休眠</p><h3 id="垃圾回收器-g1" tabindex="-1"><a class="header-anchor" href="#垃圾回收器-g1" aria-hidden="true">#</a> 垃圾回收器 G1</h3><p>G1 把堆划分成多个大小相等的独立区域(Region)，新生代和老年代不再物理隔离。</p><p><strong>通过引入 Region 的概念，从而将原来的一整块内存空间划分成多个的小空间，使得每个小空间可以单独进行垃圾回收</strong>。这种划分方法带来了很大的灵活性，使得可预测的停顿时间模型成为可能。通过记录每个 Region 垃圾回收时间以及回收所获得的空间(这两个值是通过过去回收的经验获得)，并维护一个优先列表，每次根据允许的收集时间，优先回收价值最大的 Region。</p><figure><img src="https://local-imge.oss-cn-beijing.aliyuncs.com/images/image-20230906110702273.png" alt="image-20230906110702273" tabindex="0" loading="lazy"><figcaption>image-20230906110702273</figcaption></figure><p>每个 Region 都有一个 Remembered Set，用来记录该 Region 对象的引用对象所在的 Region。通过使用 Remembered Set，在做可达性分析的时候就可以避免全堆扫描。</p><figure><img src="https://local-imge.oss-cn-beijing.aliyuncs.com/images/image-20230906110606521.png" alt="image-20230906110606521" tabindex="0" loading="lazy"><figcaption>image-20230906110606521</figcaption></figure><p>如果不计算维护 Remembered Set 的操作，G1 收集器的运作大致可划分为以下几个步骤:</p><ul><li>初始标记</li><li>并发标记</li><li>最终标记: 为了修正在并发标记期间因用户程序继续运作而导致标记产生变动的那一部分标记记录，虚拟机将这段时间对象变化记录在线程的 Remembered Set Logs 里面，最终标记阶段需要把 Remembered Set Logs 的数据合并到 Remembered Set 中。这阶段需要停顿线程，但是可并行执行。</li><li>筛选回收: 首先对各个 Region 中的回收价值和成本进行排序，根据用户所期望的 GC 停顿时间来制定回收计划。此阶段其实也可以做到与用户程序一起并发执行，但是因为只回收一部分 Region，时间是用户可控制的，而且停顿用户线程将大幅度提高收集效率。</li></ul><p>具备如下特点:</p><ul><li>空间整合: 整体来看是基于“标记 - 整理”算法实现的收集器，从局部(两个 Region 之间)上来看是基于“复制”算法实现的，这意味着运行期间不会产生内存空间碎片。</li><li>可预测的停顿: 能让使用者明确指定在一个长度为 M 毫秒的时间片段内，消耗在 GC 上的时间不得超过 N 毫秒</li></ul><h3 id="垃圾回收算法" tabindex="-1"><a class="header-anchor" href="#垃圾回收算法" aria-hidden="true">#</a> 垃圾回收算法</h3><h3 id="老年代的空间担保机制" tabindex="-1"><a class="header-anchor" href="#老年代的空间担保机制" aria-hidden="true">#</a> 老年代的空间担保机制</h3><p>在发生 Minor GC 之前，虚拟机先检查老年代最大可用的连续空间是否大于新生代所有对象总空间，如果条件成立的话，那么 Minor GC 可以确认是安全的。</p><p>如果不成立的话虚拟机会查看 HandlePromotionFailure 设置值是否允许担保失败，如果允许那么就会继续检查老年代最大可用的连续空间是否大于历次晋升到老年代对象的平均大小，如果大于，将尝试着进行一次 Minor GC；如果小于，或者HandlePromotionFailure 设置不允许冒险，那么就要进行一次 Full GC</p><h3 id="mysql-最左前缀" tabindex="-1"><a class="header-anchor" href="#mysql-最左前缀" aria-hidden="true">#</a> mysql 最左前缀</h3><h3 id="spring-依赖注入" tabindex="-1"><a class="header-anchor" href="#spring-依赖注入" aria-hidden="true">#</a> spring 依赖注入</h3><h3 id="设计模式有用过吗" tabindex="-1"><a class="header-anchor" href="#设计模式有用过吗" aria-hidden="true">#</a> 设计模式有用过吗</h3><h3 id="spring-bean-的创建是采用了什么模式" tabindex="-1"><a class="header-anchor" href="#spring-bean-的创建是采用了什么模式" aria-hidden="true">#</a> spring bean 的创建是采用了什么模式</h3><h3 id="动态代理怎么实现的" tabindex="-1"><a class="header-anchor" href="#动态代理怎么实现的" aria-hidden="true">#</a> 动态代理怎么实现的</h3><h3 id="springcloud-的原理-—-录音下来也没听清" tabindex="-1"><a class="header-anchor" href="#springcloud-的原理-—-录音下来也没听清" aria-hidden="true">#</a> SpringCloud 的原理（？）—&gt;录音下来也没听清</h3><h3 id="java-的-hashmap" tabindex="-1"><a class="header-anchor" href="#java-的-hashmap" aria-hidden="true">#</a> Java 的 hashmap</h3><h3 id="spring-容器初始化的流程" tabindex="-1"><a class="header-anchor" href="#spring-容器初始化的流程" aria-hidden="true">#</a> spring 容器初始化的流程</h3><h3 id="负载均衡策略" tabindex="-1"><a class="header-anchor" href="#负载均衡策略" aria-hidden="true">#</a> 负载均衡策略</h3><h3 id="mvcc" tabindex="-1"><a class="header-anchor" href="#mvcc" aria-hidden="true">#</a> MVCC</h3><h3 id="redis-的应用" tabindex="-1"><a class="header-anchor" href="#redis-的应用" aria-hidden="true">#</a> redis 的应用</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BigDecimal zero = BigDecimal.ZERO.setScale(2);
List&lt;OrderItemDto&gt; newOrderItemDtos = orderItemDtos.stream()
              .peek((orderItemDto -&gt; {
                  BigDecimal payMoney;
                  if (orderItemDto.getGoodsPayPrice() != null &amp;&amp; orderItemDto.getGoodsPrice() != null){
                      payMoney = orderItemDto.getGoodsPayPrice();
                  } else{
                      payMoney = orderItemDto.getGoodsPrice();
                  }
                  //0元订单和赠品订单只能退一次，退货退款
                  if((orderItemDto.getGoodsPrice() != null &amp;&amp; orderItemDto.getGoodsPrice().compareTo(zero) == 0)
                          || (orderItemDto.getGoodsPayPrice() != null &amp;&amp; orderItemDto.getGoodsPayPrice().compareTo(zero) == 0)){
                      orderItemDto.setGoodsRefundPrice(zero);
                      orderItemDto.setBlockRefundMethod(blockRefundMethodMap.get(orderItemDto.getGoodsId()) == null ? 2 : 3);
                  }else {
                      orderItemDto.setGoodsRefundPrice(payMoney.subtract(refundMoney.get(orderItemDto.getGoodsId()) == null ? zero : refundMoney.get(orderItemDto.getGoodsId())));
                      orderItemDto.setBlockRefundMethod(orderItemDto.getGoodsRefundPrice().compareTo(zero) == 0 ? 3 : );
                  }
              })).collect(Collectors.toList());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>blockRefundMethodMap.getOrDefault(orderItemDto.getGoodsId(), 0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,44),n=[o];function s(t,l){return a(),i("div",null,n)}const m=e(r,[["render",s],["__file","得物一面0906.html.vue"]]);export{m as default};
