import { makeStyles } from "@material-ui/core/styles";

export default makeStyles ((theme)=>({
    appBar:{
        display: "flex",
        flexDirection: 'row',
        boxShadow:"none",
        justifyContent:"space-between"
    },
    items:{
        color: (props) => props.color,
        textDecoration:"none",
        marginRight:"1rem",
        "&:hover":{
            cursor:"pointer",
            textDecoration:"underline"
        }
    },
    brand:{
        color: (props) => props.color,
        textDecoration:"none",
        "&:hover":{
            cursor:"pointer",
            textDecoration:"underline"
        }
    },
    MuiDrawer: {
        backgroundColor: "#040720"
      },
      dItems:{
        color:"#fff",
        textDecoration:"none",
        marginRight:"1rem",
    },
    menuIcon:{color: (props) => props.color,}
}))