import Dropdown from 'react-bootstrap/Dropdown'
import { Button} from 'react-bootstrap'

const UsersDropdown = ({rangeOfDates}) => {

    // console.log("Users Dropdown range of dates: ", rangeOfDates)

    return(
        <Dropdown>

            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Vendedor
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Diego</Dropdown.Item>
                <Dropdown.Item href="#/action-2">David</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Raul</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Raul</Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    )

}

export default UsersDropdown