import * as React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinkIcon from '@mui/icons-material/Link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from "moment";
import styles from "./EventItem.module.scss";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const EventItem = ({ event }) => {
    const pre = "event-item-";
    const { title, description, featuredImage, tags = [], category, startDate, endDate, duration, promoter, locationName, locationLatitude, locationLongitude, isOffline, isPublic } = event;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <Card className={styles[`${pre}container`]}>
        <CardHeader
            className={styles[`${pre}header`]}
            avatar={
                <Avatar aria-label="recipe">
                    R
                </Avatar>
            }
            // action={
            //     <IconButton aria-label="settings">
            //         <MoreVertIcon />
            //     </IconButton>
            // }
            title={title}
            subheader={<div className={styles[`${pre}subheader`]}><div className={styles[`${pre}row`]}>
                <span>{moment(startDate).format("DD/MM/YYYY")}</span>
                <span><AccessTimeIcon />{duration}</span>
            </div><div className={styles[`${pre}row`]}>
                    <span>{promoter?.name}</span>
                </div></div>}
        />
        <CardMedia
            component="img"
            height="194"
            image={featuredImage || "/hanszimmer.jpg"}
            alt={title}
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
            <Stack direction="row" spacing={1}>
                {tags.map((t, i) => <Chip key={`${t}-${i}`} label={t} variant="outlined" />)}
            </Stack>
        </CardContent>
        <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton> */}
            <IconButton aria-label="share">
                <LinkIcon />
            </IconButton>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                {/* <CardMedia
                    component="img"
                    height="194"
                    image="/hanszimmer.jpg"
                    alt={title}
                /> */}
                {/* <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                    aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                    stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and
                    peppers, and cook without stirring, until most of the liquid is absorbed,
                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                    mussels, tucking them down into the rice, and cook again without
                    stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography> */}
            </CardContent>
        </Collapse>
    </Card>
}

export default EventItem;