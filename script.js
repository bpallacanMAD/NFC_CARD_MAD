const contactos = {
    alvaro: {
        nombre: "Álvaro Ramírez",
        cargo: "Representante legal",
        telefono: "+56991263306",
        correo: "aramirez@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/alvaro.jpeg"
    },

    roberto: {
        nombre: "Roberto Sánchez",
        cargo: "Subgerente de ingeniería y desarrollo",
        telefono: "+56940756036",
        correo: "rsanchez@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/roberto.jpeg"
    },

    diego: {
        nombre: "Diego Ramírez",
        cargo: "Gerente de ingeniería y operaciones",
        telefono: "+56969199425",
        correo: "dramirez@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/diego.jpg"
    },

    nicolas: {
        nombre: "Nicolás Carmona",
        cargo: "Ingeniero de investigación",
        telefono: "+56978091887",
        correo: "ncarmona@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/nicolas.jpeg"
    },

    carlos: {
        nombre: "Carlos Bernal",
        cargo: "Ingeniero de servicios",
        telefono: "+56998146061",
        correo: "cbernal@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/carlos.jpeg"
    },

    americo: {
        nombre: "Américo Leal",
        cargo: "Ingeniero de proyectos",
        telefono: "+56986720254",
        correo: "aleal@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/americo.JPG"
    },

    hector: {
        nombre: "Héctor Borquez",
        cargo: "Ingeniero de proyectos",
        telefono: "+56968715083",
        correo: "hborquez@madchile.cl",
        ubicacion: "Quillota, Chile",
        foto: "assets/hector.jpeg"
    }
};

const empresa = "MAD S.A.";
const web = "https://www.madchile.cl/";

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

    // Área: se oculta si el trabajador no tiene
    const area = document.getElementById("employee-area");

    if (contacto.area) {
        area.textContent = contacto.area;
    } else {
        area.style.display = "none";
    }

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
        this.onerror = null;
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
