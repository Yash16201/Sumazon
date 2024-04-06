import React from 'react'
import {Link} from 'react-router-dom'


const ProductsCard = (props) => {
    // const {title, imageUrl, description, price} = props
    return (
      <>
      <div className="card" style={{width: '18rem', height: '100%', overflow: 'hidden'}}>
          <div className='card-header'>
            <img className="card-img-top" src={props.imageUrl} alt='' style={{height:"300px"}}/>
          </div>
          <div className="card-body justify-content-center">
              <h5 className="card-title">{props.title}  ${props.price}</h5>
                  <p className="card-text">{props.description}</p>
          </div>
          <div className='card-footer'>
              <Link to={`/product/${props.id}`} className='btn btn-primary'> View Product </Link>
          </div>
      </div>
      </>
    )
}

export default ProductsCard