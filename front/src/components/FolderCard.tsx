import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DeleteForever, EditTwoTone } from '@mui/icons-material';
import { File, Folder } from '../types/userFile.types';

export function FolderCard({ folder }: { folder: Folder | undefined }) {
  return (
    <Grid sx={{ borderRadius: 4, width: 225, height: 250 }} key={folder?.id}>
      <Card sx={{ width: 225, height: 250 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://raffle-management-develop.s3.eu-north-1.amazonaws.com/pngtree-vector-folder-icon-png-image_3997397.jpg"
        />
        <CardContent sx={{ height: 40, p: 1 }}>
          <Typography
            variant="body2"
            sx={{
              wordWrap: 'break-word',
              overflow: 'hidden',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              display: '-webkit-box'
            }}>
            {folder?.folderInsideName}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'space-between',
            pb: 1
          }}>
          <Button>Share</Button>
          <Button>
            <EditTwoTone />
          </Button>
          <Button>
            <DeleteForever />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
