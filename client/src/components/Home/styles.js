import { makeStyles } from "@material-ui/core/styles";
import heroImage from "../../images/milky-way-1030765_1920.jpg";

export default makeStyles((theme)=>({
    root:{
        maxWidth:"none",
        overflowX:"hidden",
        padding:"0",
        position: "relative",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
    },
    hero:{
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        height: "100vh",
        maxWidth:"none",
        padding:"0",
        position: "relative",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
        margin: "0",
        boxSizing:"inherit"
    },
    mobileHero:{
        display: "flex",
        flexDirection:"column",
        alignItems:"center"
    },
    posts:{
        marginTop:"2rem"
    },
    pagination:{
        marginBottom:"1.5rem",
        marginTop:"3rem",
        boxShadow:"none"
    },
    heroH5:{
        marginTop:"2rem",
        marginLeft:"3rem"
    },
    "@media(max-width:768px)":{
        mobileHero:{
            zoom:"70%",
        }
    },
    "@media(max-width:612px)":{
        mobileHero:{
            zoom:"55%",
        }
    }
}))