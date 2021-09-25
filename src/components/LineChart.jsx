import React from "react";
import { Line } from "react-chartjs-2";
import { Row, Col, Typography } from "antd";
import millify from "millify";

const { Title } = Typography;

const LineChart = ({ history, price, name }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < history?.data?.history.length; i++) {
    coinPrice.push(history?.data?.history[i]?.price);

    coinTimeStamp.push(
      new Date(history?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  //   for (let i = 0; i < history?.data?.history.length; i++) {
  //     coinTimeStamp.push(
  //       new Date(history?.data?.history[i].timestamp).toLocaleDateString()
  //     );
  //   }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {name} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {history?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current: {name} Price: ${millify(price)}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
