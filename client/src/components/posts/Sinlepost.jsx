import React from "react";
import { Button, Card, Col, Row, Badge } from "react-bootstrap";
import ActionButtons from "./ActionButtons";
const Sinlepost = ({ post: { _id, Status, title, description, URL } ,}) => {
  return (
    <Card
      className="shadow"
      border={
        Status === "LEARNED"
          ? "success"
          : Status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                variant={
                  Status === "LEARNED"
                    ? "success"
                    : Status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
              >
                  {Status}
              </Badge>
            </Col>
            <Col className="text-right">
                   <ActionButtons url={URL} _id={_id}/>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Sinlepost;
