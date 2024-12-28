<template>
  <div class="container">
    <h1>Tools</h1>
    <p>
      This page describes the tools you'll need to install to work on
      the labs. The labs are designed to work on Windows and macOS.
    </p>

    <h2>Install Programming II Tools</h2>

    <p>
      First, make sure you have installed the tools from Programming
      II including VSCode, a Linux environment, and appropriate
      extensions.
    </p>

    <h2>Install RISC-V Tools</h2>
    <p>
      In addition, you'll need the RISC-V versions of QEMU 7.2+, GDB
      8.3+, GCC, and Binutils.
    </p>

    <h3>Installing on Windows</h3>

    <p>
      Students running Windows should use WSL 2 (Windows Subsystem for
      Linux 2).
    </p>

    <p>
      To use WSL 2, first make sure you have the
      <a href="https://docs.microsoft.com/en-us/windows/wsl/install-win10">Windows Subsystem for Linux</a>
      installed. Then add
      <a href="https://apps.microsoft.com/detail/9nz3klhxdjp5">Ubuntu 24.04 from the Microsoft Store</a>. Afterwards you
      should be able to launch Ubuntu and interact
      with the machine.
    </p>

    <p>
      <i>
        IMPORTANT: Make sure that you are running version 2 of WSL.
        WSL 1 does not work with the 6.1810 labs. To check, run
        <code> wsl -l -v </code> in a Windows terminal to confirm
        that WSL 2 and the correct Ubuntu version are installed.
      </i>
    </p>

    <p>To install all the software you need for this class, run:</p>

    <pre>
$ sudo apt-get update && sudo apt-get upgrade
$ sudo apt-get install git build-essential gdb-multiarch qemu-system-misc gcc-riscv64-linux-gnu binutils-riscv64-linux-gnu
</pre>

    <p>
      From Windows, you should use <strong>GitHub Desktop</strong> and
      place files at: <i>c:\repos</i>. Then from Ubuntu you can access
      them at: <i>/mnt/c/repos</i>.
    </p>

    <h3>Installing on macOS</h3>

    <p>First, install developer tools:</p>

    <pre>
$ xcode-select --install
</pre>

    <p>
      Next, install <a href="https://brew.sh/">Homebrew</a>, a package
      manager for macOS:
    </p>

    <pre>
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
</pre>

    <p>
      Next, install the
      <a href="https://github.com/riscv/homebrew-riscv">RISC-V compiler toolchain</a>:
    </p>

    <pre>
$ brew tap riscv/riscv
$ brew install riscv-tools
</pre>

    <p>
      The brew formula may not link into <tt>/usr/local</tt>. You will
      need to update your shell's rc file (e.g.
      <a href="https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html">~/.bashrc</a>) to add the
      appropriate directory to
      <a href="http://www.linfo.org/path_env_var.html">$PATH</a>.
    </p>

    <pre>
PATH=$PATH:/usr/local/opt/riscv-gnu-toolchain/bin
</pre>

    <p>Finally, install QEMU:</p>

    <pre>
brew install qemu
</pre>

    <h2>Testing your Installation</h2>
    <p>
      To test your installation, you should be able to compile and run
      xv6. You can try this by following the instructions in the
      <a href="labs/util.html">first lab</a>.
    </p>

    <p>
      You can also double check your installation is correct by
      running the following:
    </p>

    <pre>
$ qemu-system-riscv64 --version
QEMU emulator version 7.2.0
</pre>

    <p>And at least one RISC-V version of GCC:</p>

    <pre>
$ riscv64-linux-gnu-gcc --version
riscv64-linux-gnu-gcc (Debian 10.3.0-8) 10.3.0
...
</pre>

    <pre>
$ riscv64-unknown-elf-gcc --version
riscv64-unknown-elf-gcc (GCC) 10.1.0
...
</pre>

    <pre>
$ riscv64-unknown-linux-gnu-gcc --version
riscv64-unknown-linux-gnu-gcc (GCC) 10.1.0
...
</pre>

    <!-- End Page Content -->
  </div>
</template>

<script>
export default {
  name: 'Tools',
};

function unfoldinstrux(unfold) {
  var e = document.getElementById("installinstrux");
  e.className = unfold ? "foldo" : "foldc";
}

</script>

<style scoped>

.l {
  margin-left: 4em;
}
</style>