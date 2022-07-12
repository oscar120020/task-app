import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';

export const Navbar = () => {

  const { openSidebar } = useContext(UIContext);

  return (
    <AppBar position='sticky' >
        <Toolbar>
            <IconButton
                size='large'
                edge="start"
                onClick={openSidebar}
            >
                <MenuIcon/>
            </IconButton>
            <NextLink href={"/"} passHref>
              <Link underline='none' color="white" >
                <Typography variant='h6' component={"h1"} >OpenJira</Typography>
              </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
