import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Spin } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title } = Typography;

const Homepages = () => {
  const { data, isFetching } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;
  if (isFetching) return <Spin />;

  console.log(data);

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Services
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Curriences" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="24h Markets"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
    </>
  );
};

export default Homepages;
