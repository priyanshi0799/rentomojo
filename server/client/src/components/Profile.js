import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../App.css'
import {useParams} from 'react-router-dom';

const Profile = () => {
    const usehistory = useHistory();
    const [data,setData] = useState([])
    const _id = useParams();

    const fetchData = () => {
        
        fetch(`/get-data/${_id.id}`)
        .then(res=>res.json())
        .then(data=>{
            setData(data)
            // setLoading(false)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    const deleteData = () => {
        fetch(`/delete/${_id.id}`,{
            method:'delete'
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            
            
            usehistory.push('/home')
        })
    }

    
    return(
        <div className="container">
            <h5 style={{textAlign:'center'}}>Detail of {data.name}</h5>
            <div className="mycard">
                <div className="card subcardP">
                    <div>
                        <i className="medium material-icons">account_box</i>
                        <h6 style={{flexDirection:'row'}}>{data.name}</h6>
                    </div>
                    <div>
                        <i className="medium material-icons">date_range</i>
                        <h6 style={{flexDirection:'row'}}>{data.dob}</h6>
                    </div>
                    <div>
                        <i className="medium material-icons">contact_phone</i>
                        <h6>{data.phone}</h6>
                    </div>
                    <div>
                        <i className="medium material-icons">contact_mail</i>
                        <h6>{data.email}</h6>
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                <Link to={`/createaccount/${data._id}`} ><button className="btn waves-effect waves-light" type="submit" name="action">Edit
                    <i className="material-icons">create</i>
                </button></Link>
                </div>
                <div style={{textAlign:'center', marginTop:10}}>
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>deleteData()}>Delete
                    <i className="material-icons">delete</i>
                </button>
                </div>
            </div>
            
        </div>
    )
    
}

export default Profile