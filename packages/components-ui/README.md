# @mansi-manhas/components-ui

Generic, accessible UI primitives shared across our applications. Thin, opinionated wrappers around [MUI](https://mui.com/material-ui/) so every app gets the same look, behavior, and accessibility baseline without depending on MUI's API directly.

## Installation

```sh
pnpm add @mansi-manhas/components-ui
```

Peer dependencies (must be installed by the consuming app):

```sh
pnpm add react react-dom @mui/material @emotion/react @emotion/styled react-router-dom
```

Wrap your app in a MUI `ThemeProvider` (and `CssBaseline` for consistent resets):

```tsx
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

<ThemeProvider theme={theme}>
  <CssBaseline />
  <App />
</ThemeProvider>;
```

## Usage

```tsx
import { Button, Input, Modal } from "@mansi-manhas/components-ui";

function Example() {
  return (
    <>
      <Input label="Email" type="email" helperText="We'll never share your email." />
      <Button variant="primary" size="lg">
        Continue
      </Button>
    </>
  );
}
```

## Available components

| Component | Notes |
| --- | --- |
| `Button` | `variant`: `primary` \| `secondary` \| `danger` \| `ghost`. `size`: `sm` \| `md` \| `lg`. Supports `loading` and `disabled`. |
| `Input` | Label, `errorMessage`, `helperText`, `disabled`. Wraps MUI `TextField`. |
| `Select` | `options: { label, value, disabled? }[]`, optional `placeholder`. |
| `Checkbox` | `label`, `errorMessage`, `helperText`. |
| `Radio` | Renders a labeled radio group from `options`. |
| `Modal` | Controlled dialog with `open`, `onClose`, `title`, `actions`. |
| `Card` | `title`, `subtitle`, `headerAction`, `actions`. |
| `Badge` | Status pill. `variant`: `default` \| `success` \| `warning` \| `error` \| `info`. |
| `Alert` | Inline banner. `variant`: `info` \| `success` \| `warning` \| `error`, optional `onDismiss`. |
| `Spinner` | Loading indicator. `size`: `sm` \| `md` \| `lg` or a number. |
| `Avatar` | Image avatar with initials fallback derived from `name`. |
| `Tooltip` | Wraps MUI `Tooltip`; content is passed via `content` instead of `title`. |

Every component forwards `className`/`sx` and any native/MUI props it doesn't explicitly override, so you can customize styling without forking the component.

## Scripts

```sh
pnpm --filter @mansi-manhas/components-ui build       # tsup -> dist (cjs + esm + d.ts)
pnpm --filter @mansi-manhas/components-ui dev         # tsup --watch
pnpm --filter @mansi-manhas/components-ui typecheck   # tsc --noEmit
```
