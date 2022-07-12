import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { UIContext } from "../../context/ui";
const menuList: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {

  const { sideMenuOpen, closeSidebar } = useContext(UIContext)

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSidebar}>
      <Box sx={{ width: "250px" }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>

        <List>
          {menuList.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 ? <EmailIcon /> : <SendIcon />}
              </ListItemIcon>
              <ListItemText>{item}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuList.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 ? <EmailIcon /> : <SendIcon />}
              </ListItemIcon>
              <ListItemText>{item}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
