import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ForgotPasswordForm, type ForgotPasswordFormData } from "@my-org/auth-ui";

export function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | undefined>();

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    setSuccessMessage(`If an account exists for ${data.email}, a reset link has been sent.`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey.50",
        p: 2,
      }}
    >
      <Paper variant="outlined" sx={{ p: 4, width: "100%", maxWidth: 420 }}>
        <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} successMessage={successMessage} />
      </Paper>
    </Box>
  );
}
