// src/app/layout.js
import Head from "next/head";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Pantry Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Container maxWidth="md">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Pantry Tracker</Typography>
            </Toolbar>
          </AppBar>
          {children}
        </Container>
      </body>
    </html>
  );
}
