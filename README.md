# **Commerce CIPH3R**

**Commerce CIPH3R** es una aplicación web de comercio electrónico desarrollada utilizando **Vue 3** y **Pinia** para gestionar el estado de los productos y usuarios. Esta aplicación consume una API de tienda en línea para mostrar productos organizados por categorías y permite a los usuarios registrarse, iniciar sesión y realizar búsquedas de productos.

## **Tecnologías Utilizadas**

- **Vue 3**: Framework JavaScript para el desarrollo de la interfaz de usuario utilizando la Composition API.
- **Pinia**: Manejo del estado global para gestionar los datos del usuario y productos.
- **Vue Router**: Para la navegación entre páginas.
- **Vite**: Herramienta de construcción para un desarrollo rápido y eficiente.
- **TypeScript**: Para garantizar la calidad y robustez del código.
- **TailwindCSS**: Framework CSS para un diseño limpio y responsivo.

## **Características**

- **Consumo de API**: La aplicación consume los siguientes endpoints de la API de la tienda en línea:
  - **Productos**: Muestra una lista de productos con sus respectivas categorías.
  - **Categorías**: Permite filtrar productos por categorías.
  - **Login y Registro**: Funcionalidad para registrar nuevos usuarios e iniciar sesión.
- **Búsqueda y Filtro de Productos**: Los usuarios pueden buscar productos por nombre o categoría.
- **Agregar al Carrito**: Los usuarios pueden agregar productos al carrito (funcionalidad pendiente de implementación).
- **Responsividad**: La aplicación está diseñada para adaptarse a diferentes tamaños de pantalla.

## **Instalación**

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local.

### **Clonar el repositorio**

```bash
git clone https://github.com/Albert-Valdemora/Commerce-Ciph3r.git
```

### **Instalar dependencias**

```bash
cd commerce-ciph3r
npm install
```

### **Ejecutar la aplicación en desarrollo**

```bash
npm run dev
```
