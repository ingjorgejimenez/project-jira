import { useContext } from 'react';
import { UIContext } from '@/context/ui';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import EmailIcon from '@mui/icons-material/Email';

const menuItems: String[] = ['inbox', 'Starred', 'Send Email', 'contact'];

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);
  return (
    <Drawer
      anchor='left'
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ padding: '5px 10px' }}>
        <Typography variant='h4'>Menu</Typography>
      </Box>
      <List>
        {menuItems.map((menuItem, index) => (
          <ListItem key={index}>
            <ListItemIcon>{index % 2 ? <InboxIcon /> : <EmailIcon />}</ListItemIcon>
            <ListItemText primary={menuItem} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems.map((menuItem, index) => (
          <ListItem key={index}>
            <ListItemIcon>{index % 2 ? <InboxIcon /> : <EmailIcon />}</ListItemIcon>
            <ListItemText primary={menuItem} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
