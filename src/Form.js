import React , { useEffect}  from 'react';
import TextField from '@mui/material/TextField';
import {Formik} from 'formik'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './Form.css'
import { responsiveFontSizes } from '@mui/material';
function Form() {
    let url = "https://63820c5e9842ca8d3c9fd873.mockapi.io/"
    useEffect( () => {
        axios.get(`${url}/list/`).then(data => console.log(data))
    },[])
    return (
        <div>
            <Formik 
                initialValues={{movieName:"" , language:"" , ratings : 0}}
                validate={(values) => {
                    let errors = {};
                    if(!values.movieName){
                        errors.movieName =  "movieName is required";
                    } 
                    if(!values.language){
                        errors.language =  "Language is required";
                    } 
                    if(!values.ratings){
                        errors.ratings =  "Ratings is required";
                    } 
                    return errors ;
                }}
                onSubmit={(values) =>{
                    axios.post(`${url}/list/`,{values}).then(response => console.log(response))
                }}>
                {({ values , errors , handleSubmit , handleChange}) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <TextField id="standard-basic" label="Movie-name" type="text"
                            variant="standard" value={values.movieName} 
                            name="movieName" onChange={handleChange}/><br/>
                            {errors.movieName ? errors.movieName : ""}<br/>

                            <TextField id="standard-basic" label="Langauge" type="text"
                            variant="standard" value={values.language} 
                            name="language" onChange={handleChange}/><br/>
                            {errors.language ? errors.language : ""}<br/>

                            <TextField id="standard-basic" label="Ratings" type="number"
                            variant="standard" value={values.ratings} 
                            name="ratings" onChange={handleChange}/><br/>
                            {errors.ratings ? errors.ratings : ""}<br/>

                            <Button variant="primary" type="submit" 
                            onSubmit={handleSubmit}>Submit</Button>
                        </form>
                        
                    )
                }}
            </Formik>
        </div>
        
    )
}

export default Form ;