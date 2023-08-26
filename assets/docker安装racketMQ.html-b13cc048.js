import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,b as s}from"./app-6e0de965.js";const r={},o=s(`<h2 id="docker安装racketmq" tabindex="-1"><a class="header-anchor" href="#docker安装racketmq" aria-hidden="true">#</a> docker安装racketMQ</h2><p>安装 RocketMQ 使用 Docker 是一个很好的选择，因为它简化了部署和管理过程。以下是使用 Docker 安装 RocketMQ 的步骤：</p><ol><li><p><strong>确保 Docker 已安装</strong>: 在开始前，确保你已经安装了 Docker。如果没有，你可以从 Docker 官方网站下载并安装。</p></li><li><p><strong>拉取 RocketMQ 镜像</strong>: RocketMQ 提供了官方 Docker 镜像，你可以通过以下命令拉取：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull rocketmqinc/rocketmq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>启动 NameServer</strong>: NameServer 是 RocketMQ 的命名服务，用于管理 Broker。使用以下命令启动 NameServer：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -d -p 9876:9876 --name rmqnamesrv rocketmqinc/rocketmq namesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>启动 Broker</strong>: Broker 是存储和转发消息的服务器。使用以下命令启动 Broker：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -d -p 10911:10911 -p 10909:10909 --name rmqbroker --link rmqnamesrv:namesrv -e &quot;NAMESRV_ADDR=namesrv:9876&quot; rocketmqinc/rocketmq sh mqbroker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>验证 RocketMQ 安装</strong>: 你可以登录到 Broker 容器内部，使用 RocketMQ 提供的工具验证安装是否成功：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker exec -it rmqbroker /bin/sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>以上步骤会启动一个简单的 RocketMQ 服务。在生产环境中，你可能需要配置更多的细节，例如数据存储、集群配置等。</p><p>如果你想使用 RocketMQ 的控制台进行管理和监控，你还需要另外安装 RocketMQ 控制台的 Docker 镜像。</p><h2 id="如果发生错误" tabindex="-1"><a class="header-anchor" href="#如果发生错误" aria-hidden="true">#</a> 如果发生错误</h2><h3 id="c-users-machaojin-docker-run-d-p-9876-9876-name-rmqnamesrv-rocketmqinc-rocketmq-namesrv-dd1d3646292f4e331a49a40adfe84e2b2301b7d62a95b10ae15d5d19c94157ab-docker-error-response-from-daemon-failed-to-create-task-for-container-failed-to-create-shim-task-oci-runtime-create-failed-runc-create-failed-unable-to-start-container-process-exec-namesrv-executable-file-not-found-in-path-unknown" tabindex="-1"><a class="header-anchor" href="#c-users-machaojin-docker-run-d-p-9876-9876-name-rmqnamesrv-rocketmqinc-rocketmq-namesrv-dd1d3646292f4e331a49a40adfe84e2b2301b7d62a95b10ae15d5d19c94157ab-docker-error-response-from-daemon-failed-to-create-task-for-container-failed-to-create-shim-task-oci-runtime-create-failed-runc-create-failed-unable-to-start-container-process-exec-namesrv-executable-file-not-found-in-path-unknown" aria-hidden="true">#</a> C:\\Users\\machaojin&gt;docker run -d -p 9876:9876 --name rmqnamesrv rocketmqinc/rocketmq namesrv dd1d3646292f4e331a49a40adfe84e2b2301b7d62a95b10ae15d5d19c94157ab docker: Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: &quot;namesrv&quot;: executable file not found in $PATH: unknown.</h3><p>出现这个问题是因为 RocketMQ 的 Docker 镜像结构和启动命令可能已经发生了更改，导致 <code>namesrv</code> 命令无法直接在容器中运行。</p><p>为了解决这个问题，我建议以下几个步骤：</p><ol><li><p><strong>进入 RocketMQ 的 Docker 容器</strong>，查看可用的启动命令和目录结构：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> rocketmqinc/rocketmq /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在容器内，你可以使用 <code>ls</code> 和 <code>cd</code> 命令来浏览目录，找到正确的 <code>namesrv</code> 可执行文件位置。</p></li><li><p><strong>检查 RocketMQ Docker 镜像的文档或 GitHub 仓库</strong>。开发者可能已经更新了启动容器的指南或命令，你可以根据最新的指南进行操作。</p></li><li><p><strong>使用正确的路径来启动 NameServer</strong>。如果你在第一步中找到了 <code>namesrv</code> 的正确路径，例如 <code>/path/to/namesrv</code>，那么启动 NameServer 的命令可能会类似于：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">9876</span>:9876 <span class="token parameter variable">--name</span> rmqnamesrv rocketmqinc/rocketmq /path/to/namesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>如果你没有在容器中找到任何有关 <code>namesrv</code> 的信息，你可能需要考虑使用其他版本的 RocketMQ Docker 镜像或检查是否有其他更新的启动指南。</p></li></ol><h3 id="error-response-from-daemon-cannot-restart-container-90efd13e594d-cannot-link-to-a-non-running-container-rmqnamesrv-as-rmqbroker-namesrv" tabindex="-1"><a class="header-anchor" href="#error-response-from-daemon-cannot-restart-container-90efd13e594d-cannot-link-to-a-non-running-container-rmqnamesrv-as-rmqbroker-namesrv" aria-hidden="true">#</a> Error response from daemon: Cannot restart container 90efd13e594d: Cannot link to a non running container: /rmqnamesrv AS /rmqbroker/namesrv</h3><p>此错误表示你试图运行一个容器（在这种情况下是<code>rmqbroker</code>）并将其链接到另一个尚未运行的容器（<code>rmqnamesrv</code>）。你之前尝试启动的<code>rmqnamesrv</code>容器似乎并没有正确启动或已停止。</p><p>请按照以下步骤操作：</p><ol><li><p><strong>检查 rmqnamesrv 的状态</strong>:<br> 使用以下命令来查看所有的 Docker 容器和它们的状态：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果 <code>rmqnamesrv</code> 容器的状态不是 <code>Up</code>（运行中），那么它可能未正确启动或已经停止。</p></li><li><p><strong>重新启动 rmqnamesrv</strong>:<br> 如果 <code>rmqnamesrv</code> 容器已停止，你可以尝试使用以下命令重新启动它：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> start rmqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>检查日志</strong>:<br> 如果 <code>rmqnamesrv</code> 容器无法启动，查看其日志可能会提供一些线索：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> logs rmqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据日志输出，你可能能够诊断问题并找到解决方案。</p></li><li><p><strong>重新启动 rmqbroker</strong>:<br> 一旦你确信 <code>rmqnamesrv</code> 容器正在运行，你可以尝试再次启动 <code>rmqbroker</code> 容器。</p></li></ol><h2 id="安装一个可视化控制台" tabindex="-1"><a class="header-anchor" href="#安装一个可视化控制台" aria-hidden="true">#</a> 安装一个可视化控制台</h2><p>为了获得更好的管理和监控体验，你可能想要使用RocketMQ Console，这是一个基于web的可视化工具/控制台，用于查看和管理RocketMQ集群。</p><p>以下是使用Docker安装RocketMQ Console的步骤：</p><ol><li><p><strong>拉取RocketMQ Console镜像</strong>:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull styletang/rocketmq-console-ng
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>运行RocketMQ Console容器</strong>:<br> 请确保<code>rmqnamesrv</code>容器正在运行并且可以从你运行Console的机器上访问。然后运行Console容器：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token parameter variable">-e</span> <span class="token string">&quot;JAVA_OPTS=-Drocketmq.namesrv.addr=YOUR_NAME_SERVER_IP:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false&quot;</span> <span class="token parameter variable">--name</span> rmqconsole styletang/rocketmq-console-ng
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，<code>YOUR_NAME_SERVER_IP</code>应替换为运行<code>rmqnamesrv</code>的机器的IP地址。</p></li><li><p><strong>访问RocketMQ Console</strong>:<br> 打开浏览器并访问 <code>http://YOUR_HOST_IP:8080</code>，其中<code>YOUR_HOST_IP</code>是运行RocketMQ Console容器的机器的IP地址。</p></li></ol><p>这样你就可以看到RocketMQ的各种详细信息，包括生产者、消费者、主题、队列等。</p><h2 id="我的所有的东西都安装在一台docker上面-我的ip应该写什么" tabindex="-1"><a class="header-anchor" href="#我的所有的东西都安装在一台docker上面-我的ip应该写什么" aria-hidden="true">#</a> 我的所有的东西都安装在一台docker上面，我的ip应该写什么？</h2><p>如果RocketMQ和RocketMQ Console都运行在同一台机器的Docker上，你可以使用Docker的内部网络功能来沟通。</p><p>在这种情况下，你应该使用Docker容器名称作为主机名。当在Docker内部网络中，容器可以使用其他容器的名称作为DNS来解析。因此，如果你的RocketMQ nameserver容器名为<code>rmqnamesrv</code>，你应该使用这个名称作为IP。</p><p>所以，运行RocketMQ Console容器的命令应该是：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token parameter variable">-e</span> <span class="token string">&quot;JAVA_OPTS=-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false&quot;</span> <span class="token parameter variable">--name</span> rmqconsole styletang/rocketmq-console-ng
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只需确保<code>rmqnamesrv</code>容器在运行RocketMQ Console容器之前已经运行。</p><p>然后，你可以通过浏览器访问 <code>http://localhost:8080</code> 或 <code>http://YOUR_HOST_MACHINE_IP:8080</code> 来访问RocketMQ Console。</p><p>希望这能帮助你！如果还有其他问题，请告诉我。</p><h3 id="docker-error-response-from-daemon-ports-are-not-available-exposing-port-tcp-0-0-0-0-8080-0-0-0-0-0-listen-tcp-0-0-0-0-8080-bind-only-one-usage-of-each-socket-address-protocol-network-address-port-is-normally-permitted" tabindex="-1"><a class="header-anchor" href="#docker-error-response-from-daemon-ports-are-not-available-exposing-port-tcp-0-0-0-0-8080-0-0-0-0-0-listen-tcp-0-0-0-0-8080-bind-only-one-usage-of-each-socket-address-protocol-network-address-port-is-normally-permitted" aria-hidden="true">#</a> docker: Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:8080 -&gt; 0.0.0.0:0: listen tcp 0.0.0.0:8080: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.</h3><p>此错误表明端口<code>8080</code>已经被你的机器上的其他服务或容器占用。为了避免冲突，你可以选择使用一个不同的端口来映射到RocketMQ Console的<code>8080</code>端口。</p><p>例如，你可以选择<code>8181</code>（或其他未被使用的端口）作为主机的端口：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8181</span>:8080 <span class="token parameter variable">-e</span> <span class="token string">&quot;JAVA_OPTS=-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false&quot;</span> <span class="token parameter variable">--name</span> rmqconsole styletang/rocketmq-console-ng
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，你可以通过浏览器访问 <code>http://localhost:8181</code> 或 <code>http://YOUR_HOST_MACHINE_IP:8181</code> 来访问RocketMQ Console。</p><p>如果你不确定哪个端口是空闲的，你可以使用工具如<code>netstat</code>（在大多数操作系统上都可用）来查看当前正在使用的端口：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-tuln</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果上述命令返回结果，这意味着<code>8080</code>端口已经被使用。你可以更改查询的端口号来检查其他端口的状态。</p><h3 id="我在访问控制台的时候报错了-org-apache-rocketmq-remoting-exception-remotingconnectexception-connect-to-failed" tabindex="-1"><a class="header-anchor" href="#我在访问控制台的时候报错了-org-apache-rocketmq-remoting-exception-remotingconnectexception-connect-to-failed" aria-hidden="true">#</a> 我在访问控制台的时候报错了， org.apache.rocketmq.remoting.exception.RemotingConnectException: connect to failed</h3><p><code>RemotingConnectException</code>是RocketMQ的一个常见异常，通常表示客户端（在这种情况下是RocketMQ Console）无法连接到RocketMQ的nameserver或broker。</p><p>让我们一步一步地进行故障排除：</p><ol><li><p><strong>确保namesrv容器正在运行</strong>:</p><p>使用以下命令检查容器状态：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span> <span class="token function">grep</span> rmqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你看不到正在运行的<code>rmqnamesrv</code>容器，你需要启动它。</p></li><li><p><strong>Docker网络问题</strong>:</p><p>确保你的RocketMQ Console容器可以解析和访问<code>rmqnamesrv</code>。在Docker的默认桥接网络模式下，容器应该能够通过容器名解析其他容器的地址。但是，为了验证这一点，你可以执行以下操作：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> rmqconsole <span class="token function">ping</span> rmqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你得到一个正常的ping响应，那么网络连接是好的。如果不是，你可能需要考虑将这两个容器放在同一个Docker网络中。</p></li><li><p><strong>检查RocketMQ的日志</strong>:</p><p>检查<code>rmqnamesrv</code>容器的日志，看看是否有任何异常或错误：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> logs rmqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>检查端口</strong>:</p><p>确保你的RocketMQ namesrv容器确实在监听9876端口。你可以使用<code>docker exec</code>命令与<code>netstat</code>工具结合，或者查看Docker的容器详情来验证。</p></li><li><p><strong>重新启动服务</strong>:</p><p>有时简单地重启服务容器可以解决连接问题。</p></li><li><p><strong>验证环境变量</strong>:</p><p>确保你在启动RocketMQ Console容器时正确设置了<code>JAVA_OPTS</code>环境变量，并指向了正确的namesrv地址。</p></li></ol><h3 id="运行第二步c-users-machaojin-docker-exec-it-rmqconsole-ping-rmqnamesrv-ping-unknown-host" tabindex="-1"><a class="header-anchor" href="#运行第二步c-users-machaojin-docker-exec-it-rmqconsole-ping-rmqnamesrv-ping-unknown-host" aria-hidden="true">#</a> 运行第二步C:\\Users\\machaojin&gt;docker exec -it rmqconsole ping rmqnamesrv ping: unknown host</h3><p>这意味着从<code>rmqconsole</code>容器内部无法解析<code>rmqnamesrv</code>的容器名称。这可能是由于网络隔离或其他原因。</p><p>这里是一些可能的解决方案：</p><ol><li><p><strong>使用Docker自定义网络</strong>：</p><p>使用Docker自定义网络可以确保容器之间的服务发现和通信。以下是创建和使用自定义网络的步骤：</p><p>a. 创建一个新的Docker网络：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> network create rmqnetwork
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>b. 将<code>rmqnamesrv</code>和<code>rmqbroker</code>容器连接到该网络：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> network connect rmqnetwork rmqnamesrv
<span class="token function">docker</span> network connect rmqnetwork rmqbroker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>c. 将<code>rmqconsole</code>容器也连接到该网络：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> network connect rmqnetwork rmqconsole
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>d. 重新尝试从<code>rmqconsole</code>容器内部ping<code>rmqnamesrv</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> rmqconsole <span class="token function">ping</span> rmqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果上述步骤可以成功ping到<code>rmqnamesrv</code>，则问题应该得到解决。</p></li><li><p><strong>手动更新/etc/hosts</strong>：</p><p>如果你不想创建一个新的Docker网络，还有一个临时的解决方案是在<code>rmqconsole</code>容器内部手动编辑<code>/etc/hosts</code>文件，并添加<code>rmqnamesrv</code>的IP地址。</p><p>a. 获取<code>rmqnamesrv</code>的IP地址：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> inspect <span class="token parameter variable">-f</span> <span class="token string">&#39;{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}&#39;</span> rmqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>b. 使用该IP地址，手动在<code>rmqconsole</code>的<code>/etc/hosts</code>文件中添加一行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> rmqconsole <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;echo &quot;&lt;IP_ADDRESS_FROM_ABOVE&gt; rmqnamesrv&quot; &gt;&gt; /etc/hosts&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>c. 重新尝试从<code>rmqconsole</code>容器内部ping<code>rmqnamesrv</code>。</p></li></ol>`,43),c=[o];function t(d,i){return a(),n("div",null,c)}const m=e(r,[["render",t],["__file","docker安装racketMQ.html.vue"]]);export{m as default};
