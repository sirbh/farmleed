import axios from 'axios'

export default axios.create(
    {
        baseURL:'https://farmleed.herokuapp.com/'
    }
)