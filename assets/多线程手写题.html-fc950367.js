import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,b as i}from"./app-f9249d3b.js";const e={},l=i(`<h2 id="多线程手写题" tabindex="-1"><a class="header-anchor" href="#多线程手写题" aria-hidden="true">#</a> 多线程手写题</h2><p>多线程手写题：按序打印是一种常见的面试题，它考察了候选人对于多线程编程的基本知识和技能，如线程的创建、启动、同步、通信等。这类题目通常有以下几种变形：</p><ul><li>三个线程分别打印 A，B，C，要求这三个线程一起运行，打印 n 次，输出形如“ABCABCABC…”的字符串。</li></ul><div class="language-JAVA line-numbers-mode" data-ext="JAVA"><pre class="language-JAVA"><code>public class PrintABC {

    // 定义一个共享变量，用于控制打印顺序
    private static int state = 0;

    public static void main(String[] args) {
        // 创建三个线程对象
        Thread threadA = new Thread(new Runnable() {
            @Override
            public void run() {
                // 循环打印 10 次
                for (int i = 0; i &lt; 10; i++) {
                    // 同步锁
                    synchronized (PrintABC.class) {
                        // 判断是否轮到自己打印
                        while (state % 3 != 0) {
                            try {
                                // 不是自己打印则等待
                                PrintABC.class.wait();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        // 打印 A
                        System.out.print(&quot;A&quot;);
                        // 改变状态值
                        state++;
                        // 唤醒其他等待的线程
                        PrintABC.class.notifyAll();
                    }
                }
            }
        });

        Thread threadB = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i &lt; 10; i++) {
                    synchronized (PrintABC.class) {
                        while (state % 3 != 1) {
                            try {
                                PrintABC.class.wait();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        System.out.print(&quot;B&quot;);
                        state++;
                        PrintABC.class.notifyAll();
                    }
                }
            }
        });

        Thread threadC = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i &lt; 10; i++) {
                    synchronized (PrintABC.class) {
                        while (state % 3 != 2) {
                            try {
                                PrintABC.class.wait();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        System.out.print(&quot;C&quot;);
                        state++;
                        PrintABC.class.notifyAll();
                    }
                }
            }
        });

        // 启动三个线程
        threadA.start();
        threadB.start();
        threadC.start();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>两个线程交替打印 0~100 的奇偶数。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">Condition</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">Lock</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">ReentrantLock</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrintOddEven</span> <span class="token punctuation">{</span>

    <span class="token comment">// 定义一个锁对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 定义两个条件变量，分别表示奇数和偶数的条件</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Condition</span> oddCondition <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Condition</span> evenCondition <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 定义一个共享变量，用于打印数字</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 创建两个线程对象</span>
        <span class="token class-name">Thread</span> oddThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>num <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 打印范围为 0~100</span>
                    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 获取锁</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 判断是否为奇数</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;打印奇数：&quot;</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 打印奇数</span>
                            num<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">// 数字加一</span>
                            evenCondition<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 唤醒打印偶数的线程</span>
                        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                                oddCondition<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 等待打印奇数的条件</span>
                            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 释放锁</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;线程A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span> evenThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>num <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 判断是否为偶数</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;打印偶数：&quot;</span> <span class="token operator">+</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 打印偶数</span>
                            num<span class="token operator">++</span><span class="token punctuation">;</span>
                            oddCondition<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 唤醒打印奇数的线程</span>
                        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                                evenCondition<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 等待打印偶数的条件</span>
                            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;线程B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 启动两个线程</span>
        oddThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        evenThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通过 N 个线程顺序循环打印从 0 至 100。</li></ul><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>import java.util.concurrent.Semaphore;

public class PrintNumber {

    // 定义 N 个线程
    private static final int N = 3;

    // 定义 N 个信号量，分别表示每个线程的执行权限
    private static Semaphore[] semaphores = new Semaphore[N];

    // 定义一个共享变量，用于打印数字
    private static int num = 0;

    public static void main(String[] args) {

        // 初始化信号量，只有第一个信号量的许可为 1，其他的为 0，表示只有第一个线程可以执行
        for (int i = 0; i &lt; N; i++) {
            if (i == 0) {
                semaphores[i] = new Semaphore(1);
            } else {
                semaphores[i] = new Semaphore(0);
            }
        }

        // 创建并启动 N 个线程
        for (int i = 0; i &lt; N; i++) {
            new Thread(new Worker(i)).start();
        }
    }

    // 定义一个工作线程类，实现 Runnable 接口
    static class Worker implements Runnable {

        // 记录当前线程的索引
        private int index;

        public Worker(int index) {
            this.index = index;
        }

        @Override
        public void run() {
            while (true) { // 循环打印数字
                try {
                    semaphores[index].acquire(); // 获取当前线程的执行权限
                    System.out.println(&quot;线程&quot; + index + &quot;打印数字：&quot; + num++); // 打印数字并自增
                    if (num &gt; 100) { // 如果数字超过了100，则退出循环
                        System.exit(0);
                    }
                    semaphores[(index + 1) % N].release(); // 释放下一个线程的执行权限
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>多线程按顺序调用，A-&gt;B-&gt;C，AA 打印 5 次，BB 打印10 次，CC 打印 15 次，重复 10 次。</li></ul><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class PrintABC {

    // 定义一个锁对象
    private static Lock lock = new ReentrantLock();

    // 定义三个条件变量，分别表示 A、B、C 的打印条件
    private static Condition conditionA = lock.newCondition();
    private static Condition conditionB = lock.newCondition();
    private static Condition conditionC = lock.newCondition();

    // 定义一个共享变量，用于控制打印顺序
    private static int state = 0;

    public static void main(String[] args) {

        // 创建三个线程对象
        Thread threadA = new Thread(new Runnable() {
            @Override
            public void run() {
                lock.lock(); // 获取锁
                try {
                    for (int i = 0; i &lt; 10; i++) { // 循环打印 10 次
                        while (state % 3 != 0) { // 判断是否轮到自己打印
                            try {
                                conditionA.await(); // 等待 A 的打印条件
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        for (int j = 0; j &lt; 5; j++) { // 打印 AA 5 次
                            System.out.print(&quot;AA&quot;);
                        }
                        System.out.println();
                        state++; // 改变状态值
                        conditionB.signal(); // 唤醒 B 的打印条件
                    }
                } finally {
                    lock.unlock(); // 释放锁
                }
            }
        });

        Thread threadB = new Thread(new Runnable() {
            @Override
            public void run() {
                lock.lock();
                try {
                    for (int i = 0; i &lt; 10; i++) {
                        while (state % 3 != 1) {
                            try {
                                conditionB.await();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        for (int j = 0; j &lt; 10; j++) { // 打印 BB 10 次
                            System.out.print(&quot;BB&quot;);
                        }
                        System.out.println();
                        state++;
                        conditionC.signal(); // 唤醒 C 的打印条件
                    }
                } finally {
                    lock.unlock();
                }
            }
        });

        Thread threadC = new Thread(new Runnable() {
            @Override
            public void run() {
                lock.lock();
                try {
                    for (int i = 0; i &lt; 10; i++) {
                        while (state % 3 != 2) {
                            try {
                                conditionC.await();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        for (int j = 0; j &lt; 15; j++) { // 打印 CC 15 次
                            System.out.print(&quot;CC&quot;);
                        }
                        System.out.println();
                        state++;
                        conditionA.signal(); // 唤醒 A 的打印条件
                    }
                } finally {
                    lock.unlock();
                }
            }
        });

        // 启动三个线程
        threadA.start();
        threadB.start();
        threadC.start();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>用两个线程，一个输出字母，一个输出数字，交替输出 1A2B3C4D…26Z。</li></ul><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>import java.util.concurrent.Semaphore;

public class PrintNumberLetter {

    // 定义两个信号量，分别表示数字和字母的打印权限
    private static Semaphore numSemaphore = new Semaphore(1);
    private static Semaphore letterSemaphore = new Semaphore(0);

    // 定义一个共享变量，用于打印数字
    private static int num = 1;

    // 定义一个共享变量，用于打印字母
    private static char letter = &#39;A&#39;;

    public static void main(String[] args) {

        // 创建两个线程对象
        Thread numThread = new Thread(new Runnable() {
            @Override
            public void run() {
                while (num &lt;= 26) { // 打印范围为 1~26
                    try {
                        numSemaphore.acquire(); // 获取数字的打印权限
                        System.out.print(num); // 打印数字
                        num++; // 数字加一
                        letterSemaphore.release(); // 释放字母的打印权限
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });

        Thread letterThread = new Thread(new Runnable() {
            @Override
            public void run() {
                while (letter &lt;= &#39;Z&#39;) { // 打印范围为 A~Z
                    try {
                        letterSemaphore.acquire(); // 获取字母的打印权限
                        System.out.print(letter); // 打印字母
                        letter++; // 字母加一
                        numSemaphore.release(); // 释放数字的打印权限
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });

        // 启动两个线程
        numThread.start();
        letterThread.start();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这类题目的解决思路主要有以下几种：</p><ul><li><p>使用 synchronized 关键字和 wait/notify 方法实现线程间的同步和通信，通过一个共享变量来控制线程的执行顺序。使用 Lock 接口和 Condition 类实现线程间的同步和通信，通过一个或多个条件变量来控制线程的执行顺序。</p></li><li><p>使用 Semaphore 类实现线程间的同步和通信，通过一个或多个信号量来控制线程的执行顺序。</p></li><li><p>使用 CyclicBarrier 类实现线程间的同步和通信，通过一个屏障点来控制线程的执行顺序。</p></li><li><p>使用 CountDownLatch 类实现线程间的同步和通信，通过一个倒计数器来控制线程的执行顺序。</p></li></ul>`,14),t=[l];function c(d,p){return s(),a("div",null,t)}const v=n(e,[["render",c],["__file","多线程手写题.html.vue"]]);export{v as default};
