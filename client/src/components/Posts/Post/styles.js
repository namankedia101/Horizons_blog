import { makeStyles } from "@material-ui/core/styles";

export default makeStyles ((theme)=>({
    root: {
        display: 'flex',
        flexDirection:"row",
        width: "60vw",
        boxShadow:" -13px 1px 0px 0px rgb(255 255 0/ 50%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%)",
        borderRadius:"0"
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap:"wrap"
      },
      content: {
        display: 'flex',
        flex: '1 0 auto',
        flexWrap:"wrap"
      },
      cover: {
        width: "60%",
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      playIcon: {
        height: 38,
        width: 38,
      },
      message:{
        display: "flex",
        marginTop:"1.5rem",
        marginRight:".7rem",
        padding:"0",
        flexWrap:"wrap"
      },
    "@media(max-width:768px)":{
        root:{
          height: "20vh",
        },
        date:{
          fontSize:".5rem"
        },
        message:{
          display: "none",
          flexWrap:"wrap"
        },
        title:{
          fontSize:"1.6rem"
        }
    }
}))