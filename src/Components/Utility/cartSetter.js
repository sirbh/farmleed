import * as CartActions from '../../Store/cartActions'
import axios from '../Utility/axios'

export default (currentCart,fetchedCart,dispatch,token)=>
{
  console.log(currentCart)
  if(!currentCart.totalItems)
  {
    if(!fetchedCart.totalItems)
    {
      
      return Promise.resolve('Unset')
    }
    else
    {
      console.log('I am here',fetchedCart)
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