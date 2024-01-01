import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import GlobalStyles from "./styles/GlobalStyles.tsx"
import { theme } from "./styles/Theme.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "styled-components"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
