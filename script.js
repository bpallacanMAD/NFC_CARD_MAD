const contactos = {
    alvaro: {
        nombre: "Álvaro Ramírez",
        cargo: "Cargo del trabajador",
        area: "Área correspondiente",
        telefono: "+56991263306",
        correo: "aramirez@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/alvaro.jpg"
    },

    roberto: {
        nombre: "Roberto Sánchez",
        cargo: "Cargo del trabajador",
        area: "Área correspondiente",
        telefono: "+56940756036",
        correo: "rsanchez@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/roberto.jpg"
    },

    diego: {
        nombre: "Diego Ramírez",
        cargo: "Cargo del trabajador",
        area: "Área correspondiente",
        telefono: "+56969199425",
        correo: "dramirez@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/diego.jpg"
    },

    nicolas: {
        nombre: "Nicolás Carmona",
        cargo: "Cargo del trabajador",
        area: "Área correspondiente",
        telefono: "+56978091887",
        correo: "ncarmona@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/nicolas.jpg"
    },

    carlos: {
        nombre: "Carlos Bernal",
        cargo: "Cargo del trabajador",
        area: "Área correspondiente",
        telefono: "+56998146061",
        correo: "cbernal@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/carlos.jpg"
    },

    americo: {
        nombre: "Américo Leal",
        cargo: "Cargo del trabajador",
        area: "Área correspondiente",
        telefono: "+56986720254",
        correo: "aleal@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/americo.jpg"
    },

    hector: {
        nombre: "Héctor Borquez",
        cargo: "Cargo del trabajador",
        area: "Área correspondiente",
        telefono: "+56968715083",
        correo: "hborquez@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/hector.jpg"
    },

    bastian: {
        nombre: "Bastián Pallacán",
        cargo: "Ingeniero Informático",
        area: "Área correspondiente",
        telefono: "+569XXXXXXXX",
        correo: "correo@ejemplo.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/bastian.jpg"
    }
};

const empresa = "MAD S.A.";
const web = "https://www.madchile.cl/";
const direccion = "https://maps.app.goo.gl/iKqvHbX65T27GB5F7";

// Identificar contacto desde la URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const contacto = contactos[id];

if (!contacto) {

    document.querySelector(".profile-container").innerHTML = `
        <div style="text-align:center;padding:80px 20px;">
            <h1>Contacto no encontrado</h1>
            <p>Verifica el enlace de tu tarjeta NFC.</p>
            <a href="${web}">Visitar MAD S.A.</a>
        </div>
    `;

} else {

    // Información principal
    document.title = `${contacto.nombre} | MAD S.A.`;

    document.getElementById("employee-name").textContent =
        contacto.nombre;

    document.getElementById("employee-position").textContent =
        contacto.cargo;

    document.getElementById("employee-area").textContent =
        contacto.area;

    document.getElementById("employee-description").textContent =
        contacto.descripcion || descripcionBase;

    document.getElementById("employee-email").textContent =
        contacto.correo;

    document.getElementById("employee-phone").textContent =
        contacto.telefono;

    document.getElementById("employee-location").textContent =
        contacto.ubicacion;

    // Fotografía
    const foto = document.getElementById("employee-photo");

    foto.src = contacto.foto;

    foto.onerror = function() {
        this.src = "assets/default-profile.png";
    };

    // Enlaces de contacto
    document.getElementById("email-button").href =
        `mailto:${contacto.correo}`;

    document.getElementById("phone-button").href =
        `tel:${contacto.telefono}`;

    document.getElementById("whatsapp-button").href =
        `https://wa.me/${contacto.telefono.replace(/\D/g, "")}`;

    // LinkedIn: ocultar si no hay enlace
    const linkedin = document.getElementById("linkedin-button");

    if (contacto.linkedin) {
        linkedin.href = contacto.linkedin;
    } else {
        linkedin.style.display = "none";
    }

    // Generar archivo VCF
    function descargarContacto() {

        const partes = contacto.nombre.trim().split(/\s+/);
        const apellido = partes.pop();
        const nombre = partes.join(" ");

        const escapar = valor => String(valor || "")
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/,/g, "\\,")
            .replace(/;/g, "\\;");

        const vcf = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `N:${escapar(apellido)};${escapar(nombre)};;;`,
            `FN:${escapar(contacto.nombre)}`,
            `ORG:${escapar(empresa)}`,
            `TITLE:${escapar(contacto.cargo)}`,
            `TEL;TYPE=CELL:${escapar(contacto.telefono)}`,
            `EMAIL;TYPE=WORK:${escapar(contacto.correo)}`,
            `URL:${web}`,
            "END:VCARD"
        ].join("\r\n");

        const archivo = new Blob(
            [vcf],
            { type: "text/vcard;charset=utf-8" }
        );

        const url = URL.createObjectURL(archivo);
        const enlace = document.createElement("a");

        enlace.href = url;
        enlace.download = `${id}.vcf`;

        document.body.appendChild(enlace);
        enlace.click();
        enlace.remove();

        URL.revokeObjectURL(url);
    }

    document.getElementById("download-contact")
        .addEventListener("click", descargarContacto);

    document.getElementById("download-contact-bottom")
        .addEventListener("click", descargarContacto);
}
