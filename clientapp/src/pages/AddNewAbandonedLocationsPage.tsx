import { useFormik } from "formik";
import { useState } from "react";
import { BiError } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { splitByEndLine } from "../utils/splitByEndLine";

export const AddNewAbandonedLocationsPage = () => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      locations: "",
    },
    async onSubmit(values, formikHelpers) {
      const locations = splitByEndLine(values.locations);
      try {
        const response = await fetch("/api/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locations: locations }),
        });

        if (response.ok) {
          setIsSuccess(true);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
    },
  });
  return (
    <Container>
      <Row className="position-relative">
        <ToastContainer position="top-end">
          <Toast
            bg="success"
            onClose={() => setIsSuccess(false)}
            show={isSuccess}
            delay={1000}
            autohide
          >
            <Toast.Header closeButton={true} style={{ gap: "0.4rem" }}>
              <GrStatusGood className="mr-2"></GrStatusGood>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>Thành công</Toast.Body>
          </Toast>
          <Toast
            bg="danger"
            onClose={() => setIsError(false)}
            show={isError}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={true} style={{ gap: "0.4rem" }}>
              <BiError></BiError>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>Có gì đó sai sai</Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Row>
              <Col md={{ offset: 3, span: 6 }}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="locations">
                    Nhập địa chỉ bị cấm:
                  </Form.Label>
                  <Form.Control
                    id="locations"
                    name="locations"
                    value={formik.values.locations}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    as="textarea"
                    rows={10}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button size="lg" type="submit">
                    Lưu
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
