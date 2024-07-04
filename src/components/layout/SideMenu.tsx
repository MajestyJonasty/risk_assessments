import { Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { theme } from "./theme";

export const SideMenu = () => {
  const activeStyle = {
    color: theme.palette.primary.main,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    width: "210%",
    padding: "10px",
    transition: "background-color 1.2s ease, color 0.3s ease",
  };

  const linkStyle = {
    width: "50px",
    height: "50px",
  };

  return (
    <Toolbar
      sx={{
        flexDirection: "column",
        height: "100vh",
        width: "93px",
        gap: "32px",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <NavLink
        to={"/"}
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        <img src="/images/home.png" alt="home" width={50} height={50} />
      </NavLink>
      <NavLink
        to={"/materials"}
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        <img
          src="/images/material.png"
          alt="materials"
          width={50}
          height={50}
        />
      </NavLink>

      <NavLink
        to={"/riskassessments"}
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        <img
          src="/images/dokument.png"
          alt="riskassessments"
          width={50}
          height={50}
        />
      </NavLink>
      <NavLink
        to={"/settings"}
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        <img
          src="/images/einstellungen.png"
          alt="settings"
          width={50}
          height={50}
        />
      </NavLink>
    </Toolbar>
  );
};
