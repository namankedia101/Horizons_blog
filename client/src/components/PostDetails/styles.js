import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    root:{
        display: "flex",
        flexDirection:"column",
        
    },
    heading:{
        color:"#000",
        marginTop:"5rem",
        marginBottom:"1.5rem",
        marginLeft:"2.5rem",
        borderLeft:"3px solid yellow"
    },
    message:{
        color: "#000",
        marginTop:"4rem",
        marginBottom:"3rem",
        marginLeft:"2.5rem",
        width: "70%"
    },
    date:{
        color: "#808080",
        marginLeft:"3rem"
    },
    postImg:{
        width:"60%",
        height:"40%",
        marginLeft:"3rem"
    },
    "@media(max-width:768px)":{
        root:{
            zoom:"70%",
        },
        postImg:{
            width:"80%",
            height:"30%"
        }
    }
}))