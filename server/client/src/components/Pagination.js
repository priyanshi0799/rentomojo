import React from 'react';

const Pagination = ({postsPerPage , totalPosts, paginate}) => {
    const pageNumber = []
    for(let i = 1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumber.push(i)
    }

    return(
        <ul className="pagination">
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            {pageNumber.map(number => (
            <li className="waves-effect" key={number}><a href="#!" onClick={()=>paginate(number)}>{number}</a></li>
            ))}
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul>
    )
}

export default Pagination