// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos el formulario del HTML
  const form = document.querySelector(".form__group");

  // Escuchamos el evento submit (cuando el usuario hace clic en "Registrarse")
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Obtenemos todos los valores ingresados por el usuario
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasenas = document.getElementById("password").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const departamento = document.getElementById("departamento").value.trim();
    const codigo_postal = document.getElementById("codigo_postal").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const observaciones = document.getElementById("observaciones").value.trim();

    // Validamos que todos los campos obligatorios estén llenos
    if (!nombre || !correo || !contrasenas || !ciudad || !departamento || !codigo_postal || !direccion) {
      alert("Por favor completa todos los campos obligatorios.");
      return; // No continúa si hay campos vacíos
    }

    try {
      // Creamos el objeto de usuario que se enviará al backend
      const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        contrasena: contrasenas,
        id_rol: 3, // Por defecto el nuevo usuario es 'cliente' (id_rol = 3)
        estado: "Activo"
      };
      console.log(JSON.stringify(nuevoUsuario));
      
      // Enviamos la petición POST para registrar el usuario
      const resUsuario = await fetch("http://localhost:8080/helder/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoUsuario)
      });

      // Revisamos si la respuesta es correcta
      if (!resUsuario.ok) {
        throw new Error("No se pudo registrar el usuario.");
      }

      // Obtenemos el usuario recién creado
      const usuarioCreado = await resUsuario.json();
      const id_usuario_creado = usuarioCreado.id_usuario; // Necesitamos este ID para la dirección
console.log(`Usuario creado con ID: ${id_usuario_creado}`);

      // Creamos el objeto de dirección
      const nuevaDireccion = {
        id_usuario: id_usuario_creado,
        direccion: direccion,
        ciudad: ciudad,
        departamento: departamento,
        codigo_postal: codigo_postal,
        observaciones: observaciones
      };
         console.log(nuevaDireccion);
   

      // Enviamos la petición POST para registrar la dirección
      const resDireccion = await fetch("http://localhost:8080/helder/api/direcciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaDireccion)
      });

      if (!resDireccion.ok) {
        throw new Error("El usuario fue creado pero no se pudo registrar la dirección.");
      }

      // Si todo salió bien, mostramos mensaje y limpiamos el formulario
      alert("¡Registro exitoso!");
      form.reset(); // Limpia todos los campos

    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Ocurrió un error durante el registro. Inténtalo de nuevo.");
    }
  });
});
// Fin del script de registro
// Este script maneja el registro de nuevos usuarios y sus direcciones en la aplicación.