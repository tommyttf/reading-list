import { AppBar, Toolbar, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { MenuBook } from "@mui/icons-material";

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          columns={{ md: 12 }}
        >
          <MenuBook style={{ verticalAlign: "middle", marginRight: "0.2em" }} />
          <Typography>Reading List</Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
