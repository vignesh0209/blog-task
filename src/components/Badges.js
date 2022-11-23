import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';

const Badges = ({ children, styleInfo}) => {

    const colorkey = {
        Fashion:"primary",
        Travel:"success",
        Fitness:"danger",
        Food:"warning",
        Tech:"info",
        Sports:"dark"

    }
  return (
    <h5 style={styleInfo}>
        <MDBBadge color={colorkey[children]}>{children}</MDBBadge>
    </h5>
  )
}

export default Badges