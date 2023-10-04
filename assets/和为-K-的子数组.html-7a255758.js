import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as t,c as r,d as n,e,a as m,b as s}from"./app-f9249d3b.js";const c={},o={href:"https://leetcode.cn/problems/subarray-sum-equals-k/description/",target:"_blank",rel:"noopener noreferrer"},d=s('<h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><blockquote><p>前缀和思想，先计算出数组的前缀和，然后通过双指针算法，计算出所有的可能</p></blockquote><h2 id="解题方法" tabindex="-1"><a class="header-anchor" href="#解题方法" aria-hidden="true">#</a> 解题方法</h2><blockquote><p>前缀和和双指针</p></blockquote><h2 id="复杂度" tabindex="-1"><a class="header-anchor" href="#复杂度" aria-hidden="true">#</a> 复杂度</h2><ul><li>时间复杂度:</li></ul>',6),u=n("blockquote",null,[n("p",null,[e("添加时间复杂度, 示例： "),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"O"),n("mo",{stretchy:"false"},"("),n("mi",null,"n"),n("mi",null,"l"),n("mi",null,"o"),n("mi",null,"g"),n("mi",null,"n"),n("mo",{stretchy:"false"},")")]),n("annotation",{encoding:"application/x-tex"},"O(nlogn)")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),n("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),n("span",{class:"mopen"},"("),n("span",{class:"mord mathnormal"},"n"),n("span",{class:"mord mathnormal",style:{"margin-right":"0.01968em"}},"l"),n("span",{class:"mord mathnormal"},"o"),n("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"g"),n("span",{class:"mord mathnormal"},"n"),n("span",{class:"mclose"},")")])])])])],-1),h=n("ul",null,[n("li",null,"空间复杂度:")],-1),v=n("blockquote",null,[n("p",null,[e("添加空间复杂度, 示例： "),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"O"),n("mo",{stretchy:"false"},"("),n("mi",null,"n"),n("mo",{stretchy:"false"},")")]),n("annotation",{encoding:"application/x-tex"},"O(n)")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),n("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),n("span",{class:"mopen"},"("),n("span",{class:"mord mathnormal"},"n"),n("span",{class:"mclose"},")")])])])])],-1),p=s(`<h2 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> Code</h2><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>
class Solution {
    public int subarraySum(int[] nums, int k) {
        //前缀和思想
        int[] sum = new int[nums.length];
        sum[0] = nums[0];
        for(int i = 1;i &lt; nums.length;i++){
            sum[i] = sum[i - 1] + nums[i];
        }
        int count = 0;
        for(int i = 0;i &lt; nums.length;i++){
            if(sum[i] == k){
                count++;
            }
            for(int j = i + 1;j &lt; nums.length;j++){
                if(sum[j] - sum[i] == k){
                    count++;
                }
            }
        }
        return count;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function b(_,g){const a=i("ExternalLinkIcon");return t(),r("div",null,[n("blockquote",null,[n("p",null,[e("Problem: "),n("a",o,[e("560. 和为 K 的子数组"),m(a)])])]),d,u,h,v,p])}const k=l(c,[["render",b],["__file","和为-K-的子数组.html.vue"]]);export{k as default};
