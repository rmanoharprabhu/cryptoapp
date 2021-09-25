import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select, Spin } from "antd";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const Cryptodetails = () => {
  const { coinid } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinid);
  const { data: coinHistory } = useGetCryptoHistoryQuery(coinid);
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Spin />;

  console.log(coinHistory);

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.slug}) Price: $
          {millify(cryptoDetails.price)}
        </Title>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timePeriod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date, index) => (
          <Option key={index} value={date}>
            {date}
          </Option>
        ))}
      </Select>
      <LineChart
        history={coinHistory}
        price={cryptoDetails.price}
        name={cryptoDetails.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <div className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </div>
            <p>Statistics for the {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ icon, title, value, index }) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Other Statistics
            </Title>
            <p>Other statistics for the {cryptoDetails.name}</p>
          </Col>
          {genericStats.map(({ icon, title, value, index }) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={5} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link, index) => (
            <Row className="coin-links" key={index}>
              <Title level={5} className="link-name">
                {link.type} &nbsp;
              </Title>
              <a href={link.name} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default Cryptodetails;
