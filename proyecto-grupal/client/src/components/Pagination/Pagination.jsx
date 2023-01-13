import React from "react";
import s from './Pagination.module.css';


export default function Pagination({pageSize, totalProducts, page, pagination}) {
  const pageNumbers= [];

  for (let i = 1; i <= Math.ceil(totalProducts/pageSize); i++) {
    pageNumbers.push(i);  
  }

  let lastPage = Math.ceil(totalProducts/pageSize);

  return (
    <div className={s.pagination}>
      { page > 1 && 
        <i className={"fa-solid fa-circle-left"} onClick={()=> pagination('back')}></i>
       
      }
      <div><input className={s.page} type="number" value={page} readOnly/></div>
      <div><span className={s.p_page}>of</span></div>
      <div><input className={s.page} type="number" value={lastPage} readOnly/></div>
      { page < lastPage && 
        <i className={"fa-solid fa-circle-right"} onClick={()=> pagination('next')}></i>
      }
    </div>
  )
  
}