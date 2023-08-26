import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,b as l}from"./app-6e0de965.js";const r={},o=l('<h2 id="jvm-有什么作用" tabindex="-1"><a class="header-anchor" href="#jvm-有什么作用" aria-hidden="true">#</a> JVM 有什么作用</h2><p>JVM是Java虚拟机的缩写，它是一种能够执行Java字节码的软件平台。JVM有以下几个作用：</p><ul><li>实现Java的跨平台性。JVM可以在不同的操作系统和硬件上运行，使得Java程序可以一次编译，到处运行，而不需要针对每个平台进行修改和重新编译。</li><li>提供Java的内存管理和垃圾回收机制。JVM负责为Java程序分配和回收内存，避免了内存泄漏和溢出等问题，减轻了开发者的负担。</li><li>保证Java的安全性。JVM对Java程序进行了严格的验证和监控，防止了恶意代码或者非法操作对系统造成损害，提高了程序的可靠性。</li><li>提高Java的性能。JVM使用即时编译器（JIT）将热点代码（被频繁执行的代码）编译为本地机器码，提升了程序的执行效率。JVM还可以进行动态优化，根据程序的运行情况进行调整和改进。</li><li>支持Java的动态性。JVM可以在运行时动态加载和卸载类，支持反射和代理等特性，使得Java程序更加灵活和强大。</li></ul><h2 id="介绍-jvm-运行时数据区域" tabindex="-1"><a class="header-anchor" href="#介绍-jvm-运行时数据区域" aria-hidden="true">#</a> 介绍 JVM 运行时数据区域</h2><p>JVM运行时数据区域是指Java虚拟机在执行Java程序时所管理的内存空间，它包括以下几个部分：</p><ul><li>程序计数器：它是一块较小的内存空间，用于存储当前线程所执行的字节码的行号指示器。它可以看作是当前线程的执行位置，每个线程都有自己的程序计数器，互不影响。</li><li>虚拟机栈：它是一种后进先出的数据结构，用于存储每个方法的栈帧。栈帧中包含了局部变量表、操作数栈、动态链接、方法返回地址等信息，用于支持方法的调用和返回。每个线程都有自己的虚拟机栈，生命周期与线程相同。</li><li>本地方法栈：它与虚拟机栈类似，但是用于支持本地方法（native method）的调用。本地方法是使用其他语言（如C或C++）编写的，并且不在Java虚拟机中运行的方法。每个线程都有自己的本地方法栈，生命周期与线程相同。</li><li>堆：它是Java虚拟机管理的最大的一块内存空间，用于存储对象实例和数组。堆是被所有线程共享的，在虚拟机启动时创建，可以动态扩展或收缩。堆中的对象可以被垃圾回收器回收。</li><li>方法区：它是一种特殊的堆，用于存储已经加载的类信息、常量、静态变量、即时编译后的代码等数据。方法区也是被所有线程共享的，在虚拟机启动时创建，可以动态扩展或收缩。方法区中的数据也可以被垃圾回收器回收。</li></ul><h2 id="哪些内存区域可能发生-oom-每个区域发生-oom-的原因有哪些" tabindex="-1"><a class="header-anchor" href="#哪些内存区域可能发生-oom-每个区域发生-oom-的原因有哪些" aria-hidden="true">#</a> 哪些内存区域可能发生 OOM？每个区域发生 OOM 的原因有哪些</h2><p>JVM中可能发生OOM的内存区域有以下几种：</p><ul><li>堆（Heap）：用于存储对象实例和数组，是所有线程共享的。如果堆空间不足，或者存在内存泄漏，或者分配了过大的对象，都可能导致堆OOM。</li><li>方法区（Method Area）：用于存储已加载的类信息、常量、静态变量、JIT编译后的代码等，也是所有线程共享的。如果方法区空间不足，或者存在大量的反射或动态代理操作，或者没有重启JVM，都可能导致方法区OOM。</li><li>程序计数器（Program Counter Register）：用于存储当前线程所执行的字节码的行号指示器，是每个线程私有的。<strong>程序计数器一般不会发生OOM</strong>，除非虚拟机内部出现错误。</li><li>虚拟机栈（Java Virtual Machine Stack）：用于存储每个方法的栈帧，包含局部变量表、操作数栈、动态链接、方法返回地址等信息，是每个线程私有的。如果虚拟机栈空间不足，或者存在死循环或递归调用，都可能导致虚拟机栈OOM。</li><li>本地方法栈（Native Method Stack）：用于支持本地方法（native method）的调用，与虚拟机栈类似，也是每个线程私有的。如果本地方法栈空间不足，或者存在本地方法内存分配失败，都可能导致本地方法栈OOM。</li></ul><h2 id="所有的对象都一定会分配在堆中吗-还可以分配到哪里" tabindex="-1"><a class="header-anchor" href="#所有的对象都一定会分配在堆中吗-还可以分配到哪里" aria-hidden="true">#</a> 所有的对象都一定会分配在堆中吗？还可以分配到哪里</h2><p>不，不是所有的对象都一定会分配在堆中。除了堆，对象还可以分配到以下两个地方：</p><ul><li>栈：如果对象没有发生逃逸，即对象的引用没有被其他线程或方法访问，那么JVM可以通过逃逸分析判断出对象的作用域，并将其分配到栈上。这样做的好处是，对象可以随着方法的结束而被销毁，不需要垃圾回收器介入，减轻了堆的压力。</li><li>堆外内存：如果对象是直接字节缓冲（Direct ByteBuffer），那么JVM可以将其分配到堆外内存中。这样做的好处是，可以避免在Java堆和本地堆之间来回复制数据，提高了IO操作的效率。</li></ul><h2 id="new-一个对象在堆中的历程-对象的创建过程" tabindex="-1"><a class="header-anchor" href="#new-一个对象在堆中的历程-对象的创建过程" aria-hidden="true">#</a> new 一个对象在堆中的历程（对象的创建过程）</h2><p>对象的创建过程是 Java 程序中非常重要的一个环节，它涉及到类加载、内存分配、初始化、指针压缩等多个方面。</p><p>以下是一些关于对象创建过程的概述：</p><ul><li>当 Java 虚拟机遇到一条 new 指令时，首先会检查这个指令的参数是否能在常量池中定位到一个类的符号引用，并且检查这个符号引用对应的类是否已经被加载、解析和初始化过。如果没有，就会先执行相应的类加载过程。</li><li>类加载检查通过后，接下来虚拟机会为新生对象分配内存空间。对象所需内存大小在类加载完成后就可以确定了。根据堆中的内存是否规整，有两种分配方式：指针碰撞和空闲列表。指针碰撞是在内存空间规整的情况下，通过移动一个指针来划分已使用和未使用的内存空间。空闲列表是在内存空间不规整的情况下，通过维护一个列表来记录哪些内存块是可用的，分配时从列表中找到一块足够大的连续空间划分给对象。</li><li>内存分配完成后，虚拟机会将分配到的内存空间（不包括对象头）都初始化为零值，保证对象的实例字段在 Java 代码中可以不赋初始值就直接使用，程序能访问到这些字段的数据类型所对应的零值。</li><li>接下来虚拟机要对对象头进行设置，包括两部分信息：类型指针和标记字段。类型指针是对象指向它的类型元数据的指针，通过这个指针可以确定对象是哪个类的实例。标记字段用于存储对象自身的运行时数据，如哈希码、GC 分代年龄、锁状态标志等。</li><li>最后一步是执行对象的构造函数，初始化对象所需的资源和状态信息。构造函数会调用父类的构造函数，直到 Object 类为止。新建出来的对象包含了所有父类中的实例字段。</li></ul><h2 id="说一下三色标记法" tabindex="-1"><a class="header-anchor" href="#说一下三色标记法" aria-hidden="true">#</a> 说一下三色标记法</h2><p>三色标记法是一种垃圾回收法，它可以让JVM不发生或仅短时间发生STW (Stop The World)，从而达到清除JVM内存垃圾的目的。JVM中的CMS和G1垃圾回收器都使用了这种算法。</p><p>三色标记法的基本思想是将对象分为三种颜色：白色、灰色和黑色。白色表示对象没有被标记过，可能是垃圾；灰色表示对象已经被标记过，但是它的引用对象还没有被标记；黑色表示对象已经被标记过，而且它的引用对象也都被标记过。三色标记法的目标是将所有存活的对象都标记为黑色，然后清除掉白色的对象。</p><p>三色标记法的具体流程如下：</p><ul><li>首先，将所有对象放入白色集合中，表示都是未标记的。</li><li>然后，从根对象（GC Root）开始遍历，将遍历到的对象从白色集合移动到灰色集合中，表示已经被标记，但还需要继续遍历它们的引用对象。</li><li>接着，遍历灰色集合中的对象，将它们引用的对象从白色集合移动到灰色集合中，表示需要继续标记。同时，将这些对象从灰色集合移动到黑色集合中，表示已经完成了标记。</li><li>重复上一步，直到灰色集合为空，表示所有存活的对象都被标记为黑色了。</li><li>最后，清除掉白色集合中的对象，释放内存空间。</li></ul><p>三色标记法在并发标记的过程中，可能会遇到一些问题，比如浮动垃圾和对象漏标。浮动垃圾是指在并发标记期间，由于用户程序的运行导致一些已经被标记为黑色或灰色的对象变成了垃圾。这些对象不会被重新扫描，所以会留到下一次GC进行处理。对象漏标是指在并发标记期间，由于用户程序的运行导致一些未被扫描过的白色对象被重新引用了。这些对象可能会被错误地回收掉，导致程序出错。为了解决这些问题，CMS和G1采取了不同的策略：</p><ul><li>CMS使用了增量更新（Incremental Update）方法，在一个未被扫描过的白色对象被重新引用后，如果引用它的对象是黑色的，则要把它变成灰色，在下次重新标记时让GC线程继续扫描它。</li><li>G1使用了快照在写入（Snapshot At The Beginning, SATB）方法，在一个已经被扫描过的灰色或黑色对象断开引用后，如果它引用的对象是白色的，则要把它记录下来，在下次重新标记时让GC线程重新扫描它。</li></ul><h2 id="如何在堆中找到某个对象的具体位置-对象的访问定位" tabindex="-1"><a class="header-anchor" href="#如何在堆中找到某个对象的具体位置-对象的访问定位" aria-hidden="true">#</a> 如何在堆中找到某个对象的具体位置（对象的访问定位）</h2><p>Java对象的访问定位是指如何根据引用变量找到堆中的对象实例和类型信息的方式。不同的虚拟机实现可能采用不同的访问方式，但主流的有两种：使用句柄和直接指针。</p><p>使用句柄的方式是在堆中划分出一块内存作为句柄池，引用变量中存储的是对象的句柄地址，而句柄中包含了对象实例数据和类型数据各自的具体地址。这样，访问对象时需要先通过引用变量找到句柄，再通过句柄找到实例数据和类型数据。这种方式的优点是对象移动时只需改变句柄中的地址，而不影响引用变量的值；缺点是访问速度较慢，因为多了一次间接寻址的开销。</p><p>使用直接指针的方式是引用变量中直接存储对象的地址，而对象在存储实例数据的同时还附带了类型数据的指针。这样，访问对象时只需通过引用变量找到对象，再通过对象找到类型数据。这种方式的优点是访问速度较快，因为少了一次间接寻址的开销；缺点是对象移动时需要改变所有引用变量的值，而且需要额外的空间存储类型数据指针。</p><p>目前，HotSpot虚拟机采用的是直接指针访问方式，因为它认为访问速度比对象移动更重要。</p><h2 id="什么是堆外内存" tabindex="-1"><a class="header-anchor" href="#什么是堆外内存" aria-hidden="true">#</a> 什么是堆外内存</h2><p>堆外内存是指不受Java虚拟机管理的内存，它是直接由操作系统分配和回收的。堆外内存的优点是可以减少垃圾回收的影响，提高内存访问速度，适合存放一些生命周期长或者不易变化的数据。堆外内存的缺点是需要手动管理内存的分配和释放，容易出现内存泄漏或者溢出的问题，而且不易于调试和监控。</p><p>Java中使用堆外内存的常见方式是通过ByteBuffer类，它提供了一个allocateDirect方法，可以创建一个直接缓冲区，这个缓冲区的数据是存放在堆外内存中的。直接缓冲区可以提高IO操作的性能，因为它避免了在Java堆和本地堆之间复制数据的开销。但是直接缓冲区也有一些限制，比如它的容量是固定的，不能动态扩展或收缩，而且它的创建和销毁成本较高。</p><h2 id="方法区会发生垃圾回收吗" tabindex="-1"><a class="header-anchor" href="#方法区会发生垃圾回收吗" aria-hidden="true">#</a> 方法区会发生垃圾回收吗</h2><p>方法区是Java虚拟机中用于存储类信息、常量、静态变量等数据的区域。方法区的垃圾回收主要针对两种情况：废弃的常量和不再使用的类。</p><p>废弃的常量是指常量池中没有被任何地方引用的常量，例如字符串、数字、类名等。这些常量可以被回收，以释放方法区的空间。回收废弃常量的方式与回收Java堆中的对象类似，只要没有引用就可以被清除。</p><p>不再使用的类是指满足以下三个条件的类：</p><ul><li>该类所有的实例都已经被回收，也就是Java堆中不存在该类及其任何派生子类的实例。</li><li>加载该类的类加载器已经被回收，这个条件除非是经过精心设计的可替换类加载器的场景，如OSGi、JSP 的重加载等，否则通常是很难达成的。</li><li>该类对应的java.lang.Class对象没有在任何地方被引用，无法在任何地方通过反射访问该类的方法。</li></ul><p>如果一个类满足了上述三个条件，那么它就可以被回收，以释放方法区的空间。但是，并不是说满足了这些条件就一定会被回收，而是说虚拟机有权利在合适的时机进行回收。是否要对类型进行回收，还取决于虚拟机的具体实现和配置参数。</p><p>例如，HotSpot虚拟机提供了一个参数-Xnoclassgc来控制是否开启类型卸载功能，默认是开启的。还可以使用-verbose:class以及-XX:+TraceClassLoading、-XX:+TraceClassUnloading来查看类加载和卸载的信息。</p><p>方法区的垃圾回收相比于Java堆中的垃圾回收，发生的频率要低得多，而且效果也不太明显。但是，在某些场景下，方法区的垃圾回收还是很有必要的，比如使用了大量反射、动态代理、字节码生成等技术的情况下，可能会产生大量的类型，如果不及时回收，可能会导致方法区溢出或内存泄漏。</p><h2 id="如何判断对象为垃圾-如何判断对象是否可回收-、哪些对象的引用可以作为-gc-roots" tabindex="-1"><a class="header-anchor" href="#如何判断对象为垃圾-如何判断对象是否可回收-、哪些对象的引用可以作为-gc-roots" aria-hidden="true">#</a> 如何判断对象为垃圾（如何判断对象是否可回收）、哪些对象的引用可以作为 GC Roots</h2><p>Java对象的垃圾回收是指Java虚拟机自动管理堆内存中不再使用的对象，释放它们占用的空间，以提高内存利用率和程序性能。Java对象的垃圾回收主要涉及两个问题：如何判断对象是否可回收，以及哪些对象的引用可以作为GC Roots。</p><p>如何判断对象是否可回收</p><p>判断对象是否可回收的方法有两种：引用计数法和可达性分析法。</p><p>引用计数法是指给每个对象添加一个引用计数器，当有一个地方引用它时，计数器值加一；当引用失效时，计数器值减一。当计数器值为零时，说明该对象没有被任何地方引用，可以被回收。这种方法实现简单，判定效率高，但是存在一个循环引用的问题，即如果两个或多个对象相互引用，但是没有被其他地方引用，那么它们的计数器值都不为零，但实际上它们已经是垃圾对象。因此，Java虚拟机没有采用这种方法。</p><p>可达性分析法是指从一些称为GC Roots的对象作为起始点，向下搜索，所走过的路径称为引用链。如果一个对象到GC Roots没有任何引用链相连，说明该对象不可达，可以被回收。这种方法可以解决循环引用的问题，但是实现起来比较复杂，需要维护一个GC Roots集合，并且需要暂停用户线程进行垃圾标记。Java虚拟机采用了这种方法。</p><p>哪些对象的引用可以作为GC Roots</p><p>GC Roots是一组必须活跃的引用，它们可以直接或间接地保持其他对象活跃。GC Roots通常包括以下几种：</p><ul><li>虚拟机栈中的局部变量表中引用的对象</li><li>方法区中类静态属性引用的对象</li><li>方法区中常量引用的对象</li><li>本地方法栈中JNI（Native方法）引用的对象</li><li>Java虚拟机内部的引用（如基本数据类型对应的Class对象）</li><li>所有被同步锁（synchronized关键字）持有的对象</li><li>反映Java虚拟机内部情况的JMXBean、JVMTI中注册的回调、本地代码缓存等</li></ul><h2 id="为什么类的成员变量不可以作为-gc-root" tabindex="-1"><a class="header-anchor" href="#为什么类的成员变量不可以作为-gc-root" aria-hidden="true">#</a> 为什么类的成员变量不可以作为 GC Root</h2><p>GC Root是指一组必须存活的引用，它们可以直接或间接地保持其他对象存活。Java虚拟机在进行垃圾回收时，会从GC Root开始遍历，找出所有可达的对象，而不可达的对象就可以被回收。</p><p>类的成员变量不可以作为GC Root，因为它们不是必须存活的引用。类的成员变量是属于对象的实例数据，它们的生命周期取决于对象的生命周期。如果一个对象没有被任何GC Root引用，那么它就是不可达的，它和它的成员变量都可以被回收。类的成员变量只有在对象存活时才能保持其他对象存活，而不是反过来。</p><p>相反，类的静态变量可以作为GC Root，因为它们是属于类的数据，它们的生命周期取决于类的生命周期。类是由类加载器加载到方法区中的，方法区中的类静态属性引用的对象是一种GC Root。只要类没有被卸载，它和它的静态变量就一直存在，它们可以保持其他对象存活。</p><h2 id="什么是安全点和安全区域" tabindex="-1"><a class="header-anchor" href="#什么是安全点和安全区域" aria-hidden="true">#</a> 什么是安全点和安全区域</h2><p>安全点和安全区域是Java虚拟机在进行垃圾回收时，为了保证线程的安全暂停而设置的一些特殊位置或区域。</p><p>安全点（safe point）是指在程序执行过程中，某些位置可以让所有线程停止在那里，等待垃圾回收完成。这些位置一般是在方法返回前，循环回跳前，以及字节码边界处。安全点的目的是为了让虚拟机能够快速找到所有线程的栈帧和寄存器中的引用，从而进行可达性分析和根节点枚举。安全点的选择需要平衡放置的数量和位置，不能太多也不能太少，也不能影响程序的长时间执行。</p><p>安全区域（safe region）是指在程序执行过程中，某些区域内引用关系不会发生变化，可以让线程在任何地方停止，等待垃圾回收完成。这些区域一般是在线程被挂起或者执行本地方法时。安全区域的目的是为了解决某些线程无法到达安全点的问题，例如正在睡眠或者阻塞的线程。安全区域需要线程进入和退出时进行检查，并通知虚拟机自己的状态。</p><h2 id="知道三色标记法吗-浮动垃圾和对象消失问题" tabindex="-1"><a class="header-anchor" href="#知道三色标记法吗-浮动垃圾和对象消失问题" aria-hidden="true">#</a> 知道三色标记法吗（浮动垃圾和对象消失问题）</h2><p>三色标记法是一种垃圾回收法，它可以让JVM不发生或仅短时间发生STW (Stop The World)，从而达到清除JVM内存垃圾的目的。JVM中的CMS和G1垃圾回收器都使用了三色标记法。</p><p>三色标记法的基本思想是，将对象分为三种颜色：白色、灰色和黑色。白色表示对象是垃圾，可以被回收；灰色表示对象已经被标记，但还有引用的对象没有被标记；黑色表示对象已经被标记，且所有引用的对象也都被标记。从GC Roots开始，遍历所有可达的对象，将它们从白色变为灰色，然后再遍历灰色对象，将它们引用的对象从白色变为灰色，并将自己变为黑色。重复这个过程，直到没有灰色对象为止，此时所有白色对象就是垃圾。</p><p>三色标记法在并发标记的过程中，可能会遇到两个问题：浮动垃圾和对象消失。</p><p>浮动垃圾是指在并发标记期间，由于用户线程继续运行而产生的新的垃圾对象。这些对象在第一次标记时已经被标记为灰色或黑色，但在第二次标记时已经不可达了。由于不会对已经标记过的对象重新扫描，所以这些对象就成了浮动垃圾。浮动垃圾对系统的影响不大，可以留给下一次GC进行处理。</p><p>对象消失是指在并发标记期间，由于用户线程继续运行而导致的一种可能导致程序出错的情况。具体来说，就是当一个白色对象被一个黑色对象引用时，如果这个白色对象原来被一个灰色对象引用，并且这个灰色对象刚好被扫描完毕而变成了黑色，那么这个白色对象就会消失，即不会被扫描到。这样就会导致一个本应该存活的对象被错误地回收。</p><p>为了解决这个问题，CMS和G1采用了不同的方法：</p><ul><li>CMS使用了增量更新（Incremental Update）方法，在一个黑色对象引用一个白色对象时，将这个黑色对象重新变成灰色，在下一次重新标记时再扫描它。</li><li>G1使用了快照优先（Snapshot At The Beginning）方法，在一个灰色对象释放对一个白色对象的引用时，将这个白色对象加入到一个集合中，在下一次重新标记时再扫描它。</li></ul><h2 id="对象可回收-就一定会被回收吗-finalize" tabindex="-1"><a class="header-anchor" href="#对象可回收-就一定会被回收吗-finalize" aria-hidden="true">#</a> 对象可回收，就一定会被回收吗？（finalize）</h2><p>对象可回收，并不意味着它一定会被回收。垃圾回收的时机和频率取决于虚拟机的具体实现和配置参数，以及系统的运行状况。虚拟机会根据内存的使用情况，自动决定何时进行垃圾回收，以达到最佳的性能和效率。因此，我们不能保证一个对象在什么时候会被回收，甚至不能保证它是否会被回收。</p><p>另外，一个对象在被垃圾回收之前，还有一次逃脱的机会，那就是通过重写Object类的finalize方法。finalize方法是在对象被垃圾回收之前调用的，它可以执行一些清理操作或者重新激活对象。如果一个对象在finalize方法中重新建立了与GC Roots的引用链，那么它就可以重新复活，不会被回收。但是，这种方式并不推荐使用，因为它会增加垃圾回收的开销和复杂度，而且不能保证finalize方法一定会被调用。</p><h2 id="finalize-中抛出异常会导致程序崩溃吗" tabindex="-1"><a class="header-anchor" href="#finalize-中抛出异常会导致程序崩溃吗" aria-hidden="true">#</a> finalize 中抛出异常会导致程序崩溃吗</h2><p>finalize方法是在对象被垃圾回收之前调用的，它可以执行一些清理操作或者重新激活对象。如果一个对象在finalize方法中抛出了异常，那么这个异常会被忽略，不会导致程序崩溃。但是，这个对象的垃圾回收也会被终止，可能导致资源泄漏或者内存溢出。</p><p>因此，我们不应该在finalize方法中抛出异常，也不应该在finalize方法中执行复杂的逻辑。我们应该尽量避免使用finalize方法，而是使用其他更可靠的方式来管理资源，比如try-with-resources语句或者显式的close方法。</p><h2 id="java-中有几种类型的引用-其区别和具体作用是什么" tabindex="-1"><a class="header-anchor" href="#java-中有几种类型的引用-其区别和具体作用是什么" aria-hidden="true">#</a> Java 中有几种类型的引用，其区别和具体作用是什么</h2><p>Java中有四种类型的引用，它们是强引用、软引用、弱引用和虚引用。它们的区别和具体作用如下：</p><ul><li>强引用（Strong Reference）是指正常的对象引用，例如<code>Object obj = new Object();</code>。只要一个对象有强引用指向它，它就不会被垃圾回收器回收，即使内存不足也不会。只有当强引用被赋值为null或者超出作用域时，对象才有可能被回收。强引用是Java中默认的引用类型，也是最常用的引用类型。</li><li>软引用（Soft Reference）是指可以被垃圾回收器回收的对象引用，但是它比弱引用更难被回收。软引用可以通过<code>java.lang.ref.SoftReference</code>类来创建，例如<code>SoftReference&lt;Object&gt; obj = new SoftReference&lt;&gt;(new Object());</code>。一个对象只有软引用指向它时，它会在内存不足时被回收，但是在内存充足时保持存活。软引用通常用于实现缓存，可以在内存紧张时自动释放内存空间。</li><li>弱引用（Weak Reference）是指更容易被垃圾回收器回收的对象引用。弱引用可以通过<code>java.lang.ref.WeakReference</code>类来创建，例如<code>WeakReference&lt;Object&gt; obj = new WeakReference&lt;&gt;(new Object());</code>。一个对象只有弱引用指向它时，它会在下一次垃圾回收时被回收，不管内存是否充足。弱引用通常用于实现一些特殊的数据结构，例如<code>java.util.WeakHashMap</code>，可以避免内存泄漏的风险。</li><li>虚引用（Phantom Reference）是指最弱的一种对象引用。虚引用可以通过<code>java.lang.ref.PhantomReference</code>类来创建，例如<code>PhantomReference&lt;Object&gt; obj = new PhantomReference&lt;&gt;(new Object(), queue);</code>。虚引用必须和一个<code>java.lang.ref.ReferenceQueue</code>对象关联，当一个对象只有虚引用指向它时，它会在垃圾回收时被回收，并且把这个虚引用加入到关联的队列中。虚引用无法通过<code>get()</code>方法获取到对象的引用，因此它对程序逻辑没有影响。虚引用通常用于监控对象的回收情况，或者实现一些特殊的清理操作。</li></ul><h2 id="分代收集理论是什么-为什么要分代" tabindex="-1"><a class="header-anchor" href="#分代收集理论是什么-为什么要分代" aria-hidden="true">#</a> 分代收集理论是什么？为什么要分代</h2><p>分代收集理论是一种垃圾回收的理论，它认为不同的对象有不同的生命周期，因此可以将对象根据其年龄划分为不同的代，然后针对不同的代采用不同的垃圾回收算法和策略，以提高垃圾回收的效率和性能。</p><p>分代收集理论的基础是以下三个假设：</p><ul><li>弱分代假设：绝大多数对象都是朝生夕灭的，即很快就会变成垃圾。</li><li>强分代假设：熬过多次垃圾回收的对象越少越难消亡，即存活时间越长的对象越有可能继续存活。</li><li>跨代引用假设：跨代引用的对象很少，即老年代的对象引用新生代的对象的情况很少发生。</li></ul><p>根据这些假设，分代收集理论将Java堆划分为新生代和老年代两个区域。新生代中存放新创建的对象，老年代中存放经过多次垃圾回收仍然存活的对象。新生代又可以细分为一个Eden区和两个Survivor区，用于实现复制算法。老年代可以采用标记-清除或标记-整理算法。</p><p>分代收集理论的目的是为了减少垃圾回收的开销和频率，提高程序运行的效率。因为新生代中的对象大多数都是短暂存在的，所以可以使用复制算法快速地回收它们，而且只需要对新生代进行频繁的垃圾回收，而不需要对整个堆进行扫描。老年代中的对象大多数都是长期存活的，所以可以使用标记-清除或标记-整理算法慢慢地回收它们，而且只需要在内存不足时才进行垃圾回收，而不需要每次都进行扫描。</p><h2 id="有哪些垃圾收集算法" tabindex="-1"><a class="header-anchor" href="#有哪些垃圾收集算法" aria-hidden="true">#</a> 有哪些垃圾收集算法</h2><p>垃圾收集算法是指一种用于自动管理内存的技术，它可以识别和回收不再使用的对象，从而释放内存空间，提高程序性能。垃圾收集算法主要有以下几种：</p><ul><li>标记-清除算法（Mark-Sweep）：这是最基本的一种算法，它分为两个阶段，标记阶段和清除阶段。标记阶段的任务是标记出所有需要被回收的对象，清除阶段就是回收被标记的对象所占用的空间。这种算法的缺点是容易产生内存碎片，影响内存的利用率和分配效率。</li><li>复制算法（Copying）：这是一种为了解决标记-清除算法的缺点而提出的算法，它将可用内存划分为两块大小相等的区域，每次只使用其中一块。当这一块的内存用完了，就将还存活着的对象复制到另外一块上面，然后再把已使用的内存空间一次清理掉。这样就不会产生内存碎片，但是却浪费了一半的内存空间。</li><li>标记-整理算法（Mark-Compact）：这是一种为了解决复制算法的缺点而提出的算法，它在标记阶段和标记-清除算法一样，但是在清除阶段不是直接回收可回收对象，而是将存活对象都向一端移动，然后清理掉端边界以外的内存。这样就既避免了内存碎片，又充分利用了内存空间</li><li>分代收集算法（Generational Collection）：这是一种基于对象生命周期的算法，它将内存划分为不同的代（generation），一般有新生代（young generation）和老年代（old generation）。新生代中存放新创建的对象，老年代中存放经过多次垃圾回收仍然存活的对象。根据不同代的特点，采用不同的垃圾回收算法和策略，以提高垃圾回收的效率和性能。一般来说，新生代中采用复制算法，老年代中采用标记-整理算法。</li></ul><h2 id="hotspot-虚拟机新生代为什么用-mark-copy-算法" tabindex="-1"><a class="header-anchor" href="#hotspot-虚拟机新生代为什么用-mark-copy-算法" aria-hidden="true">#</a> HotSpot 虚拟机新生代为什么用 Mark Copy 算法</h2><p>HotSpot虚拟机新生代为什么用Mark Copy算法，这是一个很好的问题。Mark Copy算法，也就是复制算法，是一种适合新生代的垃圾回收算法，它的基本思想是将新生代划分为一个Eden区和两个Survivor区，每次只使用Eden区和其中一个Survivor区，当这两个区域满了时，就将存活的对象复制到另一个Survivor区，并清空原来的两个区域。这样可以快速地回收大量的短期对象，而且不会产生内存碎片。</p><p>HotSpot虚拟机选择使用Mark Copy算法的原因有以下几点：</p><ul><li>新生代中的对象大多数都是朝生夕灭的，即很快就会变成垃圾，所以使用复制算法可以节省标记和清除的时间，提高垃圾回收的效率。</li><li>新生代中的对象存活率很低，即只有少数对象会存活下来，所以使用复制算法可以减少复制和移动的开销，提高内存利用率。</li><li>新生代中的对象一般都是小对象，即占用内存空间不大，所以使用复制算法可以避免内存碎片的产生，提高内存分配的速度。</li></ul><h2 id="为什么需要-survivor-区-为什么设置两个-survivor-区-为什么不设置更多的-survivor-区" tabindex="-1"><a class="header-anchor" href="#为什么需要-survivor-区-为什么设置两个-survivor-区-为什么不设置更多的-survivor-区" aria-hidden="true">#</a> 为什么需要 Survivor 区？为什么设置两个 Survivor 区？为什么不设置更多的 Survivor 区</h2><p>Survivor区是Java堆中新生代的一部分，它的作用是存放经过一次或多次垃圾回收仍然存活的对象，以减少被送到老年代的对象，进而减少Full GC的发生。Survivor区的预筛选保证，只有经历16次Minor GC还能在新生代中存活的对象，才会被送到老年代。</p><p>Survivor区为什么要设置两个呢？这是为了解决内存碎片化的问题。如果只有一个Survivor区，那么每次进行Minor GC时，Eden区和Survivor区都会有一些存活对象，如果将这些对象都放到Survivor区，那么它们所占用的内存空间就会不连续，导致内存碎片化。内存碎片化会影响内存的利用率和分配效率，甚至导致内存不足的错误。</p><p>因此，设置两个Survivor区可以避免这个问题。每次进行Minor GC时，只使用Eden区和其中一个Survivor区（称为From区），将存活对象复制到另一个Survivor区（称为To区），并清空原来的两个区域。这样可以保证To区中的对象占用连续的内存空间，而且总有一个Survivor区是空的。然后下一次GC时，From和To交换角色，如此循环往复。</p><p>那么，为什么不设置更多的Survivor区呢？比如三个、四个、五个？这是因为如果Survivor区再细分下去，每一块的空间就会比较小，很容易导致Survivor区满，从而导致更多的对象提前进入老年代。而且，设置更多的Survivor区也会增加垃圾回收器的复杂度和开销。</p><h2 id="system-gc-能保证-gc-一定发生吗" tabindex="-1"><a class="header-anchor" href="#system-gc-能保证-gc-一定发生吗" aria-hidden="true">#</a> System.gc() 能保证 GC 一定发生吗</h2><p>System.gc()是一个建议性的方法，它可以让Java虚拟机尽力回收不再使用的对象，以释放内存空间。但是，System.gc()并不能保证GC一定发生，因为垃圾回收的时机和频率取决于虚拟机的具体实现和配置参数，以及系统的运行状况。虚拟机有权利忽略System.gc()的调用，或者只执行部分的垃圾回收。</p><p>即使GC发生了，System.gc()也不能保证所有的垃圾对象都会被回收，因为不同的垃圾回收算法和策略有不同的效果和目标。例如，System.gc()通常会触发一个全局垃圾回收（Full GC），它会回收整个堆内存中的对象，包括新生代和老年代。但是，如果虚拟机使用了分代收集算法（Generational Collection），那么它可能只会回收老年代中的对象，而不会回收新生代中的对象。</p><p>因此，我们不应该依赖System.gc()来管理内存，也不应该在代码中频繁地调用它。这样会增加垃圾回收器的开销和复杂度，而且可能导致程序性能下降或者出现不可预期的结果。我们应该信任虚拟机的自动垃圾回收机制，它可以根据内存的使用情况，自动决定何时进行垃圾回收，以达到最佳的性能和效率。</p><h2 id="full-gc-的触发条件" tabindex="-1"><a class="header-anchor" href="#full-gc-的触发条件" aria-hidden="true">#</a> Full GC 的触发条件</h2><p>Full GC的触发条件是指导致Java虚拟机执行全局垃圾回收的情况。全局垃圾回收（Full GC）是指对整个堆内存进行垃圾回收，包括新生代和老年代。Full GC通常会导致程序的停顿，影响性能，因此应该尽量避免或减少发生。</p><p>Full GC的触发条件有以下几种：</p><ul><li>老年代空间不足：当老年代空间不足以存放从新生代晋升的对象时，会触发Full GC。这种情况可以通过调整老年代的大小或者垃圾回收器的参数来避免或减少。</li><li>永久代空间不足：当永久代（PermGen）或元空间（Metaspace）空间不足以存放类的元数据时，会触发Full GC。这种情况可以通过调整永久代或元空间的大小或者使用类卸载来避免或减少。</li><li>System.gc()方法调用：当程序显式地调用System.gc()方法时，会建议虚拟机执行Full GC。但是，这并不是一定会触发Full GC，因为虚拟机有权利忽略这个建议。这种情况可以通过不在代码中调用System.gc()方法来避免。</li><li>内存分配失败：当程序尝试分配一个大对象，而堆内存中没有连续的空间能够存放它时，会触发Full GC。这种情况可以通过调整堆内存的大小或者使用标记-整理算法来避免或减少。</li><li>分代收集策略：当虚拟机使用分代收集算法时，会根据一定的策略来决定何时进行Full GC。例如，如果新生代中经过一定次数的Minor GC后仍然有对象存活，那么就会触发Full GC。这种情况可以通过调整分代收集策略的参数来避免或减少。</li></ul><h2 id="既然堆有垃圾收集为什么还会-oom" tabindex="-1"><a class="header-anchor" href="#既然堆有垃圾收集为什么还会-oom" aria-hidden="true">#</a> 既然堆有垃圾收集为什么还会 OOM？</h2><p>Java堆内存是Java虚拟机用来存放对象实例的内存区域，它是所有线程共享的。垃圾回收是Java虚拟机自动管理堆内存中不再使用的对象，释放它们占用的空间，以提高内存利用率和程序性能。</p><p>既然堆有垃圾收集为什么还会OOM（OutOfMemoryError）呢？这是一个很好的问题，它涉及到堆内存的分配和回收的原理和策略。OOM是指当程序尝试分配一个对象，而堆内存中没有足够的空间能够存放它时，会抛出一个错误，导致程序终止。OOM的原因有以下几种：</p><ul><li>堆内存设置过小：如果堆内存设置过小，那么很容易导致堆内存不足，无法满足程序的需求。这种情况可以通过调整堆内存的大小或者使用更高效的垃圾回收器来避免或减少。</li><li>内存泄漏：如果程序中存在一些对象，虽然不再使用，但是仍然被其他对象引用，导致它们无法被垃圾回收器回收，那么就会造成内存泄漏。这种情况可以通过检查程序的逻辑和引用关系，找出并消除内存泄漏的源头来避免或减少。</li><li>内存碎片化：如果程序中频繁地创建和销毁对象，那么就会导致堆内存中产生很多不连续的空闲空间，称为内存碎片。这种情况会影响内存的利用率和分配效率，甚至导致无法分配一个较大的对象。这种情况可以通过使用标记-整理算法或者复制算法来避免或减少。</li><li>对象过大：如果程序中创建了一个非常大的对象，超过了堆内存的最大限制，那么就会导致OOM。这种情况可以通过优化程序的设计和数据结构，避免创建过大的对象来避免或减少。</li></ul><h2 id="为什么垃圾回收次数过多会不好" tabindex="-1"><a class="header-anchor" href="#为什么垃圾回收次数过多会不好" aria-hidden="true">#</a> 为什么垃圾回收次数过多会不好</h2><p>垃圾回收是Java虚拟机自动管理堆内存中不再使用的对象，释放它们占用的空间，以提高内存利用率和程序性能。但是，垃圾回收次数过多会不好，因为它会带来以下几个方面的影响：</p><ul><li>垃圾回收会消耗CPU资源，影响程序的运行速度。如果垃圾回收次数过多，那么就会导致CPU频繁地切换到垃圾回收线程，从而降低程序的吞吐量。</li><li>垃圾回收会导致程序的停顿，影响用户体验。如果垃圾回收次数过多，那么就会导致程序在执行过程中经常暂停，等待垃圾回收完成，从而增加程序的响应时间。</li><li>垃圾回收会增加内存碎片化，影响内存分配效率。如果垃圾回收次数过多，那么就会导致堆内存中产生很多不连续的空闲空间，称为内存碎片。这种情况会影响内存的利用率和分配效率，甚至导致无法分配一个较大的对象。</li></ul><p>因此，我们应该尽量避免或减少垃圾回收次数过多的情况。我们可以通过以下几种方法来优化垃圾回收的性能：</p><ul><li>调整堆内存的大小和分配策略，以适应程序的需求和特点。</li><li>选择合适的垃圾回收器和算法，以达到最佳的效率和效果。</li><li>优化程序的设计和代码，以减少对象的创建和销毁，避免内存泄漏和浪费。</li></ul><h2 id="class-文件-字节码-存储的内容是什么" tabindex="-1"><a class="header-anchor" href="#class-文件-字节码-存储的内容是什么" aria-hidden="true">#</a> class 文件（字节码）存储的内容是什么</h2><p>Java类文件（字节码）是Java程序编译后生成的一种二进制文件，它可以被Java虚拟机（JVM）执行。Java类文件（字节码）存储的内容主要包括以下几个部分：</p><ul><li>魔数（Magic Number）：这是一个固定的4个字节的数字，用来标识这是一个Java类文件。它的值是0xCAFEBABE，表示“咖啡宝贝”。</li><li>版本号（Version Number）：这是一个4个字节的数字，用来标识这个类文件的版本。它由两个部分组成，前两个字节表示次版本号（minor version），后两个字节表示主版本号（major version）。不同的版本号对应不同的JVM规范。</li><li>常量池（Constant Pool）：这是一个表结构，用来存储常量信息，例如类名、方法名、字段名、字符串字面量等。常量池中的每一项都有一个类型标志和相应的数据。常量池中的项可以被其他部分引用，从而减少重复的数据。</li><li>访问标志（Access Flag）：这是一个2个字节的数字，用来标识这个类或接口的访问权限和属性。例如，是否是public、abstract、final等。</li><li>类索引、父类索引和接口索引集合（Class Index, Super Class Index and Interfaces Index Collection）：这些都是2个字节的数字，用来标识这个类或接口继承或实现了哪些其他类或接口。它们都是指向常量池中的项的索引。</li><li>字段表集合（Fields Table Collection）：这是一个表结构，用来存储这个类或接口声明的字段信息，例如字段名、类型、访问权限等。每个字段都有自己的属性表，用来存储一些额外的信息，例如常量值、注解等。</li><li>方法表集合（Methods Table Collection）：这是一个表结构，用来存储这个类或接口声明的方法信息，例如方法名、参数、返回值、访问权限等。每个方法都有自己的属性表，用来存储一些额外的信息，例如字节码指令、异常处理、注解等。</li><li>属性表集合（Attributes Table Collection）：这是一个表结构，用来存储这个类或接口的一些额外的信息，例如源文件名、内部类、注解等。</li></ul>',111),t=[o];function n(h,d){return e(),i("div",null,t)}const s=a(r,[["render",n],["__file","JVM相关面试题.html.vue"]]);export{s as default};
