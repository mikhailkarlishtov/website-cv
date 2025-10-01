  let name = sessionStorage.getItem("username");
  let greeted = sessionStorage.getItem("greeted");

  if (!name) {

    name = prompt("Enter your name:");
    if (name) {
      sessionStorage.setItem("username", name);
    }
  }

  if (name && !greeted) {

    alert("Hello, " + name + "! Welcome To Webspace!");
    sessionStorage.setItem("greeted", "yes");
  }

      (function () {
      const notifyEl = document.getElementById('notify');
      let notifyTimer = null;

      function notify(msg, ms = 1800) {
        if (notifyTimer) {
          clearTimeout(notifyTimer);
          notifyTimer = null;
        }
        notifyEl.textContent = msg;
        notifyEl.style.display = 'block';
        notifyTimer = setTimeout(() => {
          notifyEl.style.display = 'none';
        }, ms);
      }

      document.querySelectorAll('a, p, h1, h2, h3, h4, h5, h6, span, div').forEach(function(element) {
        element.style.cursor = 'default';
      });

      // 1) Nonaktifkan klik kanan
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        notify('Klik kanan dinonaktifkan.');
        return false;
      });

      document.addEventListener('selectstart', function (e) {
        e.preventDefault();
      });

      // 2) Tangkap keydown untuk kombinasi umum
      document.addEventListener('keydown', function (e) {
        // Normalisasi key dan flags
        const key = e.key || String.fromCharCode(e.keyCode || e.which);
        const isCtrl = e.ctrlKey || false;
        const isShift = e.shiftKey || false;
        const isAlt = e.altKey || false;
        const isMeta = e.metaKey || false; // Cmd on macOS

        // Daftar kombinasi yang ingin diblok
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
          e.preventDefault();
          notify('Aksi F12 dinonaktifkan.');
          return false;
        }

        // Ctrl/Cmd + U (view source)
        if ((isCtrl || isMeta) && (key === 'u' || key === 'U' || e.keyCode === 85)) {
          e.preventDefault();
          notify('Lihat sumber dinonaktifkan.');
          return false;
        }

        // Ctrl/Cmd + S (save page)
        if ((isCtrl || isMeta) && (key === 's' || key === 'S' || e.keyCode === 83)) {
          e.preventDefault();
          notify('Simpan halaman dinonaktifkan.');
          return false;
        }

        // Ctrl/Cmd + P (print)
        if ((isCtrl || isMeta) && (key === 'p' || key === 'P' || e.keyCode === 80)) {
          e.preventDefault();
          notify('Cetak dinonaktifkan.');
          return false;
        }

        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
        if ((isCtrl || isMeta) && isShift && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c')) {
          e.preventDefault();
          notify('Buka DevTools dinonaktifkan.');
          return false;
        }

        // Ctrl+Shift+C spesifik (Inspect element selection)
        if ((isCtrl || isMeta) && isShift && (e.keyCode === 67)) {
          e.preventDefault();
          notify('Buka DevTools dinonaktifkan.');
          return false;
        }

        // Optional: blok Ctrl+Shift+K (Firefox console) atau Ctrl+K (beberapa browser)
        if ((isCtrl || isMeta) && (isShift && (e.keyCode === 75)) ) {
          e.preventDefault();
          notify('Aksi dinonaktifkan.');
          return false;
        }
      });

      // 3) Mencegah drag & drop file ke laman (agar file lokal tidak otomatis dibuka)
      window.addEventListener('dragover', function (e) {
        e.preventDefault();
      }, false);
      window.addEventListener('drop', function (e) {
        e.preventDefault();
      }, false);

      // 4) (Penjelasan kecil) - deteksi DevTools tidak dapat diandalkan
      // Kita tidak mencoba hack deteksi devtools di sini karena metode tersebut mudah dielakkan.
      // Cukup beri catatan bahwa ini hanya penghalang bagi pengguna awam.
    })();
