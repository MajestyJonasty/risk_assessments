import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { SideMenu } from "./components/layout/SideMenu";
import { ThemeProvider } from "@mui/material";
import { theme } from "./components/layout/theme";

export function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className="flex">
        <SideMenu />
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
