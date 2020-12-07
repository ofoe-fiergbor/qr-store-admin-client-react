import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const MerchantCard = ({ data }) => {
    // console.log(data)
    return (

        <div className='cardContainer'>
            <Card.Group>
                <Card fluid color='pink' header={data.name} as={Link} to={`/merchants/${data.id}`} />
            </Card.Group>
        </div>
    )

}
export default MerchantCard