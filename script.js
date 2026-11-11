
const contactos = {
    alvaro: {
        nombre: "Álvaro Ramírez",
        telefono: "+56991263306",
        correo: "aramirez@madchile.cl"
    },
    roberto: {
        nombre: "Roberto Sánchez",
        telefono: "+56940756036",
        correo: "rsanchez@madchile.cl"
    },
    diego: {
        nombre: "Diego Ramírez",
        telefono: "+56969199425",
        correo: "dramirez@madchile.cl"
    },
    nicolas: {
        nombre: "Nicolás Carmona",
        telefono: "+56978091887",
        correo: "ncarmona@madchile.cl"
    },
    carlos: {
        nombre: "Carlos Bernal",
        telefono: "+56998146061",
        correo: "cbernal@madchile.cl"
    },
    americo: {
        nombre: "Américo Leal",
        telefono: "+56986720254",
        correo: "aleal@madchile.cl"
    },
    hector: {
        nombre: "Héctor Borquez",
        telefono: "+56968715083",
        correo: "hborquez@madchile.cl"
    }
};

const empresa = "MAD S.A.";
const web = "https://www.madchile.cl/";
const direccion = "https://maps.app.goo.gl/iKqvHbX65T27GB5F7";

// Identificar el contacto mediante la URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const contacto = contactos[id];

if (!contacto) {
    document.querySelector(".card").innerHTML = `
        <h1>Contacto no encontrado</h1>
        <p>Verifica el enlace de tu tarjeta NFC.</p>
    `;
} else {

    // Mostrar información
    document.title = contacto.nombre + " | MAD S.A.";

    document.getElementById("name").textContent =
        contacto.nombre;

    const phone = document.getElementById("phone");
    phone.href = "tel:" + contacto.telefono;
    phone.textContent = "📞 " + contacto.telefono;

    const email = document.getElementById("email");
    email.href = "mailto:" + contacto.correo;
    email.textContent = "✉️ " + contacto.correo;

    document.getElementById("website").href = web;
    document.getElementById("map").href = direccion;

    // Generar contacto VCF
    document.getElementById("saveContact").addEventListener(
        "click",
        function(event) {
            event.preventDefault();

            const partes = contacto.nombre.split(" ");
            const apellido = partes.pop();
            const nombre = partes.join(" ");

            const vcf = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `N:${apellido};${nombre};;;`,
                `FN:${contacto.nombre}`,
                `ORG:${empresa}`,
                `TEL;TYPE=CELL:${contacto.telefono}`,
                `EMAIL:${contacto.correo}`,
                `URL:${web}`,
                `ADR;TYPE=WORK:;;;;;;`,
                "END:VCARD"
            ].join("\r\n");

            const archivo = new Blob(
                [vcf],
                { type: "text/vcard;charset=utf-8" }
            );

            const url = URL.createObjectURL(archivo);
            const enlace = document.createElement("a");

            enlace.href = url;
            enlace.download = id + ".vcf";
            enlace.click();

            URL.revokeObjectURL(url);
        }
    );
}
