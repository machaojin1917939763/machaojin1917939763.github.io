import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,a as e}from"./app-98e9989b.js";const t={},p=e(`<h1 id="安装elasticsearch" tabindex="-1"><a class="header-anchor" href="#安装elasticsearch" aria-hidden="true">#</a> 安装elasticsearch</h1><h1 id="_1-部署单点es" tabindex="-1"><a class="header-anchor" href="#_1-部署单点es" aria-hidden="true">#</a> 1.部署单点es</h1><h2 id="_1-1-创建网络" tabindex="-1"><a class="header-anchor" href="#_1-1-创建网络" aria-hidden="true">#</a> 1.1.创建网络</h2><p>因为我们还需要部署kibana容器，因此需要让es和kibana容器互联。这里先创建一个网络：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> network create es-net
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_1-2-加载镜像" tabindex="-1"><a class="header-anchor" href="#_1-2-加载镜像" aria-hidden="true">#</a> 1.2.加载镜像</h2><p>这里我们采用elasticsearch的7.12.1版本的镜像，这个镜像体积非常大，接近1G。不建议大家自己pull。</p><p>课前资料提供了镜像的tar包：</p><p><img src="https://jackchen-note.oss-cn-beijing.aliyuncs.com/elasticsearchimage-20210510165308064.png" alt="image-20210510165308064"></p><p>大家将其上传到虚拟机中，然后运行命令加载即可：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 导入数据</span>
<span class="token function">docker</span> load <span class="token parameter variable">-i</span> es.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同理还有<code>kibana</code>的tar包也需要这样做。</p><h2 id="_1-3-运行" tabindex="-1"><a class="header-anchor" href="#_1-3-运行" aria-hidden="true">#</a> 1.3.运行</h2><p>运行docker命令，部署单点es：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
	<span class="token parameter variable">--name</span> es <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token string">&quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-e</span> <span class="token string">&quot;discovery.type=single-node&quot;</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> es-data:/usr/share/elasticsearch/data <span class="token punctuation">\\</span>
    <span class="token parameter variable">-v</span> es-plugins:/usr/share/elasticsearch/plugins <span class="token punctuation">\\</span>
    <span class="token parameter variable">--privileged</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">--network</span> es-net <span class="token punctuation">\\</span>
    <span class="token parameter variable">-p</span> <span class="token number">9200</span>:9200 <span class="token punctuation">\\</span>
    <span class="token parameter variable">-p</span> <span class="token number">9300</span>:9300 <span class="token punctuation">\\</span>
elasticsearch:7.12.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令解释：</p><ul><li><code>-e &quot;cluster.name=es-docker-cluster&quot;</code>：设置集群名称</li><li><code>-e &quot;http.host=0.0.0.0&quot;</code>：监听的地址，可以外网访问</li><li><code>-e &quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</code>：内存大小</li><li><code>-e &quot;discovery.type=single-node&quot;</code>：非集群模式</li><li><code>-v es-data:/usr/share/elasticsearch/data</code>：挂载逻辑卷，绑定es的数据目录</li><li><code>-v es-logs:/usr/share/elasticsearch/logs</code>：挂载逻辑卷，绑定es的日志目录</li><li><code>-v es-plugins:/usr/share/elasticsearch/plugins</code>：挂载逻辑卷，绑定es的插件目录</li><li><code>--privileged</code>：授予逻辑卷访问权</li><li><code>--network es-net</code> ：加入一个名为es-net的网络中</li><li><code>-p 9200:9200</code>：端口映射配置</li></ul><p>在浏览器中输入：http://192.168.150.101:9200 即可看到elasticsearch的响应结果：</p><p><img src="https://jackchen-note.oss-cn-beijing.aliyuncs.com/elasticsearchimage-20210506101053676.png" alt="image-20210506101053676"></p><h1 id="_2-部署kibana" tabindex="-1"><a class="header-anchor" href="#_2-部署kibana" aria-hidden="true">#</a> 2.部署kibana</h1><p>kibana可以给我们提供一个elasticsearch的可视化界面，便于我们学习。</p><h2 id="_2-1-部署" tabindex="-1"><a class="header-anchor" href="#_2-1-部署" aria-hidden="true">#</a> 2.1.部署</h2><p>运行docker命令，部署kibana</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> kibana <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">ELASTICSEARCH_HOSTS</span><span class="token operator">=</span>http://es:9200 <span class="token punctuation">\\</span>
<span class="token parameter variable">--network</span><span class="token operator">=</span>es-net <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">5601</span>:5601  <span class="token punctuation">\\</span>
kibana:7.12.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>--network es-net</code> ：加入一个名为es-net的网络中，与elasticsearch在同一个网络中</li><li><code>-e ELASTICSEARCH_HOSTS=http://es:9200&quot;</code>：设置elasticsearch的地址，因为kibana已经与elasticsearch在一个网络，因此可以用容器名直接访问elasticsearch</li><li><code>-p 5601:5601</code>：端口映射配置</li></ul><p>kibana启动一般比较慢，需要多等待一会，可以通过命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> logs <span class="token parameter variable">-f</span> kibana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看运行日志，当查看到下面的日志，说明成功：</p><p><img src="https://jackchen-note.oss-cn-beijing.aliyuncs.com/elasticsearchimage-20210109105135812.png" alt="image-20210109105135812"></p><p>此时，在浏览器输入地址访问：http://192.168.150.101:5601，即可看到结果</p><h2 id="_2-2-devtools" tabindex="-1"><a class="header-anchor" href="#_2-2-devtools" aria-hidden="true">#</a> 2.2.DevTools</h2><p>kibana中提供了一个DevTools界面：</p><p><img src="https://jackchen-note.oss-cn-beijing.aliyuncs.com/elasticsearchimage-20210506102630393.png" alt="image-20210506102630393"></p><p>这个界面中可以编写DSL来操作elasticsearch。并且对DSL语句有自动补全功能。</p><h1 id="_3-安装ik分词器" tabindex="-1"><a class="header-anchor" href="#_3-安装ik分词器" aria-hidden="true">#</a> 3.安装IK分词器</h1><h2 id="_3-1-在线安装ik插件-较慢" tabindex="-1"><a class="header-anchor" href="#_3-1-在线安装ik插件-较慢" aria-hidden="true">#</a> 3.1.在线安装ik插件（较慢）</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入容器内部</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> elasticsearch /bin/bash

<span class="token comment"># 在线下载并安装</span>
./bin/elasticsearch-plugin  <span class="token function">install</span> https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.12.1/elasticsearch-analysis-ik-7.12.1.zip

<span class="token comment">#退出</span>
<span class="token builtin class-name">exit</span>
<span class="token comment">#重启容器</span>
<span class="token function">docker</span> restart elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-2-离线安装ik插件-推荐" tabindex="-1"><a class="header-anchor" href="#_3-2-离线安装ik插件-推荐" aria-hidden="true">#</a> 3.2.离线安装ik插件（推荐）</h2><h3 id="_1-查看数据卷目录" tabindex="-1"><a class="header-anchor" href="#_1-查看数据卷目录" aria-hidden="true">#</a> 1）查看数据卷目录</h3><p>安装插件需要知道elasticsearch的plugins目录位置，而我们用了数据卷挂载，因此需要查看elasticsearch的数据卷目录，通过下面命令查看:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> volume inspect es-plugins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显示结果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">&quot;CreatedAt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2022-05-06T10:06:34+08:00&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Driver&quot;</span><span class="token operator">:</span> <span class="token string">&quot;local&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Labels&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Mountpoint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/var/lib/docker/volumes/es-plugins/_data&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;es-plugins&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Options&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token property">&quot;Scope&quot;</span><span class="token operator">:</span> <span class="token string">&quot;local&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明plugins目录被挂载到了：<code>/var/lib/docker/volumes/es-plugins/_data </code>这个目录中。</p><h3 id="_2-解压缩分词器安装包" tabindex="-1"><a class="header-anchor" href="#_2-解压缩分词器安装包" aria-hidden="true">#</a> 2）解压缩分词器安装包</h3><p>下面我们需要把课前资料中的ik分词器解压缩，重命名为ik</p><p><img src="https://jackchen-note.oss-cn-beijing.aliyuncs.com/elasticsearchimage-20210506110249144.png" alt="image-20210506110249144"></p><h3 id="_3-上传到es容器的插件数据卷中" tabindex="-1"><a class="header-anchor" href="#_3-上传到es容器的插件数据卷中" aria-hidden="true">#</a> 3）上传到es容器的插件数据卷中</h3><p>也就是<code>/var/lib/docker/volumes/es-plugins/_data </code>：</p><p><img src="https://jackchen-note.oss-cn-beijing.aliyuncs.com/elasticsearchimage-20210506110704293.png" alt="image-20210506110704293"></p><h3 id="_4-重启容器" tabindex="-1"><a class="header-anchor" href="#_4-重启容器" aria-hidden="true">#</a> 4）重启容器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 4、重启容器</span>
<span class="token function">docker</span> restart es
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看es日志</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> es
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试" aria-hidden="true">#</a> 5）测试：</h3><p>IK分词器包含两种模式：</p><ul><li><p><code>ik_smart</code>：最少切分</p></li><li><p><code>ik_max_word</code>：最细切分</p></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_max_word&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;黑马程序员学习java太棒了&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;tokens&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;黑马&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;程序员&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;程序&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;员&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_CHAR&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">3</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;学习&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">4</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;java&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;ENGLISH&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">5</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;太棒了&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">6</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;太棒&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_WORD&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">7</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;token&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;了&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;start_offset&quot;</span> <span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
      <span class="token property">&quot;end_offset&quot;</span> <span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;CN_CHAR&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;position&quot;</span> <span class="token operator">:</span> <span class="token number">8</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-3-扩展词词典" tabindex="-1"><a class="header-anchor" href="#_3-3-扩展词词典" aria-hidden="true">#</a> 3.3 扩展词词典</h2><p>随着互联网的发展，“造词运动”也越发的频繁。出现了很多新的词语，在原有的词汇列表中并不存在。比如：“奥力给”，“传智播客” 等。</p><p>所以我们的词汇也需要不断的更新，IK分词器提供了扩展词汇的功能。</p><p>1）打开IK分词器config目录：</p><p><img src="https://jackchen-note.oss-cn-beijing.aliyuncs.com/elasticsearchimage-20210506112225508.png" alt="image-20210506112225508"></p><p>2）在IKAnalyzer.cfg.xml配置文件内容添加：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">properties</span> <span class="token name">SYSTEM</span> <span class="token string">&quot;http://java.sun.com/dtd/properties.dtd&quot;</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>comment</span><span class="token punctuation">&gt;</span></span>IK Analyzer 扩展配置<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>comment</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!--用户可以在这里配置自己的扩展字典 *** 添加扩展词典--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>entry</span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ext_dict<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>ext.dic<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>entry</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）新建一个 ext.dic，可以参考config目录下复制一个配置文件进行修改</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code>传智播客
奥力给
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>4）重启elasticsearch</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> restart es

<span class="token comment"># 查看 日志</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://jackchen-note.oss-cn-beijing.aliyuncs.com/elasticsearchimage-20201115230900504.png" alt="image-20201115230900504"></p><p>日志中已经成功加载ext.dic配置文件</p><p>5）测试效果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_max_word&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;传智播客Java就业超过90%,奥力给！&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑</p></blockquote><h2 id="_3-4-停用词词典" tabindex="-1"><a class="header-anchor" href="#_3-4-停用词词典" aria-hidden="true">#</a> 3.4 停用词词典</h2><p>在互联网项目中，在网络间传输的速度很快，所以很多语言是不允许在网络上传递的，如：关于宗教、政治等敏感词语，那么我们在搜索时也应该忽略当前词汇。</p><p>IK分词器也提供了强大的停用词功能，让我们在索引时就直接忽略当前的停用词汇表中的内容。</p><p>1）IKAnalyzer.cfg.xml配置文件内容添加：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">properties</span> <span class="token name">SYSTEM</span> <span class="token string">&quot;http://java.sun.com/dtd/properties.dtd&quot;</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>comment</span><span class="token punctuation">&gt;</span></span>IK Analyzer 扩展配置<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>comment</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!--用户可以在这里配置自己的扩展字典--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>entry</span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ext_dict<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>ext.dic<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>entry</span><span class="token punctuation">&gt;</span></span>
         <span class="token comment">&lt;!--用户可以在这里配置自己的扩展停止词字典  *** 添加停用词词典--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>entry</span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ext_stopwords<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>stopword.dic<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>entry</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）在 stopword.dic 添加停用词</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code>习大大
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4）重启elasticsearch</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重启服务</span>
<span class="token function">docker</span> restart elasticsearch
<span class="token function">docker</span> restart kibana

<span class="token comment"># 查看 日志</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日志中已经成功加载stopword.dic配置文件</p><p>5）测试效果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_max_word&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;传智播客Java就业率超过95%,习大大都点赞,奥力给！&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑</p></blockquote><h1 id="_4-部署es集群" tabindex="-1"><a class="header-anchor" href="#_4-部署es集群" aria-hidden="true">#</a> 4.部署es集群</h1><p>部署es集群可以直接使用docker-compose来完成，不过要求你的Linux虚拟机至少有<strong>4G</strong>的内存空间</p><p>首先编写一个docker-compose文件，内容如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&#39;2.2&#39;</span>
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    container_name: es01
    environment:
      - <span class="token assign-left variable">node.name</span><span class="token operator">=</span>es01
      - <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>es-docker-cluster
      - <span class="token assign-left variable">discovery.seed_hosts</span><span class="token operator">=</span>es02,es03
      - <span class="token assign-left variable">cluster.initial_master_nodes</span><span class="token operator">=</span>es01,es02,es03
      - <span class="token assign-left variable">bootstrap.memory_lock</span><span class="token operator">=</span>true
      - <span class="token string">&quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</span>
    ulimits:
      memlock:
        soft: <span class="token parameter variable">-1</span>
        hard: <span class="token parameter variable">-1</span>
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - <span class="token number">9200</span>:9200
    networks:
      - elastic
  es02:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    container_name: es02
    environment:
      - <span class="token assign-left variable">node.name</span><span class="token operator">=</span>es02
      - <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>es-docker-cluster
      - <span class="token assign-left variable">discovery.seed_hosts</span><span class="token operator">=</span>es01,es03
      - <span class="token assign-left variable">cluster.initial_master_nodes</span><span class="token operator">=</span>es01,es02,es03
      - <span class="token assign-left variable">bootstrap.memory_lock</span><span class="token operator">=</span>true
      - <span class="token string">&quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</span>
    ulimits:
      memlock:
        soft: <span class="token parameter variable">-1</span>
        hard: <span class="token parameter variable">-1</span>
    volumes:
      - data02:/usr/share/elasticsearch/data
    networks:
      - elastic
  es03:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    container_name: es03
    environment:
      - <span class="token assign-left variable">node.name</span><span class="token operator">=</span>es03
      - <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>es-docker-cluster
      - <span class="token assign-left variable">discovery.seed_hosts</span><span class="token operator">=</span>es01,es02
      - <span class="token assign-left variable">cluster.initial_master_nodes</span><span class="token operator">=</span>es01,es02,es03
      - <span class="token assign-left variable">bootstrap.memory_lock</span><span class="token operator">=</span>true
      - <span class="token string">&quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</span>
    ulimits:
      memlock:
        soft: <span class="token parameter variable">-1</span>
        hard: <span class="token parameter variable">-1</span>
    volumes:
      - data03:/usr/share/elasticsearch/data
    networks:
      - elastic

volumes:
  data01:
    driver: <span class="token builtin class-name">local</span>
  data02:
    driver: <span class="token builtin class-name">local</span>
  data03:
    driver: <span class="token builtin class-name">local</span>

networks:
  elastic:
    driver: bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run <code>docker-compose</code> to bring up the cluster:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,94),i=[p];function o(l,c){return n(),a("div",null,i)}const d=s(t,[["render",o],["__file","安装elasticsearch.html.vue"]]);export{d as default};
