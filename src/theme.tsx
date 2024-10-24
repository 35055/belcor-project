import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "light", // Установите начальный режим (light или dark)
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    // Добавьте темную тему
    background: {
      default: "#fff", // Цвет фона для светлой темы
      paper: "#fff", // Цвет бумаги для светлой темы
    },
    // Темная тема
    dark: {
      background: {
        default: "#121212", // Цвет фона для темной темы
        paper: "#1d1d1d", // Цвет бумаги для темной темы
      },
      // Добавьте другие настройки для темной темы, если нужно
    },
  },
});

export default theme;
