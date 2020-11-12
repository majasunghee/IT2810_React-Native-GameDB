import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import Pagination from './src/components/Pagination';



export default function App() {

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");
    const [pageNum, setPageNum] = useState(1);


    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

    const pageResults = games.length;  
    
  
    useEffect(() => {
      fetchEvents();
     }, [pageNum]);
  
    const fetchEvents = () => {
      let requestBody = {
        query: `
                    query {
                        games(name: "${search}", skip: ${pageNum}) {
                        _id
                        name
                        platform                        
                        msrp
                        publisher
                        developer
                        esrb
                        releasedate
                        romfilesize
                        genre
                        storelink
                        officialsite
                        }                     
                    }
              `,
      };
  
      fetch("http://it2810-40.idi.ntnu.no:3000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((resData) => {
          const games = resData.data.games;
          setGames(games);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    function nextButton() {
      if (pageNum >= 1) {
        setPrevBtnDisabled(false);
        if (pageResults < 12) {
          setNextBtnDisabled(true);
        }
      }
      setPageNum(pageNum+1);
    }

    function prevButton() {
      if (pageNum <= 2) {
        setPrevBtnDisabled(true);
        setNextBtnDisabled(false);
      }
      setPageNum(pageNum-1);
    }


   // console.log("Pageresults = " +pageResults);
   // console.log("pageNum" + pageNum);

  return (
    <React.Fragment>
        <View>
            {games.slice(0,6).map((game, index) => {
              return (
                  <Text>{game.name}</Text>
              );
            })}
        </View>
        <Pagination 
          pageNum={pageNum} 
          nextButton={() => nextButton()} 
          prevButton={() => prevButton()}
          prevBtnDisabled={prevBtnDisabled}
          nextBtnDisabled={nextBtnDisabled}
        />
    <View>
      <StatusBar style="auto" />
    </View>
    </React.Fragment>
  );
}