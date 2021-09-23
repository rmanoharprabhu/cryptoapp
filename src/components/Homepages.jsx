import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Spin } from "antd";
import { Link } from "react-router-dom";
import { Cryptocurriences, News } from "../components";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title } = Typography;

const Homepages = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Spin />;

  //console.log(data);

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Curriences"
            value={millify(globalStats.total)}
          />
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
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Crypto Curriences
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptoCurriences">Show More</Link>
        </Title>
      </div>
      <Cryptocurriences simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepages;
