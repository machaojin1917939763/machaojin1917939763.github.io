import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as t,c as r,d as n,e,a as d,b as s}from"./app-fe15e87e.js";const c={},m={href:"https://leetcode.cn/problems/longest-consecutive-sequence/description/",target:"_blank",rel:"noopener noreferrer"},o=s('<p>[TOC]</p><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><p>当我们看到这个问题时，我们可能首先会考虑排序数组，然后查找最长的连续子序列。但这需要O(nlogn)的时间复杂度。为了优化它，我们可以使用哈希表来跟踪每个数字是否存在，这样我们可以在O(1)的时间内检查一个数字的邻居。</p><h2 id="解题方法" tabindex="-1"><a class="header-anchor" href="#解题方法" aria-hidden="true">#</a> 解题方法</h2><h3 id="哈希表" tabindex="-1"><a class="header-anchor" href="#哈希表" aria-hidden="true">#</a> 哈希表</h3><ol><li>首先，我们遍历整个数组，并将每个数字存储在哈希表中。</li><li>然后，我们再次遍历数组，对于每个数字，如果它是连续序列的开始（即它的前一个数字不在哈希表中），则尝试扩展这个序列，并更新最长连续序列的长度。</li><li>为了避免重复计算，我们可以使用另一个哈希表来跟踪已经计算过的数字。</li></ol><h2 id="复杂度" tabindex="-1"><a class="header-anchor" href="#复杂度" aria-hidden="true">#</a> 复杂度</h2>',7),u=n("ul",null,[n("li",null,[n("p",null,[e("时间复杂度: "),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"O"),n("mo",{stretchy:"false"},"("),n("mi",null,"n"),n("mo",{stretchy:"false"},")")]),n("annotation",{encoding:"application/x-tex"},"O(n)")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),n("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),n("span",{class:"mopen"},"("),n("span",{class:"mord mathnormal"},"n"),n("span",{class:"mclose"},")")])])])]),n("ul",null,[n("li",null,"我们只遍历数组两次，并且在哈希表中查找操作是O(1)的。")])]),n("li",null,[n("p",null,[e("空间复杂度: "),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"O"),n("mo",{stretchy:"false"},"("),n("mi",null,"n"),n("mo",{stretchy:"false"},")")]),n("annotation",{encoding:"application/x-tex"},"O(n)")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),n("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),n("span",{class:"mopen"},"("),n("span",{class:"mord mathnormal"},"n"),n("span",{class:"mclose"},")")])])])]),n("ul",null,[n("li",null,"我们使用了两个哈希表来存储数字。")])])],-1),h=s(`<h2 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> Code</h2><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>class Solution {
    public int longestConsecutive(int[] nums) {
        Set&lt;Integer&gt; set = new HashSet&lt;&gt;();
        for(int i =0; i &lt; nums.length; i++){
            set.add(nums[i]);
        }
        int res = 0;
        //用于保存已经计算过的数字
        Set&lt;Integer&gt; maxNum = new HashSet&lt;&gt;();
        for(int i = 0; i &lt; nums.length; i++){
            if(maxNum.contains(nums[i])){
                continue;
            }
            int count = 1; // 当前连续序列的长度
            int left = nums[i] - 1;
            int right = nums[i] + 1;
            while(set.contains(left)){
                count++;
                maxNum.add(left);
                left--;
            }
            while(set.contains(right)){
                count++;
                maxNum.add(right);
                right++;
            }
            res = Math.max(count, res);
        }
        return res;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法的关键在于，我们只尝试从连续序列的开始计算长度，这样可以确保每个连续序列只被计算一次。</p>`,3);function v(p,b){const a=i("ExternalLinkIcon");return t(),r("div",null,[n("blockquote",null,[n("p",null,[e("Problem: "),n("a",m,[e("128. 最长连续序列"),d(a)])])]),o,u,h])}const _=l(c,[["render",v],["__file","最长连续序列.html.vue"]]);export{_ as default};
