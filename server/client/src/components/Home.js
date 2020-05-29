import React,{useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';
import M from 'materialize-css';
import '../App.css'


const Home = () => {
    const sortJsonArray = require('sort-json-array')

    const searchModal = useRef(null)

    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])
    
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true) 
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(4) 
    const [search, setSearch] = useState('')  
    const [searchDetails, setSearchDetails] = useState([])

    const fetchData = () => {
        fetch('/home')
        .then(res=>res.json())
        .then(data=>{
            setData(data)
            setLoading(false)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    //get current posts
    const indexOfLastPost = currentPage*postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost)

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const fetchUser = (query) => {
        setSearch(query)
        fetch('/search',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                query
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(typeof data)
            sortJsonArray(data.data,'name','asc')
            setSearchDetails(data.data)
        }).catch(err=>{
            console.log(err)
        })
    }    

    return(
        <div className="container">
            <h5 style={{textAlign:'center'}}>RM-PhoneBook</h5>
            
            <i data-target="modal1" className="medium material-icons modal-trigger" style={{float:'right', marginBottom:'20px'}}>search</i>
            {
                currentPosts.map(item=>{
                    return(
                        <div className="mycard" key={item._id}>
                            <Link to={`/profile/${item._id}`} style={{color:'black'}}>
                                <div className="card subcard">
                                <h6 style={{textAlign:"left"}}>{item.name}</h6>
                            </div>
                            </Link>       
                        </div>
                    )
                })
            }
            <Pagination postsPerPage={postsPerPage} totalPosts = {data.length} paginate={paginate}/>
            <Link to='/createaccount' className="btn-floating btn-large waves-effect waves-light green" style={{float:'right'}}><i className="large material-icons">add</i></Link>
            
            <div id="modal1" className="modal" ref={searchModal}>
                <div className="modal-content">
                    <input type='text'
                        style={{margin:6}}
                        value={search}
                        placeholder='Enter the Phone number to search'
                        onChange={(e)=>fetchUser(e.target.value)}
                    />
                    <ul className="collection">
                        {searchDetails.map(item=>(
                            <Link to={`/profile/${item._id}`} style={{color:'black'}}><li className="collection-item" key={item._id}>{item.name}</li></Link>
                        ))}
                        
                    </ul>
                </div>
                <div className="modal-footer">
                <button href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearchDetails([])}>Close</button>
                </div>
            </div>
        </div>
            
    )

}

export default Home