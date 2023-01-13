import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import s from './SearchBar.module.css';

export default function SearcBar({paginationReset}) {

  const [nameProduct, setNameProduct] = useState('');
  const [optionList, setOptionList] = useState([])
  const dispatch = useDispatch()
  const productList = useSelector(state => state.allProducts)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.searchProduct(nameProduct));
    setOptionList(prevstate => []);
    paginationReset();
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    setNameProduct(e.target.value)
    if (e.target.value.length > 3){
      let listTitle = productList.filter(product => {
        let nameProduct = product.title.toLowerCase();
        return nameProduct.includes(e.target.value.toLowerCase());
      })
      let listDesc = productList.filter(product => {
        let nameProduct = product.description.toLowerCase();
        return nameProduct.includes(e.target.value.toLowerCase());
      })
      let listBrand = productList.filter(product => {
        let nameProduct = product.brand.toLowerCase();
        return nameProduct.includes(e.target.value.toLowerCase());
      })
      const listTotal = listTitle.concat(listDesc.concat(listBrand))
      const setTotal = new Set(listTotal)
      const listOptions = Array.from(setTotal)
      setOptionList(prevstate => listOptions);
    } else {
      setOptionList(prevstate => []);
    }
  }

const handleOption = (e) => {
  e.preventDefault();
  setNameProduct(e.target.innerText)
}

  return (
    <div className={s.container}>
      <form className={s.formSearch} onSubmit={e => handleSubmit(e)}>
        <input className={s.name} type="text" placeholder="Search for products or brands..." value={nameProduct}
          onChange={e => handleOnChange(e)} />
        <button className={s.alpha} type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className={s.divOptions}>
        <ol className={s.listoptions}>
          {
            optionList?.map( (product, index) => (
              <li className={s.option} key={index} value={product.title} onClick={e => handleOption(e)}>{product.title}</li>
            ))
          }
        </ol>
      </div>
    </div>

  )  

}