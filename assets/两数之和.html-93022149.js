import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as l,c as s,d as e,e as n,a as r,b as d}from"./app-aa103f3b.js";const o={},c={href:"https://leetcode.cn/problems/two-sum/description/",target:"_blank",rel:"noopener noreferrer"},u=d(`<h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><blockquote><p>将数组存起来，边存边进行匹配知道匹配结束</p></blockquote><h2 id="解题方法" tabindex="-1"><a class="header-anchor" href="#解题方法" aria-hidden="true">#</a> 解题方法</h2><blockquote><p>哈希表</p></blockquote><h2 id="复杂度" tabindex="-1"><a class="header-anchor" href="#复杂度" aria-hidden="true">#</a> 复杂度</h2><ul><li>时间复杂度:</li></ul><blockquote><p>添加时间复杂度, 示例： $O(n)$</p></blockquote><ul><li>空间复杂度:</li></ul><blockquote><p>添加空间复杂度, 示例： $O(n)$</p></blockquote><h2 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> Code</h2><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>
class Solution {
    public int[] twoSum(int[] nums, int target) {
        //两数之和hash解法
        HashMap&lt;Integer,Integer&gt; set = new HashMap&lt;&gt;();
        for(int i = 0;i &lt; nums.length;i++){
            if(set.containsKey(target - nums[i])){
                return new int[]{i,set.get(target - nums[i])};
            }
            set.put(nums[i],i);
        }
        return new int[]{0,0};
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function v(h,m){const i=t("ExternalLinkIcon");return l(),s("div",null,[e("blockquote",null,[e("p",null,[n("Problem: "),e("a",c,[n("1. 两数之和"),r(i)])])]),u])}const _=a(o,[["render",v],["__file","两数之和.html.vue"]]);export{_ as default};
