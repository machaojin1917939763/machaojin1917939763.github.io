import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,b as e}from"./app-568fd720.js";const t={},p=e(`<h2 id="幂等组件执行流程" tabindex="-1"><a class="header-anchor" href="#幂等组件执行流程" aria-hidden="true">#</a> 幂等组件执行流程</h2><h4 id="在项目中实现了一个幂等注解的类" tabindex="-1"><a class="header-anchor" href="#在项目中实现了一个幂等注解的类" aria-hidden="true">#</a> 在项目中实现了一个幂等注解的类</h4><p>该注解通过AOP的形式使用在需要增强的方法上面，然后通过Aspect动态代理拿到注解上面的值</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 幂等注解
 *
 *
 * <span class="token keyword">@author</span> machaojin
 */</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">,</span> <span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">METHOD</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Idempotent</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 幂等Key，只有在 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Idempotent</span><span class="token punctuation">#</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span> 为 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">#</span><span class="token field">SPEL</span></span><span class="token punctuation">}</span> 时生效
     */</span>
    <span class="token class-name">String</span> <span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 触发幂等失败逻辑时，返回的错误提示信息
     */</span>
    <span class="token class-name">String</span> <span class="token function">message</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;您操作太快，请稍后再试&quot;</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 验证幂等类型，支持多种幂等方式
     * RestAPI 建议使用 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">#</span><span class="token field">TOKEN</span></span><span class="token punctuation">}</span> 或 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">#</span><span class="token field">PARAM</span></span><span class="token punctuation">}</span>
     * 其它类型幂等验证，使用 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">#</span><span class="token field">SPEL</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token class-name">IdempotentTypeEnum</span> <span class="token function">type</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">.</span><span class="token constant">PARAM</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 验证幂等场景，支持多种 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentSceneEnum</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token class-name">IdempotentSceneEnum</span> <span class="token function">scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token class-name">IdempotentSceneEnum</span><span class="token punctuation">.</span><span class="token constant">RESTAPI</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 设置防重令牌 Key 前缀，MQ 幂等去重可选设置
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentSceneEnum</span><span class="token punctuation">#</span><span class="token field">MQ</span></span><span class="token punctuation">}</span> and <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">#</span><span class="token field">SPEL</span></span><span class="token punctuation">}</span> 时生效
     */</span>
    <span class="token class-name">String</span> <span class="token function">uniqueKeyPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 设置防重令牌 Key 过期时间，单位秒，默认 1 小时，MQ 幂等去重可选设置
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentSceneEnum</span><span class="token punctuation">#</span><span class="token field">MQ</span></span><span class="token punctuation">}</span> and <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">#</span><span class="token field">SPEL</span></span><span class="token punctuation">}</span> 时生效
     */</span>
    <span class="token keyword">long</span> <span class="token function">keyTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token number">3600L</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，不同的参数组合适用于不同的场景，比如：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code> /**
     * 幂等Key，只有在 {@link Idempotent#type()} 为 {@link IdempotentTypeEnum#SPEL} 时生效
     */
    String key() default &quot;&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>key</code>只有在幂等类型为spEl的时候才生效，通常使用的话代表着SpEl表达式</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
     * 设置防重令牌 Key 前缀，MQ 幂等去重可选设置
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentSceneEnum</span><span class="token punctuation">#</span><span class="token field">MQ</span></span><span class="token punctuation">}</span> and <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">#</span><span class="token field">SPEL</span></span><span class="token punctuation">}</span> 时生效
     */</span>
    <span class="token class-name">String</span> <span class="token function">uniqueKeyPrefix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>防重令牌是在redis存储中，用于存放<code>key</code>的前缀</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
     * 设置防重令牌 Key 过期时间，单位秒，默认 1 小时，MQ 幂等去重可选设置
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentSceneEnum</span><span class="token punctuation">#</span><span class="token field">MQ</span></span><span class="token punctuation">}</span> and <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">#</span><span class="token field">SPEL</span></span><span class="token punctuation">}</span> 时生效
     */</span>
    <span class="token keyword">long</span> <span class="token function">keyTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token number">3600L</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>keyTimeout</code>加锁的过期时间，防重令牌前缀和超时时间只有在使用场景为MQ的时候，并且幂等方式为spEl表达式的时候才会生效</p><h4 id="spel表达式使用场景-restapi" tabindex="-1"><a class="header-anchor" href="#spel表达式使用场景-restapi" aria-hidden="true">#</a> spEl表达式使用场景（RestAPI）</h4><p>这是一个新增乘车人的一个方法，需要实现接口幂等，使用的是spEl表达式来实现的注解, <code>uniqueKeyPrefix</code> 代表在redis中加锁的前缀，<strong>项目中的幂等是通过在redis中加锁进行实现的</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Idempotent</span><span class="token punctuation">(</span>
        uniqueKeyPrefix <span class="token operator">=</span> <span class="token string">&quot;index12306-user:lock_passenger-alter:&quot;</span><span class="token punctuation">,</span>
        key <span class="token operator">=</span> <span class="token string">&quot;T(org.opengoofy.index12306.frameworks.starter.user.core.UserContext).getUsername()&quot;</span><span class="token punctuation">,</span>
        type <span class="token operator">=</span> <span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">.</span><span class="token constant">SPEL</span><span class="token punctuation">,</span>
        scene <span class="token operator">=</span> <span class="token class-name">IdempotentSceneEnum</span><span class="token punctuation">.</span><span class="token constant">RESTAPI</span><span class="token punctuation">,</span>
        message <span class="token operator">=</span> <span class="token string">&quot;正在新增乘车人，请稍后再试...&quot;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>uniqueKeyPrefix</code>：对redis进行加锁的时候，指定的锁前缀</p><p><code>key</code>：spEl表达式</p><p><code>type</code>：指定的使用场景，说明是基于什么类型的幂等实现，在进行AOP动态代理的时候会根据这个拿到对应的处理器进行增强</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//根据注解的参数从简单工厂中获取到处理指定的handler，分别是restAPI、MQ，其次是幂等方式，支持方法参数，token，和spEl表达式</span>
<span class="token class-name">IdempotentExecuteHandler</span> instance <span class="token operator">=</span> <span class="token class-name">IdempotentExecuteHandlerFactory</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>idempotent<span class="token punctuation">.</span><span class="token function">scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> idempotent<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scene</code>：指定的使用方式，说明是基于什么类型的幂等实现，在进行AOP动态代理的时候会根据这个拿到对应的处理器进行增强</p><p><code>message</code>：重复请求提示的消息</p><h4 id="spel表达式使用场景-mq" tabindex="-1"><a class="header-anchor" href="#spel表达式使用场景-mq" aria-hidden="true">#</a> spEl表达式使用场景（MQ）</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Idempotent</span><span class="token punctuation">(</span>
        uniqueKeyPrefix <span class="token operator">=</span> <span class="token string">&quot;index12306-ticket:pay_result_callback:&quot;</span><span class="token punctuation">,</span>
        key <span class="token operator">=</span> <span class="token string">&quot;#message.getKeys()+&#39;_&#39;+#message.hashCode()&quot;</span><span class="token punctuation">,</span>
        type <span class="token operator">=</span> <span class="token class-name">IdempotentTypeEnum</span><span class="token punctuation">.</span><span class="token constant">SPEL</span><span class="token punctuation">,</span>
        scene <span class="token operator">=</span> <span class="token class-name">IdempotentSceneEnum</span><span class="token punctuation">.</span><span class="token constant">MQ</span><span class="token punctuation">,</span>
        keyTimeout <span class="token operator">=</span> <span class="token number">7200L</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>暂时项目中仅使用了Spel表达式的场景，基于方法参数和token形式的有待发现</p><h3 id="第一步-获取方法上的幂等注解" tabindex="-1"><a class="header-anchor" href="#第一步-获取方法上的幂等注解" aria-hidden="true">#</a> 第一步：获取方法上的幂等注解</h3><p>通常使用AOP动态代理的话，需要有对应的Aspect类来进行增强</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 幂等注解 AOP 拦截器
 *
 *
 * <span class="token keyword">@author</span> machaojin
 */</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">IdempotentAspect</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 增强方法标记 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Idempotent</span></span><span class="token punctuation">}</span> 注解逻辑
     */</span>
    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;@annotation(org.opengoofy.index12306.framework.starter.idempotent.annotation.Idempotent)&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">idempotentHandler</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token comment">//获取幂等注解类</span>
        <span class="token class-name">Idempotent</span> idempotent <span class="token operator">=</span> <span class="token function">getIdempotent</span><span class="token punctuation">(</span>joinPoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//根据注解的参数从简单工厂中获取到处理指定的handler，分别是restAPI、MQ，其次是幂等方式，支持方法参数，token，和spEl表达式</span>
        <span class="token class-name">IdempotentExecuteHandler</span> instance <span class="token operator">=</span> <span class="token class-name">IdempotentExecuteHandlerFactory</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>idempotent<span class="token punctuation">.</span><span class="token function">scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> idempotent<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> resultObj<span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            instance<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>joinPoint<span class="token punctuation">,</span> idempotent<span class="token punctuation">)</span><span class="token punctuation">;</span>
            resultObj <span class="token operator">=</span> joinPoint<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            instance<span class="token punctuation">.</span><span class="token function">postProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">RepeatConsumptionException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             * 触发幂等逻辑时可能有两种情况：
             *    * 1. 消息还在处理，但是不确定是否执行成功，那么需要返回错误，方便 RocketMQ 再次通过重试队列投递
             *    * 2. 消息处理成功了，该消息直接返回成功即可
             */</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ex<span class="token punctuation">.</span><span class="token function">getError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 客户端消费存在异常，需要删除幂等标识方便下次 RocketMQ 再次通过重试队列投递</span>
            instance<span class="token punctuation">.</span><span class="token function">exceptionProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token class-name">IdempotentContext</span><span class="token punctuation">.</span><span class="token function">clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> resultObj<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Idempotent</span> <span class="token function">getIdempotent</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchMethodException</span> <span class="token punctuation">{</span>
        <span class="token class-name">MethodSignature</span> methodSignature <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodSignature</span><span class="token punctuation">)</span> joinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Method</span> targetMethod <span class="token operator">=</span> joinPoint<span class="token punctuation">.</span><span class="token function">getTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredMethod</span><span class="token punctuation">(</span>methodSignature<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> methodSignature<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getParameterTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> targetMethod<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">Idempotent</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code> @Around(&quot;@annotation(org.opengoofy.index12306.framework.starter.idempotent.annotation.Idempotent)&quot;)</code>代表环绕增强，AOP的增强方式一共有以下几种：</p><ol><li><strong>Before Advice (<code>before()</code>)</strong>: 在某个连接点（join point）之前执行的代码。例如，你可能想在执行某个方法之前打印日志。</li><li><strong>After Returning Advice (<code>after() returning</code>)</strong>: 在连接点成功完成之后执行的代码。例如，在方法成功返回后记录日志。</li><li><strong>After Throwing Advice (<code>after() throwing</code>)</strong>: 在连接点抛出异常后执行的代码。这通常用于处理异常或记录异常信息。</li><li><strong>After Advice (<code>after()</code>)</strong>: 不管连接点是否成功完成，都会执行的代码。这相当于结合了 After Returning 和 After Throwing。</li><li><strong>Around Advice (<code>around()</code>)</strong>: 这是最强大的增强类型，它允许你在连接点之前和之后执行代码，甚至可以完全替换原始的连接点。使用 Around Advice 时，你需要手动调用 <code>proceed()</code> 方法来执行原始的连接点。</li></ol><p>除了上述的增强方式，AspectJ 还提供了其他功能，如：</p><ul><li><strong>Pointcuts</strong>: 定义在哪些连接点应用增强的表达式。</li><li><strong>Introduction (Inter-type declaration)</strong>: 允许你为现有的类或接口添加新的方法或字段。</li><li><strong>Static Crosscutting</strong>: 对于类和对象的静态结构（如方法签名、字段、类型等）的横切关注点。</li></ul><h3 id="第二步-对添加有注解的方法进行环绕增强" tabindex="-1"><a class="header-anchor" href="#第二步-对添加有注解的方法进行环绕增强" aria-hidden="true">#</a> 第二步：对添加有注解的方法进行环绕增强</h3><p>1、首先获取到注解</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//获取幂等注解类</span>
<span class="token class-name">Idempotent</span> idempotent <span class="token operator">=</span> <span class="token function">getIdempotent</span><span class="token punctuation">(</span>joinPoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2、根据注解的参数，获取到对应的执行器，项目里面封装了多个执行器，使用简单工厂的模式获取</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token operator">*</span><span class="token operator">/</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">IdempotentExecuteHandlerFactory</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 获取幂等执行处理器
     *
     * <span class="token keyword">@param</span> <span class="token parameter">scene</span> 指定幂等验证场景类型
     * <span class="token keyword">@param</span> <span class="token parameter">type</span>  指定幂等处理类型
     * <span class="token keyword">@return</span> 幂等执行处理器
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">IdempotentExecuteHandler</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">IdempotentSceneEnum</span> scene<span class="token punctuation">,</span> <span class="token class-name">IdempotentTypeEnum</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">IdempotentExecuteHandler</span> result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>scene<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token constant">RESTAPI</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">case</span> <span class="token constant">PARAM</span> <span class="token operator">-&gt;</span> result <span class="token operator">=</span> <span class="token class-name">ApplicationContextHolder</span><span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">IdempotentParamService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">case</span> <span class="token constant">TOKEN</span> <span class="token operator">-&gt;</span> result <span class="token operator">=</span> <span class="token class-name">ApplicationContextHolder</span><span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">IdempotentTokenService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">case</span> <span class="token constant">SPEL</span> <span class="token operator">-&gt;</span> result <span class="token operator">=</span> <span class="token class-name">ApplicationContextHolder</span><span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">IdempotentSpELByRestAPIExecuteHandler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">case</span> <span class="token constant">MQ</span> <span class="token operator">-&gt;</span> result <span class="token operator">=</span> <span class="token class-name">ApplicationContextHolder</span><span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">IdempotentSpELByMQExecuteHandler</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于MQ只有一个处理器<code>IdempotentSpELByMQExecuteHandler</code></p><p>方法有三个处理器，分别对应token、方法参数、SPEl表达式</p><h3 id="第三步-执行增强逻辑" tabindex="-1"><a class="header-anchor" href="#第三步-执行增强逻辑" aria-hidden="true">#</a> 第三步：执行增强逻辑</h3><p>增强逻辑，也就是往redis中进行加锁，每个处理器都是一样的，宗旨都是通过加锁实现，只是实现的思路不一样</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code> instance.execute(joinPoint, idempotent);
 resultObj = joinPoint.proceed();
 instance.postProcessing();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来看一下方法注释</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
     * 执行幂等处理逻辑
     *
     * @param joinPoint  AOP 方法处理
     * @param idempotent 幂等注解
     */
    void execute(ProceedingJoinPoint joinPoint, Idempotent idempotent);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 后置处理
 */
default void postProcessing() {

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大概明白了执行流程，首先是执行幂等处理逻辑，然后<code>joinPoint.proceed();</code>执行方法，再然后执行后置处理器</p><p>幂等处理逻辑是什么呢？</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 抽象幂等执行处理器
 *
 *
 * @author machaojin
 */
public abstract class AbstractIdempotentExecuteHandler implements IdempotentExecuteHandler {

    /**
     * 构建幂等验证过程中所需要的参数包装器
     *
     * @param joinPoint AOP 方法处理
     * @return 幂等参数包装器
     */
    protected abstract IdempotentParamWrapper buildWrapper(ProceedingJoinPoint joinPoint);

    /**
     * 执行幂等处理逻辑
     *
     * @param joinPoint  AOP 方法处理
     * @param idempotent 幂等注解
     */
    public void execute(ProceedingJoinPoint joinPoint, Idempotent idempotent) {
        // 模板方法模式：构建幂等参数包装器
        IdempotentParamWrapper idempotentParamWrapper = buildWrapper(joinPoint).setIdempotent(idempotent);
        handler(idempotentParamWrapper);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>execute</code>是一个模板方法，作用是将传递进来的<code>joinPoint</code>和<code>idempotent</code>的里面的东西拿出来再封装成一个对象</p><p>这就是包装类</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 幂等参数包装
 *
 * 
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public final class IdempotentParamWrapper {

    /**
     * 幂等注解
     */
    private Idempotent idempotent;

    /**
     * AOP 处理连接点
     */
    private ProceedingJoinPoint joinPoint;

    /**
     * 锁标识，{@link IdempotentTypeEnum#PARAM}
     */
    private String lockKey;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三个参数分别是幂等注解、AOP 处理连接点、lockKey</p><p><strong>然后再交由handler进行处理</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 幂等执行处理器
 *
 *
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IdempotentExecuteHandler</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 幂等处理逻辑
     *
     * <span class="token keyword">@param</span> <span class="token parameter">wrapper</span> 幂等参数包装器
     */</span>
    <span class="token keyword">void</span> <span class="token function">handler</span><span class="token punctuation">(</span><span class="token class-name">IdempotentParamWrapper</span> wrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 执行幂等处理逻辑
     *
     * <span class="token keyword">@param</span> <span class="token parameter">joinPoint</span>  AOP 方法处理
     * <span class="token keyword">@param</span> <span class="token parameter">idempotent</span> 幂等注解
     */</span>
    <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">,</span> <span class="token class-name">Idempotent</span> idempotent<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 异常流程处理
     */</span>
    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">exceptionProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 后置处理
     */</span>
    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">postProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>handler</code>是幂等执行处理器中的一个方法，所有的处理器都是实现了这个接口，然后重写自己的处理逻辑</p><p>下面具体看一下handler的视线逻辑</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@Override
public void handler(IdempotentParamWrapper wrapper) {
    String uniqueKey = wrapper.getIdempotent().uniqueKeyPrefix() + wrapper.getLockKey();
    RLock lock = redissonClient.getLock(uniqueKey);
    if (!lock.tryLock()) {
        throw new ClientException(wrapper.getIdempotent().message());
    }
    IdempotentContext.put(LOCK, lock);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进来先把需要再redis 中加锁的锁名称从刚才传进来的幂等参数包装类中拿出来</p><p>然后通过redissonClient加分布式锁，这里加锁失败就会抛异常，也就是默认的message，比如 “正在新增乘车人，请稍后再试...”</p><p>加锁成功就会将往<code>IdempotentContext</code>中添加一个Lock和锁对象，<code>private final static String LOCK = &quot;lock:spEL:restAPI&quot;;</code>表示加锁的方式，是在handler中写死的，<strong>现在整个<code>execute</code>执行完了</strong></p><p>开始执行具体的方法逻辑，</p><p>最后执行一个后置处理器<code>postProcessing</code>，看一下后置处理器的处理逻辑</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postProcessing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">RLock</span> lock <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        lock <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">RLock</span><span class="token punctuation">)</span> <span class="token class-name">IdempotentContext</span><span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token constant">LOCK</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lock <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出这是一个解锁的逻辑，从<code>IdempotentContext</code>中获得刚才加的锁，然后执行解锁操作</p><p>那<code>IdempotentContext</code>是什么呢？</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 幂等上下文
 *
 *
 */
public final class IdempotentContext {
    
    private static final ThreadLocal&lt;Map&lt;String, Object&gt;&gt; CONTEXT = new ThreadLocal&lt;&gt;();
    
    public static Map&lt;String, Object&gt; get() {
        return CONTEXT.get();
    }
    
    public static Object getKey(String key) {
        Map&lt;String, Object&gt; context = get();
        if (CollUtil.isNotEmpty(context)) {
            return context.get(key);
        }
        return null;
    }
    
    public static String getString(String key) {
        Object actual = getKey(key);
        if (actual != null) {
            return actual.toString();
        }
        return null;
    }
    
    public static void put(String key, Object val) {
        Map&lt;String, Object&gt; context = get();
        if (CollUtil.isEmpty(context)) {
            context = Maps.newHashMap();
        }
        context.put(key, val);
        putContext(context);
    }
    
    public static void putContext(Map&lt;String, Object&gt; context) {
        Map&lt;String, Object&gt; threadContext = CONTEXT.get();
        if (CollUtil.isNotEmpty(threadContext)) {
            threadContext.putAll(context);
            return;
        }
        CONTEXT.set(context);
    }
    
    public static void clean() {
        CONTEXT.remove();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是一个基于ThreadLocal的幂等上下文对象，用于传递lock的</p><p>这就是整个幂等注解的执行逻辑，以下是类的关系</p><figure><img src="https://local-imge.oss-cn-beijing.aliyuncs.com/images/image-20230901124428699.png" alt="image-20230901124428699" tabindex="0" loading="lazy"><figcaption>image-20230901124428699</figcaption></figure>`,67),i=[p];function c(o,l){return s(),a("div",null,i)}const r=n(t,[["render",c],["__file","幂等组件执行逻辑.html.vue"]]);export{r as default};
