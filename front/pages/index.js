import React, { useEffect, useState } from "react";
import axios from "axios";
import { Descriptions } from "antd";
import styled from "styled-components";

const DivStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemStyled = styled.div`
  margin: 50px 30px 20px 30px;
`;

const TitleStyled = styled.div`
  margin-top: 50px;
  font-size: 30px;
  font-weight: 900;
  color: darkblue;
`;

const home = () => {
  const [movieLists, setMovieLists] = useState([]);

  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
        {
          params: {
            key: "f5eef3421c602c6cb7ea224104795888",
            targetDt: formattedDate,
          },
        }
      );

      const movies = response.data.boxOfficeResult.dailyBoxOfficeList;

      setMovieLists(movies);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DivStyled>
      <TitleStyled>{`${year}년 ${month}월 ${day}일 박스오피스`}</TitleStyled>
      {movieLists ? (
        movieLists.map((data, index) => (
          <ItemStyled key={index}>
            <Descriptions
              title={`${data.movieNm}`}
              bordered
              items={[
                {
                  label: "순위",
                  children: `${data.rank}위`,
                },

                {
                  label: "신규 진입 여부",
                  children: `${data.rankOldAndNew === "NEW" ? "신규" : "기존"}`,
                },
                {
                  label: "개봉일",
                  children: data.openDt,
                },

                {
                  label: "일일 관객수",
                  children: `${data.audiCnt}명`,
                },
                {
                  label: "누적 관객수",
                  children: `${data.audiAcc}명`,
                },
                {
                  label: "매출액",
                  children: `${data.salesAcc}원`,
                },
              ]}
            />
          </ItemStyled>
        ))
      ) : (
        <></>
      )}
    </DivStyled>
  );
};

export default home;
