import React from "react";
import { Stack, Divider, Typography } from "@mui/material";

const OrDivider = () => (
  <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 4, mb: 2 }}>
    <Divider sx={{ flex: 1 }} />
    <Typography>or</Typography>
    <Divider sx={{ flex: 1 }} />
  </Stack>
);

export default OrDivider;
