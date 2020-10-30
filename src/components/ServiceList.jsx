import React from "react";
import { Col } from "react-bootstrap";

export default function ServiceList(props) {
  const { heading, services } = props;
  return (
    <Col md="auto" className=" pt-3 m-1 ">
      <span className="listHeading">{heading.replace(/[^a-z]/gi, "")}</span>

      <ul className="list-unstyled">
        {services.map((service, i) => (
          <li key={i}>
            <hr className="hr-big" />
            <span className="listTitle">{service.title}</span>
            <hr className="hr-small" />
            <ul className="list-unstyled">
              {/* priceType represents the current element of the prices array within the service obj */}
              {service.prices.map((priceType, i) => (
                <li
                  className="listPrices"
                  key={priceType.id + priceType["price"]}>
                  <span className="money">${priceType["price"]}</span>{" "}
                  {priceType["serviceType"]}
                </li>
              ))}
              {service.other.length > 1 && (
                <li
                  key={service._id + service.other.length}
                  className="listPrices">
                  {service.other}
                </li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </Col>
  );
}
