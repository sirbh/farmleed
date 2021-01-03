import * as CartActions from '../../Store/cartActions'
import axios from '../Utility/axios'

export default (currentCart,fetchedCart,dispatch,token)=>
{
 
  if(!currentCart.totalItems)
  {
    if(!fetchedCart.totalItems)
    {
      
      return Promise.resolve('Unset')
    }
    else
    {
      
      dispatch(CartActions.setCart(fetchedCart))
      return Promise.resolve('Cart Set')
    }
  }
  else
  {

      return axios.post('/setcart',{cart:currentCart},{headers:{
        Authorization:'Bearer '+token
      }})

  }
}