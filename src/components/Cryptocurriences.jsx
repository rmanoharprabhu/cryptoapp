import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Spin } from "antd";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurriences = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    //setCryptos(cryptoList?.data?.coins);

    const filteredList = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredList);
  }, [searchTerm, cryptoList]);

  if (isFetching) return <Spin />;

  //console.log(cryptos);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto Currency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            small={12}
            lg={6}
            className="crypto-card"
            key={currency.id}
          >
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name} ${currency.symbol}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="Crypto"
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Rank: {millify(currency.rank)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurriences;
