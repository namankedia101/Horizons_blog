import { makeStyles } from "@material-ui/core/styles";
import heroImage from "../../images/milky-way-1030765_1920.jpg";

export default makeStyles((theme)=>({
    root:{
        maxWidth:"none",
        padding:"0",
        display:"flex",
        flexDirection:"row",
        width:"fit-content",
        margin: "0",
    },
    hero:{
      display: "flex",
      flexDirection:"column",
      marginTop:"7rem",
      justifyContent:"center",
      alignItems:"center",
      "& .MuiTypography-h4":{
        marginTop:"2rem"
      }
    },
    left:{
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        height: "100vh",
        width: "70vw",
        maxWidth:"none",
        padding:"0",
        position: "relative",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
    },
    paper: {
        width: "30vw",
        marginTop: "3rem",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow:"none"
      },
      avatar: {
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        marginTop: theme.spacing(3),
        justifyContent:"center",
        alignContent:"center",
      },
      items:{
          width:"auto",
          marginBottom:"2rem",
          display: "flex",
          flexDirection:"column",
          marginLeft:"auto",
          marginRight:"auto",
          justifyContent:"center",
          alignItems:"center"
      },
      signup:{
          display: "flex",
          flexDirection:"column",
          justifyContent:"center",
          padding: "0"
      },
      switch:{
          display: "flex",
          textTransform:"none"
      },
      googleButton: {
        marginBottom: theme.spacing(2),
      },
      button:{
        textTransform:"none",
      },
      h4:{
        marginTop:"2rem",
        marginBottom:"3rem"
      },
      "@media(max-width:768px)":{
        left:{
          display: "none"
        },
        hero:{
          marginTop:"4rem",
        },
        root:{
          margin: "auto",
          zoom:"90%"
        },
        paper:{
          marginTop:"1rem",
        },
        items: {
          marginBottom: "1.7rem",
        }
    }
}))