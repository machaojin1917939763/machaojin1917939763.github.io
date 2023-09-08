import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,b as d}from"./app-532352ed.js";const r={},s=d(`<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>├── checkstyle  || -- # 代码格式检查组件
│   ├── 12306_checkstyle.xml  || -- # 代码格式检查组件规则配置
│   └── 12306_checkstyle_suppression.xml  || -- # 忽略代码格式检查组件规则配置
├── console-vue  || -- #  12306 前端控制台项目
│   ├── README.md
│   ├── babel.config.js
│   ├── jsconfig.json
│   ├── node_modules
│   ├── package.json
│   ├── public
│   ├── src
│   ├── vue.config.js
│   └── yarn.lock
├── dependencies  || -- #  12306 后端项目全局依赖版本控制
│   └── pom.xml
├── format  || -- #  12306 后端项目格式化组件
│   ├── 12306_spotless_formatter.xml  || -- #  12306 后端项目格式化组件规则配置
│   └── license-header  || -- #  12306 后端项目开源协议头格式化
├── frameworks  || -- #  12306 基础架构组件库
│   ├── base  || -- #  12306 顶层抽象基础组件
│   ├── bizs  || -- #  12306 业务相关基础组件，比如用户上下文等
│   ├── cache  || -- # 12306 缓存基础组件
│   ├── common  || -- # 12306 公共工具包组件
│   ├── convention  || -- # 12306 项目规约组件
│   ├── database  || -- # 12306 数据库持久层组件
│   ├── designpattern  || -- # 12306 设计模式抽象基础组件
│   ├── distributedid  || -- # 12306 分布式 ID 基础组件
│   ├── idempotent  || -- # 12306 幂等基础组件，包括 HTTP 及不同消息队列实现
│   ├── log  || -- # 12306 日志打印基础组件库
│   └── web  || -- # 12306 Web 相关基础组件库
│   ├── pom.xml
├── resources  || -- # 12306 项目数据库初始化及其它
│   ├── data  || -- # 12306 数据库数据初始化
│   └── db  || -- # 12306 数据库初始化
├── services  || -- # 12306 后端项目集合
│   ├── aggregation-service  || -- # 12306 SpringBoot 聚合模式服务
│   ├── gateway-service  || -- # 12306 网关服务
│   ├── order-service  || -- # 12306 订单服务
│   ├── pay-service  || -- # 12306 支付服务
│   ├── ticket-service  || -- # 12306 购票服务
│   └── user-service  || -- # 12306 用户服务
│   ├── pom.xml
└── tests  || -- # 12306 单元测试集合
│   ├── general  || -- # 12306 通用单元测试
└── pom.xml
├── LICENSE
├── mvnw
├── mvnw.cmd
├── pom.xml
├── README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>OrderModel orderModel = orderInfoDaoAdaptor.queryOrderInfo(orderDetailRequest.getUserId(), orderDetailRequest.getOrderId(), orderDetailRequest.getVin());
        if (orderModel == null){
            log.error(&quot;OrderServiceImpl.getOrderDetailInfo,order not found&quot;);
            throw new CommonException(ErrorcodeEnum.ORDER_DETAIL_EXCEPTION);
        }
            //判断当前订单是否是取消的
        if (null != orderDetailRequest.getPullTimeout() &amp;&amp; orderDetailRequest.getPullTimeout().equals(CHECK_ORDER_TIMEOUT)  &amp;&amp; orderModel.getOrderState().equals(OrderStateEnum.UN_PAID.getValue())){
             LocalDateTime orderExpireTime = orderModel.getOrderExpireTime();
             if (orderExpireTime != null &amp;&amp; orderExpireTime.isBefore(LocalDateTime.now())) {
                try {
                   this.cancelOrder(orderDetailRequest.getUserId(), orderDetailRequest.getOrderId(), CancelTypeEnum.SYSTEM_TIME_OUT);
                }catch (Exception e){
                    log.error(&quot;OrderServiceImpl.getOrderDetailInfo,order cancel exception&quot;);
                    e.printStackTrace();
                    orderModel = orderInfoDaoAdaptor.queryOrderInfo(orderDetailRequest.getUserId(), orderDetailRequest.getOrderId(), orderDetailRequest.getVin());
                }
             }
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StormEye是一款用于汽车电子测试领域的测试执行管理软件。产品可配合东信自研测试机柜使用，也可配合测试工具单独使用，适用于汽车电子网络测试、功能测试、仿真测试等领域，包含测试管理、测试执行、问题跟踪等内容</p>`,3),l=[s];function a(v,c){return i(),n("div",null,l)}const o=e(r,[["render",a],["__file","重要的代码.html.vue"]]);export{o as default};
