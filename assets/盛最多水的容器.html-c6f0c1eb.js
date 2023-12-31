import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as t,c as r,d as e,e as i,a as d,b as s}from"./app-b6054360.js";const c={},h={href:"https://leetcode.cn/problems/container-with-most-water/description/",target:"_blank",rel:"noopener noreferrer"},o=s(`<p>[TOC]</p><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><p>当我们看到这个问题时，我们可能首先会想到暴力解法，即通过两层循环来计算每两个线之间的区域并找到最大值。但这种方法的时间复杂度是$O(n^2)$，并不是最优的。</p><p>观察问题，我们可以发现，容器的容量是由两块板和它们之间的距离共同决定的。而且，两块板中较短的那块决定了容器的高度。</p><p>基于上述观察，我们可以使用双指针方法来解决这个问题。</p><h2 id="解题方法" tabindex="-1"><a class="header-anchor" href="#解题方法" aria-hidden="true">#</a> 解题方法</h2><ol><li>初始化两个指针，一个在开始（left），一个在结束（right）。</li><li>初始化一个变量来存储最大的区域。</li><li>使用一个循环，当<code>left</code>小于<code>right</code>时，计算当前区域并与最大区域进行比较。</li><li>移动较短的那块板的指针（因为移动较长的板不会增加容器的容量，而移动较短的板可能会）。</li><li>重复上述步骤，直到<code>left</code>不再小于<code>right</code>。</li></ol><h2 id="复杂度" tabindex="-1"><a class="header-anchor" href="#复杂度" aria-hidden="true">#</a> 复杂度</h2><ul><li><p>时间复杂度: $O(n)$，因为我们只遍历数组一次。</p></li><li><p>空间复杂度: $O(1)$，我们只使用了常数级别的额外空间。</p></li></ul><h2 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> Code</h2><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int max = 0;
        int min = 0;
        while(left &lt; right){
            min = Math.min(height[left],height[right]);
            max = Math.max((right - left) * min,max);
            while(height[left] &lt;= min &amp;&amp; left &lt; right){
                left++;
            }
            while(height[right] &lt;= min &amp;&amp; left &lt; right){
                right--;
            }
        }
        return max;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种双指针方法大大减少了所需的计算量，使得我们能够在合理的时间内解决这个问题。</p>`,12);function m(v,u){const n=a("ExternalLinkIcon");return t(),r("div",null,[e("blockquote",null,[e("p",null,[i("Problem: "),e("a",h,[i("11. 盛最多水的容器"),d(n)])])]),o])}const _=l(c,[["render",m],["__file","盛最多水的容器.html.vue"]]);export{_ as default};
