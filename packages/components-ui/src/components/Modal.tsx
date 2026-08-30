import * as React from "react";
import MuiDialog, { type DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

export interface ModalProps extends Omit<MuiDialogProps, "title"> {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  /** Footer content, typically action buttons. */
  actions?: React.ReactNode;
  /** Show the "X" dismiss button in the top-right corner. Defaults to true. */
  showCloseButton?: boolean;
  children?: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  actions,
  showCloseButton = true,
  children,
  ...rest
}: ModalProps) {
  const titleId = React.useId();

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby={title ? titleId : undefined}
      fullWidth
      maxWidth="sm"
      {...rest}
    >
      {title ? (
        <DialogTitle id={titleId} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {title}
          {showCloseButton ? (
            <IconButton aria-label="Close dialog" onClick={onClose} size="small">
              ✕
            </IconButton>
          ) : null}
        </DialogTitle>
      ) : null}
      <DialogContent>{children}</DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </MuiDialog>
  );
}
