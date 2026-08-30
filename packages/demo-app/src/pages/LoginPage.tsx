import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { LoginForm, type LoginFormData, type SocialProvider } from "@mansi-manhas/auth-ui";
import { useSession } from "../state/SessionContext";

export function LoginPage() {
  const { user, login } = useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (data: LoginFormData) => {
    setErrorMessage(undefined);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    login(data.email);
    navigate("/dashboard");
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    login(`demo@${provider}.example.com`);
    navigate("/dashboard");
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
        <LoginForm
          onSubmit={handleSubmit}
          onForgotPassword={() => navigate("/forgot-password")}
          onSocialLogin={handleSocialLogin}
          loading={loading}
          errorMessage={errorMessage}
        />
      </Paper>
    </Box>
  );
}
