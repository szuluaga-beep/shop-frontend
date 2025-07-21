

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/szuluaga-beep/shop-frontend.git
   cd shop-frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

---

## ⚙️ Configuración de entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido (puedes modificar la URL según tu backend):

```env
VITE_API_URL=http://localhost:3000/api
```

---

## ▶️ ¿Cómo funciona la app?

Esta aplicación es una tienda en línea construida con React, TypeScript y Vite. Permite:

- Visualizar productos disponibles.
- Agregar productos al carrito.
- Realizar pagos simulados mediante un formulario.
- Ver el resumen de la compra y el estado del pago.

La comunicación con el backend se realiza a través de la URL definida en `VITE_API_URL`.

Para iniciar la app en modo desarrollo:

```bash
npm run dev
```

Luego abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🚀 Tecnologías

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)

---

<div align="center">
  <sub>Hecho con ❤️ por Steven Zuluaga Cortés</sub>
</div>
