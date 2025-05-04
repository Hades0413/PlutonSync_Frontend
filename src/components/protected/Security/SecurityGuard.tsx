// src/components/security/SecurityGuard.tsx
import { useEffect } from "react";

function SecurityGuard() {
  useEffect(() => {
    // Advertencias en consola
    setTimeout(() => {
      console.log(
        "%c¡ALTO! 🚨",
        "font-size: 40px; color: red; font-weight: bold;"
      );
      console.log(
        "%cSi alguien te pidió que pegues algo aquí, podría ser una estafa.",
        "font-size: 18px; color: black;"
      );
      console.log(
        "%cNo pegues scripts que no entiendas. ¡Tu cuenta podría estar en peligro!",
        "font-size: 16px; color: gray;"
      );
      console.log(
        "%cAl pegar algo aquí, debes de saber que se enviará con tu IP por temas de seguridad, así que, por favor, ¡No lo hagas!",
        "font-size: 16px; color: gray;"
      );
    }, 1000);

    // Detección de DevTools por tamaño de ventana
    const checkDevTools = setInterval(() => {
      const threshold = 160;
      const devToolsOpened =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;

      if (devToolsOpened) {
        alert("🚨 ¡DevTools detectado! Cierra la consola por seguridad.");
      }
    }, 1000);

    // Bloqueo de teclas (F12, Ctrl+Shift+I/J/U/C/K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey &&
          e.shiftKey &&
          ["I", "J", "C", "K", "U"].includes(e.key)) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    // Bloqueo del clic derecho
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Detectar escritura de caracteres sospechosos
    const handleInput = (e: KeyboardEvent) => {
      const forbiddenChars = /[<>]/; // Detecta caracteres como < y >
      if (forbiddenChars.test(e.key)) {
        alert(
          "🚨 ¡Caracteres sospechosos detectados! No puedes escribir código."
        );
        e.preventDefault(); // Prevenir la escritura de estos caracteres
      }
    };

    // Monitorizar todo el documento
    document.addEventListener("keydown", handleInput);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    // Limpiar los event listeners cuando el componente se desmonte
    return () => {
      clearInterval(checkDevTools);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleInput);
    };
  }, []);

  return null;
}

export default SecurityGuard;
