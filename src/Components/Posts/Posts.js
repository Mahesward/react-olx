import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { useHistory } from "react-router-dom";

import Heart from '../../assets/Heart';
import './Post.css';
import { db } from '../../firebase/config';
import { PostContext } from '../../store/PostContext';


function Posts() {

  const [products, setProducts] = useState([])
  const history = useHistory()
  const {setPostDetails} = useContext(PostContext)

  useEffect(() => {

    getDocs(collection(db, "products")).then((querySnapshot) => {

      const allPost = querySnapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost);
      console.log(products);
    })
  }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map(products => (

              <div className="card"
              onClick={()=>{
                setPostDetails(products)
                history.push('/viewpost')
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={products.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; 250000</p>
                  <span className="kilometer">{products.category}</span>
                  <p className="name">{products.name}</p>
                </div>
                <div className="date"> 
                  <span>{products.createdAt }</span>
                </div>
              </div>

            ))
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
