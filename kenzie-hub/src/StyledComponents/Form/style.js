import styled  from "styled-components"
const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    padding: 30px;
    border-radius: 5px;
    margin: 10px;
    background: rgba( 255, 255, 255, 0.35 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 16px );
    -webkit-backdrop-filter: blur( 16px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    text-align: center;
    width: 100%;
    h1{
        font-size:25px;
    }
    a{
        text-decoration:none
    }
    a:visited{
        color: white
    }
    
    span:hover{
       color:darkgrey;
    }
    
    p{
        color:red
    }
    @media screen and (min-width:768px){
        max-width: 400px;
       
    }
`
export default Formulario