import React from 'react';
// import { Link } from 'react-router-dom'
import '../styles/Home.css'
const Pagination = ({ limit, totalItem, paginate,page, left, right,start,last }) => {
  const pageNumbers = [];
  var totalPage=Math.ceil(totalItem / limit);
  var window=3;
  var maxLeft=page- Math.floor(window/2);
  var maxRight=page+  Math.floor(window/2);
  if(maxLeft<1){
    maxLeft=1;
    maxRight=window;

  }
  if(maxRight>totalPage){
    maxLeft= totalPage-(window -1)
    if(maxLeft<1){
      maxLeft=1;

    }
    maxRight=totalPage

  }
  
  for (let i = maxLeft; i <=maxRight; i++) {
    pageNumbers.push(i);
  }
  let active="page-item active"
  let inactive="page-item"
  return (
    <nav>
      <ul className='pagination  justify-content-center' >
        {totalItem>1 && page!== 1?
           <>
              <button style={{ display: "inline-block", textAlign:"center", "height": "35px",width:"40px" ,marginRight:"5px" }} type="button" className="btn btn-info" onClick={start} > &laquo;  </button>
           <button style={{ display: "inline-block", textAlign:"center", "height": "35px",width:"40px" ,marginRight:"5px"}} type="button" className="btn btn-info" onClick={left} ><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
        
 </>
:<></>
      }
       {maxLeft===1?
        <></>:
          <button style={{ textAlign:"center", "height": "35px",width:"30px" }} onClick={paginate}disabled className='page-link'>
          ...
             
           </button>
      }
        
        {pageNumbers.map(number => (
       
          <li  key={number} className={number===page?active:inactive}>
            {number===page?
              <button style={{ textAlign:"center", "height": "35px",width:"40px" }} onClick={paginate} disabled id={number} className='page-link'>
              {number}

            </button>:
              <button style={{ textAlign:"center", "height": "35px",width:"40px" }} onClick={paginate} id={number} className='page-link'>
              {number}

            </button>
          }
          
  
          </li>

        ))}
        {maxRight===totalPage?
        <></>:
          <button style={{ textAlign:"center", "height": "35px",width:"30px" }} onClick={paginate}disabled className='page-link'>
          ...
             
           </button>
      }
        
           {totalItem>1 && page!== totalPage?
           <>
          <button style={{ display: "inline-block", textAlign:"center", "height": "35px",width:"40px" ,marginLeft:"5px"}} type="button" className="btn btn-info" onClick={right} ><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
          <button style={{ display: "inline-block", textAlign:"center", "height": "35px",width:"40px" ,marginLeft:"5px"}} type="button" className="btn btn-info" onClick={last} > &raquo;</button>
</>
:<></>
      }
     
      </ul>
    </nav>
  );
};
export default Pagination;