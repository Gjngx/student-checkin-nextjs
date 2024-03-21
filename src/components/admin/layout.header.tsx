'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function AdminLayoutHeader() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary navbar-dark bg-dark">
        <Container>
          <Navbar.Brand href="/admin">Student checkin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ display: "flex", justifyContent: 'space-between' }} >
            <Nav className="me-auto">
              <Link className="nav-link" href="/admin">Trang chủ</Link>
              <NavDropdown title="Quản lý" id="basic-nav-dropdown">
                <Link className="dropdown-item" href="/admin/courses">Môn học</Link>
                <Link className="dropdown-item" href="/admin/aclasses">Lớp học</Link>
                <Link className="dropdown-item" href="/admin/rooms">Phòng học</Link>
                <Link className="dropdown-item" href="/admin/teachers">Giảng viên</Link>
                <Link className="dropdown-item" href="/admin/students">Sinh viên</Link>

              </NavDropdown>
            </Nav>
            <Button variant="danger"> Đăng xuất</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminLayoutHeader;