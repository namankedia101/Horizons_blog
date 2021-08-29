import { makeStyles } from "@material-ui/core/styles";
import heroImage from "../../images/milky-way-1030765_1920.jpg";

export default makeStyles((theme)=>({
    formContainer:{
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        height: "100vh",
        maxWidth:"none",
        padding:"0",
        position: "relative",
        overflowX:"hidden"
    },
    paper:{
        display: "flex",
        marginTop:theme.spacing(20),
        justifyContent: 'center',
        padding: "2rem",
        width: "fit-content",
        marginLeft:"auto",
        marginRight:"auto"
    },
    form: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
      },
    title:{
        marginTop:theme.spacing(3),
    },   
    content:{
        marginTop:theme.spacing(1.5),
    },
    fileInput:{
        marginTop:theme.spacing(2),
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
    },
    file:{
        marginRight:theme.spacing(3),
    },
    button:{
        width: "80%",
        marginTop:theme.spacing(2),
    },
    "@media(max-width:768px)":{
        paper:{
            zoom:"70%"
        }
    }
}))