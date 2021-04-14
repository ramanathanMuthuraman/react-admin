<Dialog
  onClose={handleClose}
  aria-labelledby="simple-dialog-title"
  open={togglePopup}
  scroll="paper"
>
  <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
  <DialogContent className={classes.dialogContent}>{children}</DialogContent>
</Dialog>;
