import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import {useParams} from 'react-router-dom';
import '../App.css'

const CreateAccount = () => {
    const _id = useParams();

    
    
    const usehistory = useHistory();
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [dob,setDob] = useState('');

    const submitData = () => {
        if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
            return M.toast({html: 'Invalid email',classes:"red darken-1"})
        }

        if(name.length < 4){
            return M.toast({html: 'Name should be ateast 4 characters long',classes:"red darken-1"})
        }

        if(!(/^\d{10}$/).test(phone) || !(phone.length==10)){
            return M.toast({html: 'Invalid Phone number',classes:"red darken-1"})
        }
        fetch('/senddata',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                dob: dob
            })
        }).then(res=>res.json)
        .then((data)=>{
            if(data.error){
                M.toast({html: 'Error',classes:"red darken-1"})
            }
            else{
                M.toast({html: 'Success',classes:"green lighten"})
                usehistory.push('/home');
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const updateData = () => {
        
        fetch(`/update/${_id.id}`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                _id:_id,
                name: name,
                email: email,
                phone: phone,
                dob: dob
            })
        }).then(res=>res.json)
        .then(data=>{
            console.log(data)
            usehistory.push('/home')
        }).catch(err=>{
            console.log(err)
        })
    }
    

    return(
        <div className="container">
            <h5 style={{textAlign:'center'}}>Add details in Phone Book</h5>
            <div className="mycard">
            <div className="card subcard">
            <input type='text'
                style={{margin:6}}
                value={name}
                placeholder='Enter the Name'
                onChange={(e)=>setName(e.target.value)}
            />
            <input type='text'
                style={{margin:6}}
                value={phone}
                placeholder='Enter the Phone'
                onChange={(e)=>setPhone(e.target.value)}
            />
            <input type='text' style={{margin:6}}
                label='Email'
                value={email}
                placeholder='Enter the Email'
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input type='text' style={{margin:6}}
                label='Date of Birth'
                value={dob}
                placeholder='Enter the Date of Birth'
                onChange={(e)=>setDob(e.target.value)}
            />
            {_id.id  ? 
            
            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>updateData()}>Update
            <i className="material-icons right">send</i>
            </button>
            :
            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>submitData()}>Submit
                <i className="material-icons right">send</i>
            </button>
}
            </div>
            </div>
            
        </div>
    )
}

export default CreateAccount