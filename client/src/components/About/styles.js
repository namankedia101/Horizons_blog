import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    root:{
        position: "absolute",
        top:"50%",
        bottom:"50%",
        display: "flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
    constr:{
        color: "#000",
        justifyContent:"center",
    }
}))