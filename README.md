# 💎 Jewelry Store

![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?logo=vite\&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.5-38B2AC?logo=tailwindcss\&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.3-FF9900?logo=react\&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.24.3-purple?logo=zod\&logoColor=white)
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-based-black)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Link-informational?style=flat\&logo=vercel)](https://jewelry-store-sigma.vercel.app/)

> 💡 Modern eCommerce web app for a jewelry store built with React, TypeScript, Zustand, Zod, ShadCN UI and TailwindCSS.

---

## 🔥 Features

* 🛒 Full-featured jewelry eCommerce UI
* 💎 Product catalog with filtering, sorting, pagination and masonry layout
* 📱 Responsive design and modern animations
* 📦 Basket, wishlist, order pages
* 🔐 Authentication (login/register/logout)
* 📄 Profile update with token refresh support
* ⚙️ Global API handler with typed `request()` function
* 🧩 Modular component architecture
* 📚 Zod for form validation
* 💨 TailwindCSS + custom animations
* 🎯 Zustand for lightweight global state management
* 🧪 ESlint + Prettier + Husky for clean code

---

## 🛠️ Stack

| Technology            | Purpose                             |
| --------------------- | ----------------------------------- |
| **React 19**          | UI library                          |
| **TypeScript**        | Static typing                       |
| **Vite**              | Development bundler                 |
| **Tailwind CSS**      | Styling & layout                    |
| **Zustand**           | Global state (auth, wishlist, etc.) |
| **Zod**               | Schema validation                   |
| **ShadCN UI**         | UI components                       |
| **React Router**      | Navigation                          |
| **Axios**             | HTTP requests                       |
| **Swiper**            | Carousels/sliders                   |
| **react-masonry-css** | Product masonry layout              |

---

## 📁 Folder Structure (Key Parts)

```
src/
├── api/               # Axios instance, request function
├── components/        # Reusable UI components
├── features/          # Feature folders (auth, products, etc)
├── hooks/             # Custom hooks
├── layouts/           # Page layouts
├── pages/             # Route pages
├── schemas/           # Zod form schemas
├── store/             # Zustand stores
├── styles/            # Global styles
├── utils/             # Helpers (e.g. catchErrorCodes)
└── main.tsx           # App entry point
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/SergSvet87/jewelry-store.git
cd jewelry-store
npm install
npm run dev
```

---

## 👤 Author

Created with ❤️ by [**Serhii Svitlychniy**](mailto:svitlychnyi.frontdev@gmail.com)

> Feel free to reach out or contribute!

---

## 📜 License

[MIT](LICENSE)
