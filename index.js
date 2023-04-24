import React from "react";
import { createRoot } from "react-dom/client";
import "Style/main.scss";

import App from "Components/App";

const cont = document.getElementById("root");
const root = createRoot(cont);
root.render(<App />);
