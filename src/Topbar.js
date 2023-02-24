import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Topbar = () => {
    return (
        <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand>GitHub Organizations Explorer</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            Created By: <a href="https://github.com/RitulKumawat">Ritul Kumawat</a>
            </Navbar.Text>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Topbar;