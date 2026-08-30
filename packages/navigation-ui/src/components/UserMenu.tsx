import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar } from "@my-org/components-ui";
import { DropdownMenu, type DropdownMenuItem } from "./DropdownMenu";

export interface UserMenuProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  items: DropdownMenuItem[];
}

export function UserMenu({ name, email, avatarUrl, items }: UserMenuProps) {
  return (
    <DropdownMenu
      items={items}
      trigger={
        <ButtonBase
          sx={{ display: "flex", alignItems: "center", gap: 1, borderRadius: 2, px: 1, py: 0.5 }}
          aria-label={`Open menu for ${name}`}
        >
          <Avatar name={name} src={avatarUrl} size="sm" />
          <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "left" }}>
            <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
              {name}
            </Typography>
            {email ? (
              <Typography variant="caption" color="text.secondary" lineHeight={1.2}>
                {email}
              </Typography>
            ) : null}
          </Box>
        </ButtonBase>
      }
    />
  );
}
