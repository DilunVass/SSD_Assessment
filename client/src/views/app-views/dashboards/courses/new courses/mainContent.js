import React from 'react';
import { Box, Toolbar, Typography, Button, Card, CardContent, CardActions } from '@mui/material';

const drawerWidth = 240;

function MainContent() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingTop: 8,
        // marginLeft: '100px', // Adjust marginLeft if necessary
      }}
    >
      <Toolbar />
      <Typography variant="h4" component="h1" gutterBottom>
        Course Title
      </Typography>
      <Card sx={{ maxWidth: 645, mb: 2 }}>
        <div style={{ overflow: 'hidden', paddingTop: '56.25%', position: 'relative' }}>
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            src="https://www.youtube.com/embed/0u0UFWrUDss"
            title="Course Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Introduction to the Course
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a description of the course. It can be extended to include any information that is relevant and informative to the user. This section is great for a more in-depth look at what the course will cover.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Mark as Completed
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default MainContent;