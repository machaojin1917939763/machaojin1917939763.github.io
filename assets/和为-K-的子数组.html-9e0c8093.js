import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as a,c as d,d as e,e as n,b as r,a as c}from"./app-cf338557.js";const t={},u={href:"https://leetcode.cn/problems/subarray-sum-equals-k/description/",target:"_blank",rel:"noopener noreferrer"},o=c(`<h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><blockquote><p>前缀和思想，先计算出数组的前缀和，然后通过双指针算法，计算出所有的可能</p></blockquote><h2 id="解题方法" tabindex="-1"><a class="header-anchor" href="#解题方法" aria-hidden="true">#</a> 解题方法</h2><blockquote><p>前缀和和双指针</p></blockquote><h2 id="复杂度" tabindex="-1"><a class="header-anchor" href="#复杂度" aria-hidden="true">#</a> 复杂度</h2><ul><li>时间复杂度:</li></ul><blockquote><p>添加时间复杂度, 示例： $O(nlogn)$</p></blockquote><ul><li>空间复杂度:</li></ul><blockquote><p>添加空间复杂度, 示例： $O(n)$</p></blockquote><h2 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> Code</h2><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function v(m,b){const i=s("ExternalLinkIcon");return a(),d("div",null,[e("blockquote",null,[e("p",null,[n("Problem: "),e("a",u,[n("560. 和为 K 的子数组"),r(i)])])]),o])}const p=l(t,[["render",v],["__file","和为-K-的子数组.html.vue"]]);export{p as default};
