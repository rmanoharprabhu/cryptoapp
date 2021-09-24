import React, { useState, useEffect } from "react";
import { Card, Row, Col, Avatar, Spin, Select, Typography } from "antd";
import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

//import { Link } from "react-router-dom";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const defaultNewsCategory = "Cryptocurrency";
  //const [cryptoNews, setCryptoNews] = useState([]);
  const [newsCategory, setNewsCategory] = useState(defaultNewsCategory);
  const { data: cryptoNewsList } = useGetCryptosNewsQuery({
    category: newsCategory,
    count: simplified ? 6 : 12,
  });

  const { data: cryptoCoinList } = useGetCryptosQuery(100);

  console.log(cryptoCoinList);

  //const [searchTerm, setSearchTerm] = useState("");
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  if (!cryptoNewsList?.value) return <Spin />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) > 0
            }
          >
            <Option value="Cryptocurriences">All</Option>
            {cryptoCoinList?.data?.coins.map((coin) => (
              <Option value={coin.name} key={coin.id}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNewsList?.value.map((news, index) => (
        <Col xs={24} small={12} lg={6} className="crypto-card" key={index}>
          <Card className="news-card" hoverable>
            <a href={news.url} target="_blank">
              <div className="news-image-container">
                <Title level={4} className="news-title">
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxheight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                />
              </div>
              <p>
                {news.description > 100
                  ? news.description.subString(0, 100)
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news?.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    size="small"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
      ;
    </Row>
  );
};

export default News;
