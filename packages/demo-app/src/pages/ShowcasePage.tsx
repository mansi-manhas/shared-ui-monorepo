import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
  Modal,
  Card,
  Badge,
  Alert,
  Spinner,
  Avatar,
  Tooltip,
  type ButtonVariant,
} from "@mansi-manhas/components-ui";
import { Breadcrumbs, Tabs } from "@mansi-manhas/navigation-ui";

const BUTTON_VARIANTS: ButtonVariant[] = ["primary", "secondary", "danger", "ghost"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card title={title}>
      <Stack spacing={2}>{children}</Stack>
    </Card>
  );
}

export function ShowcasePage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("weekly");
  const [tab, setTab] = React.useState("buttons");

  return (
    <Stack spacing={3}>
      <Breadcrumbs items={[{ label: "Home", href: "/dashboard" }, { label: "Components" }]} />

      <Stack spacing={0.5}>
        <Typography variant="h4" fontWeight={700}>
          Component showcase
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A live gallery of every primitive exported from <code>@mansi-manhas/components-ui</code>.
        </Typography>
      </Stack>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "buttons", label: "Buttons & feedback" },
          { value: "forms", label: "Form controls" },
          { value: "surfaces", label: "Surfaces" },
        ]}
      />

      {tab === "buttons" ? (
        <Stack spacing={3}>
          <Section title="Button variants & sizes">
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {BUTTON_VARIANTS.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </Stack>
          </Section>

          <Section title="Alerts">
            <Alert variant="info">Informational message.</Alert>
            <Alert variant="success">Something worked as expected.</Alert>
            <Alert variant="warning">Take a closer look before continuing.</Alert>
            <Alert variant="error" title="Something went wrong">
              The request could not be completed.
            </Alert>
          </Section>

          <Section title="Badges & spinner">
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </Stack>
          </Section>
        </Stack>
      ) : null}

      {tab === "forms" ? (
        <Stack spacing={3}>
          <Section title="Input">
            <Input label="Full name" placeholder="Ada Lovelace" />
            <Input label="Email" helperText="We'll never share your email." />
            <Input label="Username" errorMessage="This username is already taken" />
            <Input label="Disabled field" disabled value="Read only" />
          </Section>

          <Section title="Select & checkbox">
            <Select
              label="Role"
              placeholder="Choose a role"
              options={[
                { label: "Viewer", value: "viewer" },
                { label: "Editor", value: "editor" },
                { label: "Admin", value: "admin" },
              ]}
            />
            <Checkbox label="Email me about product updates" defaultChecked />
          </Section>

          <Section title="Radio group">
            <Radio
              label="Digest frequency"
              value={radioValue}
              onChange={(event) => setRadioValue(event.target.value)}
              options={[
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
              ]}
            />
          </Section>
        </Stack>
      ) : null}

      {tab === "surfaces" ? (
        <Stack spacing={3}>
          <Section title="Avatars & tooltip">
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar name="Ada Lovelace" size="sm" />
              <Avatar name="Grace Hopper" size="md" />
              <Avatar name="Alan Turing" size="lg" />
              <Tooltip content="Tooltips describe what an element does">
                <span tabIndex={0}>Hover or focus me</span>
              </Tooltip>
            </Stack>
          </Section>

          <Section title="Modal">
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Invite a teammate"
              actions={
                <>
                  <Button variant="ghost" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setModalOpen(false)}>
                    Send invite
                  </Button>
                </>
              }
            >
              <Input label="Email address" placeholder="teammate@example.com" />
            </Modal>
          </Section>
        </Stack>
      ) : null}
    </Stack>
  );
}
