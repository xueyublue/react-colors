import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from "@mui/styles";

const styles = {
  ColorBox: {
    width: "20%",
    height: ({ moreButtonUrl }) => (moreButtonUrl ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover button": {
      opacity: "1",
      transition: "0.5s",
    },
  },
  seeMore: {
    color: ({ background }) => (chroma(background).luminance() >= 0.6 ? "rgba(0,0,0,0.7)" : "white"),
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: " center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copiedColor: {
    color: ({ background }) => (chroma(background).luminance() >= 0.6 ? "rgba(0,0,0,0.7)" : "white"),
  },
  colorName: {
    color: ({ background }) => (chroma(background).luminance() <= 0.2 ? "white" : "rgba(0,0,0,0.7)"),
  },
  copyButton: {
    color: ({ background }) => (chroma(background).luminance() >= 0.6 ? "rgba(0,0,0,0.7)" : "white"),
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    border: "none",
    textDecoration: "none",
    opacity: "0",
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)",
  },
  showCopyOverlay: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  copyMsg: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase",
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
  showCopyMsg: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.3s ease-in-out",
    transitionDelay: "0.3s",
  },
};

function ColorBox({ classes, moreButtonUrl, background, name }) {
  const [copied, setCopied] = useState(false);
  return (
    <CopyToClipboard
      text={background}
      onCopy={() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      }}
    >
      <div style={{ background }} className={classes.ColorBox}>
        <div style={{ background }} className={`${classes.copyOverlay} ${copied && classes.showCopyOverlay}`} />
        <div className={`${classes.copyMsg} ${copied && classes.showCopyMsg}`}>
          <h1>Copied!</h1>
          <p className={classes.copiedColor}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {moreButtonUrl && (
          <Link to={moreButtonUrl} onClick={(e) => e.stopPropagation()}>
            <span className={classes.seeMore}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default withStyles(styles)(ColorBox);
