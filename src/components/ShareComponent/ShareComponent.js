import React, { useEffect } from 'react'
import Api from "../../helpers/api";
import Box from '@material-ui/core/Box';
import {
    EmailShareButton,
    FacebookShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
    faFacebook,
    faTumblr,
    faWhatsapp,
    faTelegram,
    faTwitter,
    faReddit
} from '@fortawesome/free-brands-svg-icons'

export default function ShareComponent(props) {
    const [shortUrl, setShortUrl] = React.useState(window.location.href);

    const headers = {
        'Authorization': `Bearer ${process.env.REACT_APP_BITLY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    };

    const body = {
        "long_url": window.location.href,
        "group_guid": process.env.REACT_APP_BITLY_ACCESS_GROUP
    }

    useEffect(() => {
        if (!Api.isDev()) {
            fetch("https://api-ssl.bitly.com/v4/shorten", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => setShortUrl(res.link))
        }
    }, [])

    return (
        <Dialog open={props.dialogOpen} style={{ padding: 10 }}>
            <DialogTitle>Comparte tu ficha de personaje</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    value={window.location.href}
                    label={'Enlace'}
                    InputProps={{
                        endAdornment:
                            <IconButton
                                onClick={() => navigator.clipboard.writeText(shortUrl)}>
                                <FileCopyIcon />
                            </IconButton>
                    }}
                />
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <EmailShareButton
                        subject={'¡Mira mi ficha de personaje!'}
                        url={window.location.href}
                        body={"¡Mira el personaje que he creado en Lierno App!"}
                    >
                        <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir por email
                        </EmailShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <TwitterShareButton
                        url={window.location.href}
                        title={'¡Mira mi ficha de personaje!'}
                        hashtags={["dnd", "charactersheet"]}>
                        <FontAwesomeIcon icon={faTwitter} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Twitter
                        </TwitterShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <TelegramShareButton
                        url={window.location.href}
                        title={'¡Mira mi ficha de personaje!'}>
                        <FontAwesomeIcon icon={faTelegram} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir por Telegram
                        </TelegramShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <WhatsappShareButton
                        url={window.location.href}
                        title={'¡Mira mi ficha de personaje!'}>
                        <FontAwesomeIcon icon={faWhatsapp} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir por Whatsapp
                        </WhatsappShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <TumblrShareButton
                        url={window.location.href}
                        title={'¡Mira mi ficha de personaje!'}
                        tags={["d&d", "character sheet"]}>
                        <FontAwesomeIcon icon={faTumblr} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Tumblr
                        </TumblrShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <FacebookShareButton
                        url={window.location.href}
                        quote={'¡Mira mi ficha de personaje!'}
                        hashtag={"#dnd"}>
                        <FontAwesomeIcon icon={faFacebook} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Facebook
                        </FacebookShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <RedditShareButton
                        url={"window.location.href"}
                        title={'¡Mira mi ficha de personaje!'}>
                        <FontAwesomeIcon icon={faReddit} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Reddit
                        </RedditShareButton>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.openDialogFunc(!props.dialogOpen)} color="default">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
