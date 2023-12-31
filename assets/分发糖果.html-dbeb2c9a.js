import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as s,c as r,d as n,e as i,a as d,b as t}from"./app-b6054360.js";const v={},c={href:"https://leetcode.cn/problems/candy/description/",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>[TOC]</p><h1 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h1><blockquote><p>模拟题，从前往后遍历，两个两个的对比，如果发现后面的比前面的大，正常加一，如果发现前面的比后面的大，那就要从当前点往后遍历，将刚刚前面比后面大的并且糖果相同的，将前面的糖果加一，知道不满足此条件为止</p></blockquote><h1 id="解题方法" tabindex="-1"><a class="header-anchor" href="#解题方法" aria-hidden="true">#</a> 解题方法</h1><blockquote><p>按照题目所给意思进行模拟</p></blockquote><h1 id="复杂度" tabindex="-1"><a class="header-anchor" href="#复杂度" aria-hidden="true">#</a> 复杂度</h1><ul><li>时间复杂度:</li></ul><blockquote><p>添加时间复杂度, 示例： $O(n * n)$</p></blockquote><ul><li>空间复杂度:</li></ul><blockquote><p>添加空间复杂度, 示例： $O(n)$</p></blockquote><h1 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> Code</h1><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>
class Solution {
    public int candy(int[] ratings) {
            if(ratings.length == 0 || ratings.length == 1){
            return 1;
        }
        int[] map = new int[ratings.length];
        for(int i = 1;i &lt; ratings.length;i++){
            if(ratings[i - 1] &gt; ratings[i]){
                if(map[i - 1] &gt; map[i]){
                    continue;
                }
                map[i - 1] = map[i] + 1;
                //如果出现前面大于后面的情况，就直接开始扫描前面的，将前面的再走一次
                int j = i - 1;
                while(j &gt; 0){
                    if(ratings[j - 1] &gt; ratings[j] &amp;&amp; map[j - 1] == map[j]){
                        map[j - 1] = map[j] + 1;
                        j--;
                    }else{
                        break;
                    }
                }
            }else if(ratings[i - 1] &lt; ratings[i]){
                if(map[i - 1] &lt; map[i]){
                    continue;
                }
                map[i] = map[i - 1] + 1;
            }
        }
        
        if(ratings.length % 2 != 0){
            if(ratings[ratings.length - 1] &gt; ratings[ratings.length - 2]){
                if(map[ratings.length - 1] &lt; map[ratings.length - 2]){
                    map[ratings.length - 1] = map[ratings.length - 2] + 1;
                }
            }else if(ratings[ratings.length - 1] &lt; ratings[ratings.length - 2]){
                if(map[ratings.length - 1] &gt; map[ratings.length - 2]){
                    map[ratings.length - 2] = map[ratings.length - 1] + 1;
                }
            }
        }
        //System.out.println(Arrays.toString(map));
        int res = 0;
        for(int i = 0;i &lt; map.length;i++){
            res += map[i];
        }
        res += ratings.length;
        return res;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12);function u(b,o){const e=l("ExternalLinkIcon");return s(),r("div",null,[n("blockquote",null,[n("p",null,[i("Problem: "),n("a",c,[i("135. 分发糖果"),d(e)])])]),m])}const p=a(v,[["render",u],["__file","分发糖果.html.vue"]]);export{p as default};
