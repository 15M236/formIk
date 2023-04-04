import React , { useEffect}  from 'react';
import TextField from '@mui/material/TextField';
import {Formik} from 'formik'
import axios from 'axios';
import { useCallback } from 'react';
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import './Form.css'
import env from '../src/environment'

function Form() {
    const[values,setValues] = useState([])

    const listMovies = useCallback( async() => {
        try {
            let res = await axios.get(`${env.apiurl}/data/`)
            if(res.data.statusCode === 200) {
                setValues(res.data.lists)
                console.log(res.data.lists)
            }
        }catch(err) {
            console.log(err)
        }

    },[])
    useEffect(() =>{
        listMovies()
    },[listMovies]) 

    const updateList = async() => {
        console.log(values)
        try {
            let res = await axios.post(`${env.apiUrl}/data/`,{
                values
            })
            console.log(res)
        }catch(err) {
            console.log(err)
        }   
       
    }

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
                    updateList(values)
                }}>
                {({ values , errors , handleSubmit , handleChange}) => {
                    return (
                        <>
                            <section className="vh-100" style={{"background-color": "#508bfc"}}>
                            <div className="container py-5  h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                        <div className="card shadow-2-strong" style={{"border-radius": "1rem"}}>
                                            <div className="card-body p-2 text-center"></div>
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
                                                    onSubmit={(e) =>handleSubmit(e)}>Submit</Button>    
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>   
                    )
                }}
            </Formik>
        </div>  
    )
}
export default Form ;