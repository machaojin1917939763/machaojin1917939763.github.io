import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,b as e}from"./app-8d8a6409.js";const p={},t=e(`<h2 id="幂等注解" tabindex="-1"><a class="header-anchor" href="#幂等注解" aria-hidden="true">#</a> 幂等注解：</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>opengoofy<span class="token punctuation">.</span>index12306<span class="token punctuation">.</span>framework<span class="token punctuation">.</span>starter<span class="token punctuation">.</span>idempotent<span class="token punctuation">.</span>annotation</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>opengoofy<span class="token punctuation">.</span>index12306<span class="token punctuation">.</span>framework<span class="token punctuation">.</span>starter<span class="token punctuation">.</span>idempotent<span class="token punctuation">.</span>enums<span class="token punctuation">.</span></span><span class="token class-name">IdempotentSceneEnum</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>opengoofy<span class="token punctuation">.</span>index12306<span class="token punctuation">.</span>framework<span class="token punctuation">.</span>starter<span class="token punctuation">.</span>idempotent<span class="token punctuation">.</span>enums<span class="token punctuation">.</span></span><span class="token class-name">IdempotentTypeEnum</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Documented</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ElementType</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Retention</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RetentionPolicy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Target</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="幂等执行器" tabindex="-1"><a class="header-anchor" href="#幂等执行器" aria-hidden="true">#</a> 幂等执行器：</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>opengoofy<span class="token punctuation">.</span>index12306<span class="token punctuation">.</span>framework<span class="token punctuation">.</span>starter<span class="token punctuation">.</span>idempotent<span class="token punctuation">.</span>core</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>aspectj<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ProceedingJoinPoint</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>opengoofy<span class="token punctuation">.</span>index12306<span class="token punctuation">.</span>framework<span class="token punctuation">.</span>starter<span class="token punctuation">.</span>idempotent<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Idempotent</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 幂等执行处理器
 *
 *
 * <span class="token keyword">@author</span> machaojin
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),c=[t];function o(l,i){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","12306项目解读.html.vue"]]);export{d as default};
