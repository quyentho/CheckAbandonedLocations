import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { StyledNav } from "./NavBar.styled";
function NavBar() {
  const { pathname } = useLocation();
  return (
    <StyledNav>
      <Nav variant="tabs" activeKey={pathname} as="ul">
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/">
            Kiểm tra địa chỉ
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/add">
            Thêm địa chỉ bị cấm
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </StyledNav>
  );
}

export default NavBar;
