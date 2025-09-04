document.addEventListener("DOMContentLoaded", () => {
  const KEY = "listado_items";
  const $input = document.getElementById("item");
  const $add = document.getElementById("agregar");
  const $clear = document.getElementById("limpiar");
  const $ul = document.getElementById("contenedor");

  const read = () => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const write = (arr) => {
    localStorage.setItem(KEY, JSON.stringify(arr));
  };

  const render = () => {
    const items = read();
    $ul.innerHTML = "";
    if (items.length === 0) return;
    items.forEach((txt, idx) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.textContent = txt;

      // botón eliminar opcional (opera sobre el array)
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-sm btn-outline-secondary";
      btn.textContent = "Quitar";
      btn.addEventListener("click", () => {
        const arr = read();
        arr.splice(idx, 1);
        write(arr);
        render();
      });

      li.appendChild(btn);
      $ul.appendChild(li);
    });
  };

  $add.addEventListener("click", () => {
    const value = ($input.value || "").trim();
    if (!value) return;
    const items = read();
    items.push(value);
    write(items);
    render();
    $input.value = "";
    $input.focus();
  });

  $input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      $add.click();
    }
  });

  $clear.addEventListener("click", () => {
    localStorage.removeItem(KEY);
    render();
    $input.focus();
  });

  render();
});