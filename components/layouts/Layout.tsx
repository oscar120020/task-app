import { Box } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { Navbar, Sidebar } from '../ui'

interface Props {
    title?: string,
    children: JSX.Element | JSX.Element[]
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout = ({title = "OpenJira", children}: Props) => {
  return (
    <Box sx={{flexFlow: 1}}>
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title ? `${title.substring(0, 10)}...` : "Task application"} />
            <meta
              property="og:description"
              content={title ? `${title.substring(0, 18)}...` : "Task application"}
            />
            <meta property="og:image" content={`${origin}/images/task-app.png`} />
        </Head>

        <Navbar/>
        <Sidebar/>

        <Box sx={{padding: "10px 20px"}}>
          {children}
        </Box>
    </Box>
  )
}
