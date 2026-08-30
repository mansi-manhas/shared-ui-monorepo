import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Card, Badge, Alert } from "@my-org/components-ui";
import { Breadcrumbs } from "@my-org/navigation-ui";
import { useSession } from "../state/SessionContext";

const STATS = [
  { label: "Active users", value: "2,431", trend: "+12% this month" },
  { label: "Open tickets", value: "18", trend: "-4 since yesterday" },
  { label: "Deploys this week", value: "7", trend: "All green" },
];

export function DashboardPage() {
  const { user } = useSession();

  return (
    <Stack spacing={3}>
      <Breadcrumbs items={[{ label: "Home", href: "/dashboard" }, { label: "Dashboard" }]} />

      <Stack spacing={0.5}>
        <Typography variant="h4" fontWeight={700}>
          Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening across your workspace today.
        </Typography>
      </Stack>

      <Alert variant="info" title="Shared UI packages loaded">
        This dashboard is composed entirely from <code>@my-org/components-ui</code> and{" "}
        <code>@my-org/navigation-ui</code>.
      </Alert>

      <Grid container spacing={2}>
        {STATS.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.label}>
            <Card title={stat.label}>
              <Typography variant="h4" fontWeight={700}>
                {stat.value}
              </Typography>
              <Badge variant="success">{stat.trend}</Badge>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
