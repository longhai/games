function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");
  document.documentElement.style.setProperty(
    "--background-color",
    isDarkMode ? "#202020" : "#e0e5ec"
  );
  document.documentElement.style.setProperty(
    "--outset",
    isDarkMode
      ? "0.1rem 0.1rem 0.1rem #0a0a0a, -0.1rem -0.1rem 0.1rem #3a3a3a"
      : "0.1rem 0.1rem 0.1rem #a3b1c6, -0.1rem -0.1rem 0.1rem #ffffff"
  );
  document.documentElement.style.setProperty(
    "--raised",
    isDarkMode
      ? "inset 0.1rem 0.1rem 0.1rem #3a3a3a,inset -0.1rem -0.1rem 0.1rem #0a0a0a,0.1rem 0.1rem 0.1rem #3a3a3a, -0.1rem -0.1rem 0.1rem #0a0a0a"
      : "inset 0.1rem 0.1rem 0.1rem #ffffff,inset -0.1rem -0.1rem 0.1rem #a3b1c6,0.1rem 0.1rem 0.1rem #ffffff, -0.1rem -0.1rem 0.1rem #a3b1c6"
  );
  document.documentElement.style.setProperty(
    "--inset",
    isDarkMode
      ? "inset 0.1rem 0.1rem 0.1rem #0a0a0a,inset -0.1rem -0.1rem 0.1rem #3a3a3a"
      : "inset 0.1rem 0.1rem 0.1rem #a3b1c6,inset -0.1rem -0.1rem 0.1rem #ffffff"
  );
  document.documentElement.style.setProperty(
    "--sunken",
    isDarkMode
      ? "-0.1rem -0.1rem 0.1rem #0a0a0a,0.1rem 0.1rem 0.1rem #3a3a3a"
      : "-0.1rem -0.1rem 0.1rem #a3b1c6,0.1rem 0.1rem 0.1rem #ffffff"
  );
  document.documentElement.style.setProperty(
    "--ridge",
    isDarkMode
      ? "inset 0.1rem 0.1rem 0.1rem #0a0a0a,inset -0.1rem -0.1rem 0.1rem #3a3a3a,0.1rem 0.1rem 0.1rem #0a0a0a,-0.1rem -0.1rem 0.1rem #3a3a3a"
      : "inset -0.1rem -0.1rem 0.1rem #a3b1c6,inset 0.1rem 0.1rem 0.1rem #ffffff,0.1rem 0.1rem 0.1rem #a3b1c6,-0.1rem -0.1rem 0.1rem #ffffff"
  );
  document.documentElement.style.setProperty(
    "--heart-color",
    isDarkMode ? "#ffffff" : "#ff7025"
  );
  document.documentElement.style.setProperty(
    "--heart-hover-color",
    isDarkMode ? "#ff7025" : "#202020"
  );
}
