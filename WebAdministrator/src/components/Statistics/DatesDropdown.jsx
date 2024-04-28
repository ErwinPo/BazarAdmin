import Dropdown from 'react-bootstrap/Dropdown'
import { Button} from 'react-bootstrap'

const DatesDropdown = () => {

    return(
        <Dropdown>

            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Rango de Fechas
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">1 día</Dropdown.Item>
                <Dropdown.Item href="#/action-2">7 días</Dropdown.Item>
                <Dropdown.Item href="#/action-3">15 días</Dropdown.Item>
                <Dropdown.Item href="#/action-3">30 días</Dropdown.Item>
                <Dropdown.Item href="#/action-3">6 meses</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Personalizar</Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">
                    <Button>Aplicar Cambios</Button>
                </Dropdown.Item>

            </Dropdown.Menu>

        </Dropdown>
    )

}

export default DatesDropdown