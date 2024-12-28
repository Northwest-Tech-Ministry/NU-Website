<template>
  <div class="container">

    <h1>Lab: Xv6 and Unix utilities</h1>

    <p>
      In this lab, you will implement some simple Unix utilities in xv6.
      The lab is divided into five tasks: <router-link to="/labs/util#boot-xv6">boot xv6</router-link>,
      <router-link to="/labs/util#sleep">sleep</router-link>,
      <router-link to="/labs/util#pingpong">pingpong</router-link>,
      <router-link to="/labs/util#primes">primes</router-link>, and
      <router-link to="/labs/util#find">find</router-link>.
      </p>
    <p>This lab will familiarize you with xv6 and its system calls.
      Have a look at the <router-link to="/tools">lab tools page</router-link> for information
      about how to set up your computer to run these labs.
    </p>

    <h2 id="boot-xv6">Boot xv6 (<span class="easy">easy</span>)
    </h2>

    <p>Build and run xv6:</p>
    <pre>
$ <kbd>make qemu</kbd>
riscv64-unknown-elf-gcc    -c -o kernel/entry.o kernel/entry.S
riscv64-unknown-elf-gcc -Wall -Werror -O -fno-omit-frame-pointer -ggdb -DSOL_UTIL -MD -mcmodel=medany -ffreestanding -fno-common -nostdlib -mno-relax -I. -fno-stack-protector -fno-pie -no-pie   -c -o kernel/start.o kernel/start.c
...
riscv64-unknown-elf-ld -z max-page-size=4096 -N -e main -Ttext 0 -o user/_zombie user/zombie.o user/ulib.o user/usys.o user/printf.o user/umalloc.o
riscv64-unknown-elf-objdump -S user/_zombie > user/zombie.asm
riscv64-unknown-elf-objdump -t user/_zombie | sed '1,/SYMBOL TABLE/d; s/ .* / /; /^$/d' > user/zombie.sym
mkfs/mkfs fs.img README  user/xargstest.sh user/_cat user/_echo user/_forktest user/_grep user/_init user/_kill user/_ln user/_ls user/_mkdir user/_rm user/_sh user/_stressfs user/_usertests user/_grind user/_wc user/_zombie
nmeta 46 (boot, super, log blocks 30 inode blocks 13, bitmap blocks 1) blocks 954 total 1000
balloc: first 591 blocks have been allocated
balloc: write bitmap block at sector 45
qemu-system-riscv64 -machine virt -bios none -kernel kernel/kernel -m 128M -smp 3 -nographic -drive file=fs.img,if=none,format=raw,id=x0 -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0

xv6 kernel is booting

hart 2 starting
hart 1 starting
init: starting sh
$
</pre>

    <p>
      If you type <tt>ls</tt> at the prompt, you should see output similar
      to the following:
    </p>
    <pre>
$ <kbd>ls</kbd>
.              1 1 1024
..             1 1 1024
README         2 2 2227
xargstest.sh   2 3 93
cat            2 4 32864
echo           2 5 31720
forktest       2 6 15856
grep           2 7 36240
init           2 8 32216
kill           2 9 31680
ln             2 10 31504
ls             2 11 34808
mkdir          2 12 31736
rm             2 13 31720
sh             2 14 54168
stressfs       2 15 32608
usertests      2 16 178800
grind          2 17 47528
wc             2 18 33816
zombie         2 19 31080
console        3 20 0
</pre>
    These are the files that <tt>mkfs</tt> includes in the
    initial file system; most are programs you can run. You just ran one of them: <tt>ls</tt>.

    <p>xv6 has no <tt>ps</tt> command, but, if you type <kbd>Ctrl-p</kbd>,
      the kernel will print information about each process.
      If you try it now, you'll see two lines: one for <tt>init</tt>,
      and one for <tt>sh</tt>.
    </p>
    <p>To quit qemu type: <kbd>Ctrl-a x</kbd> (press <kbd>Ctrl</kbd> and <kbd>a</kbd> at the same time, followed by
      <kbd>x</kbd>).
    </p>

    <h2 id="sleep">sleep (<span class="easy">easy</span>)
    </h2>

    <div class="required">
      <p>Implement a user-level <tt>sleep</tt> program for xv6, along the lines
        of the UNIX sleep command. Your <tt>sleep</tt> should pause
        for a user-specified number of ticks. A tick is a notion of time
        defined by the xv6 kernel, namely the time between two interrupts
        from the timer chip. Your solution should be in the file
        <tt>user/sleep.c</tt>.
      </p>
    </div>

    <p>Some hints:</p>
    <ul>

      <li>Before you start coding, read Chapter 1 of
        the <router-link to="/xv6-book">xv6 Book</router-link>.</li>

      <li>Put your code in <tt>user/sleep.c</tt>.
        Look at some of the other programs in <tt>user/</tt>
        (e.g., <tt>user/echo.c</tt>, <tt>user/grep.c</tt>,
        and <tt>user/rm.c</tt>)
        to see how command-line arguments are passed to a program.</li>

      <li>Add your <tt>sleep</tt> program to <tt>UPROGS</tt> in Makefile; once you've
        done that, <tt>make qemu</tt> will compile your program and you'll
        be able to run it from the xv6 shell.</li>

      <li>If the user
        forgets to pass an argument, sleep should print an error message.</li>

      <li>The command-line argument is passed as a string; you can convert it to an
        integer using <tt>atoi</tt> (see user/ulib.c).</li>

      <li>Use the system call <tt>sleep</tt>.</li>

      <li>See <tt>kernel/sysproc.c</tt> for
        the xv6 kernel code that implements the <tt>sleep</tt> system
        call (look for <tt>sys_sleep</tt>), <tt>user/user.h</tt>
        for the C definition of <tt>sleep</tt> callable from a
        user program, and <tt>user/usys.S</tt> for the assembler
        code that jumps from user code into the kernel for <tt>sleep</tt>.</li>

      <li>sleep's <tt>main</tt> should call <tt>exit(0)</tt> when it is done.</li>


      <li>Look at Kernighan and Ritchie's book <i>The C programming language
          (second edition)</i> (K&R) to learn about C.</li>

    </ul>

    <p>Run the program from the xv6 shell:</p>
    <pre>
      $ <kbd>make qemu</kbd>
      ...
      init: starting sh
      $ <kbd>sleep 10</kbd>
      (nothing happens for a little while)
      $
    </pre>

    <p>Your program should pause when
      run as shown above.
      Run <kbd>make grade</kbd> in your command line (outside of qemu) to see if you pass the
      sleep tests.
    </p>
    <p>Note that <kbd>make grade</kbd> runs all tests, including the ones for the
      tasks below. If you want to run the grade tests for one task, type:</p>
    <pre>
     $ <kbd>./grade-lab-util sleep</kbd>
   </pre>
    <p>This will run the grade tests that match "sleep". Or, you can type:</p>
    <pre>
     $ <kbd>make GRADEFLAGS=sleep grade</kbd>
   </pre>
    <p>which does the same.</p>

    <h2 id="pingpong">pingpong (<span class="easy">easy</span>)
    </h2>

    <div class="required">
      <p> Write a user-level program that uses xv6 system calls to ''ping-pong'' a
        byte between two processes over a pair of pipes, one for each
        direction.
        The parent should send a byte to the child;
        the child should print "&lt;pid&gt;: received ping",
        where &lt;pid&gt; is its process ID,
        write the byte on the pipe to the parent,
        and exit;
        the parent should read the byte from the child,
        print "&lt;pid&gt;: received pong",
        and exit.
        Your
        solution should be in the file <tt>user/pingpong.c</tt>.</p>
    </div>

    <p>Some hints:</p>
    <ul>
      <li>Add the program to <tt>UPROGS</tt> in Makefile.</li>
      <li>You'll need to use the
        <tt>pipe</tt>,
        <tt>fork</tt>,
        <tt>write</tt>,
        <tt>read</tt>, and
        <tt>getpid</tt> system calls.
      </li>
      <li>User programs on xv6 have a limited set of library
        functions available to them. You can see the list in
        <tt>user/user.h</tt>; the source (other than for system calls)
        is in <tt>user/ulib.c</tt>, <tt>user/printf.c</tt>,
        and <tt>user/umalloc.c</tt>.
      </li>
    </ul>

    <p>Run the program from the xv6 shell and it should produce the
      following output:</p>
    <pre>
    $ <kbd>make qemu</kbd>
    ...
    init: starting sh
    $ <kbd>pingpong</kbd>
    4: received ping
    3: received pong
    $
  </pre>

    <p>Your program should exchange a byte
      between two processes and produces output as shown above.
      Run <kbd>make grade</kbd> to check.

    </p>
    <h2 id="primes">primes (<span class="hard">hard</span>)
    </h2>

    <div class="required">
      <p>Write a concurrent prime sieve program for xv6 using pipes
        and the design illustrated in
        the picture
        halfway down <a href="http://swtch.com/~rsc/thread/">this page</a>
        and the surrounding text.
        This idea
        is due to Doug McIlroy, inventor of Unix pipes.
        Your
        solution should be in the file <tt>user/primes.c</tt>.</p>
    </div>

    <p>Your goal is to use <tt>pipe</tt> and <tt>fork</tt> to set up
      the pipeline. The first process feeds the numbers 2 through 280
      into the pipeline. For each prime number, you will arrange to
      create one process that reads from its left neighbor over a pipe
      and writes to its right neighbor over another pipe. Since xv6 has
      limited number of file descriptors and processes, the first
      process can stop at 280.
    </p>
    <p>Some hints:</p>
    <ul>
      <li>Be careful to close file descriptors that a process doesn't
        need, because otherwise your program will run xv6 out of resources
        before the first process reaches 280.</li>

      <li>Once the first process reaches 280, it should wait until the
        entire pipeline terminates, including all children, grandchildren,
        &c. Thus the main primes process should only exit after all the
        output has been printed, and after all the other primes processes
        have exited.</li>

      <li>Hint: <tt>read</tt> returns zero when the write-side of
        a pipe is closed.</li>

      <li>It's simplest to directly write 32-bit (4-byte) <tt>int</tt>s to the
        pipes, rather than using formatted ASCII I/O.</li>

      <li>You should create the processes in the pipeline only as they are
        needed.</li>

      <li>Add the program to <tt>UPROGS</tt> in Makefile.</li>

      <li>If you get an infinite recursion error from the compiler for
        the function <tt>primes</tt>, you may have to declare <tt>void
          primes(int) __attribute__((noreturn));</tt> to indicate
        that <tt>primes</tt> doesn't return.</li>

    </ul>

    <p>Your solution should implement a pipe-based
      sieve and produce the following output:</p>
    <pre>
    $ <kbd>make qemu</kbd>
    ...
    init: starting sh
    $ <kbd>primes</kbd>
    prime 2
    prime 3
    prime 5
    prime 7
    prime 11
    prime 13
    prime 17
    prime 19
    prime 23
    prime 29
    prime 31
    ...
    $
  </pre>

  <h2 id="find">find (<span class="moderate">moderate</span>)
    </h2>

    <div class="required">
      <p>Write a simple version of the UNIX find program for xv6: find all the files
        in a directory tree with a specific name. Your solution
        should be in the file <tt>user/find.c</tt>.</p>

    </div>

    <p>Some hints:</p>
    <ul>
      <li>Look at user/ls.c to see how to read directories.</li>
      <li>Use recursion to allow find to descend into sub-directories.</li>
      <li>Don't recurse into "." and "..".</li>
      <li>Changes to the file system persist across runs of qemu; to get
        a clean file system run <kbd>make clean</kbd> and then <kbd>make qemu</kbd>.</li>
      <li>You'll need to use C strings. Have a look at K&R (the C book),
        for example Section 5.5.</li>
      <li> Note that == does not compare strings like in Python. Use strcmp() instead.</li>
      <li>Add the program to <tt>UPROGS</tt> in Makefile.</li>
    </ul>

    <p>Your solution should produce the following output (when the
      file system contains the files <tt>b</tt>, <tt>a/b</tt> and <tt>a/aa/b</tt>):</p>
    <pre>
    $ <kbd>make qemu</kbd>
    ...
    init: starting sh
    $ <kbd>echo > b</kbd>
    $ <kbd>mkdir a</kbd>
    $ <kbd>echo > a/b</kbd>
    $ <kbd>mkdir a/aa</kbd>
    $ <kbd>echo > a/aa/b</kbd>
    $ <kbd>find . b</kbd>
    ./b
    ./a/b
    ./a/aa/b
    $
  </pre>

    <p>Run <kbd>make grade</kbd> to see what our tests think.</p>

    <h2>Submit the lab</h2>

    <p>Please run <kbd>make grade</kbd> to ensure that your code passes all of the tests.</p>
  </div>
</template>

<script>
export default {
  name: 'Util',
};


</script>

<style scoped>
/* Add any relevant CSS here */
</style>
